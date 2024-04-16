// Choose a cache name
const cacheName = 'sw-v1';
// IMPORTANT: List the files to precache
const TWM = 'https://tinyworldmap.com/dist/tiny-world-all-10000.json';
const precacheResources = ['/', TWM];
// IMPORTANT: Alter the regex and tile size if you use non-standard tiles
const REGEXP = /tile\.openstreetmap\.org\/(?<z>\d+)\/(?<x>\d+)\/(?<y>\d+)/
const TILESIZE = 256

const drawOptions = {} // see README

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
    console.log('Service worker install event!');
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)));
});

function drawPlaces(tile, coords, places, opts) {
    var ctx = tile.getContext('2d');

    if (!places.path2ds)
        places.path2ds = places.paths.map(p => [new Path2D(p[0]), p[1]])

    let vwidth = 800, vheight = 800

    var size = {x: tile.width, y: tile.height};
    let margin1 = 2/size.x, margin2 = 35/size.x, margin3 = 50/size.x, N = Math.pow(2, coords.z);

    let lbound = coords.x / N, rbound = lbound + 1/N, tbound = coords.y / N, bbound = tbound + 1/N

    ctx.fillStyle = opts.backgroundColor || (places.path2ds.length ? "#aad3df" : 'white')
    ctx.fillRect(0, 0, size.x, size.y)

    ctx.translate(-size.x*coords.x, -size.x*coords.y)
    ctx.scale(size.x*N/vwidth,size.y*N/vheight)
    ctx.strokeStyle = opts.borderColor || '#b4a6ae'
    ctx.fillStyle = opts.borderFillColor || '#fdf9f1'
    ctx.lineWidth = (opts.borderWidth||4)/N

    for (let [p, bounds] of places.path2ds) {
        if (!(bounds[0] > rbound || bounds[2] < lbound || bounds[1] > bbound || bounds[3] < tbound)) {
            ctx.fill(p)
            ctx.stroke(p)
        }
    }

    ctx.resetTransform()

    let dotColor = opts.dotColor || "red"
    ctx.fillStyle = dotColor

    let minZoom = opts.dotMinZoom || (places.path2ds.length ? 999 : -1)

    if (dotColor != 'transparent' && coords.z >= minZoom)
        for (let [yc, xc, name, zoom] of places.cities) {
            let y = yc * N - coords.y, x = xc * N - coords.x
            if (zoom > coords.z && y > -margin1 && y < 1+margin1 && x > -margin1 && x < 1+margin1) {
                let xS = size.x * x, yS = size.y * y
                ctx.fillRect(xS-1,yS-1,2,2)
            }
        }

    ctx.strokeStyle = opts.textStrokeColor || 'rgba(255,255,255,.8)'
    ctx.lineWidth = opts.textStrokeWidth || 3
    ctx.textAlign = 'center'
    ctx.fillStyle = opts.textColor || "black";
    ctx.font = opts.cityFont || '12px Arial, Helvetica, Ubuntu, sans-serif'
    ctx.lineJoin = 'round'

    for (let [yc, xc, name, zoom] of places.cities) {
        if (zoom > coords.z) continue

        let y = yc * N - coords.y, x = xc * N - coords.x
        if (y > -margin2 && y < 1+margin2 && x > -margin2 && x < 1+margin2) {
            let xS = size.x * x, yS = size.y * y
            ctx.strokeText(name, xS, yS, 70)
            ctx.fillText(name, xS, yS, 70)
        }
    }

    ctx.font = opts.countryFont || 'bold 14px Arial, Helvetica, Ubuntu, sans-serif'

    for (let [yc, xc, name, zoom] of places.countries) {
        if (zoom > coords.z || coords.z > 8) continue

        let y = yc * N - coords.y, x = xc * N - coords.x
        if (y > -margin3 && y < 1+margin3 && x > -margin3 && x < 1+margin3) {
            let xS = size.x * x, yS = size.y * y
            ctx.strokeText(name, xS, yS, 100)
            ctx.fillText(name, xS, yS, 100)
        }
    }

    return tile;
}


let places

async function handleTileRequest(request, match) {
    let cache = await caches.open(cacheName)
    // Go to the network first
    try {
        let response = await fetch(request.url)
        if (!response.ok) throw new Error('No 200')
        return response
    }
    // If the network is unavailable, create a replacement tile locally
    catch(e) {
        try {
            places = places || await (await cache.match(TWM)).json()
            const canvas = new OffscreenCanvas(TILESIZE, TILESIZE)
            let coords = {x: +match.groups.x, y: +match.groups.y, z: +match.groups.z}

            drawPlaces(canvas, coords, places, drawOptions)

            let blob = await canvas.convertToBlob({type: 'image/png'})

            const headers = new Headers()
            headers.set('content-type', blob.type)
            headers.set('content-length', blob.size)
            headers.set('access-control-allow-origin', '*')

            return new Response(blob, {headers: headers})
        }
        catch (e) {
            console.log(e)
        }
    }
}

self.addEventListener('fetch', (event) => {
    if (event.request.method != 'GET')
        return

    let match = REGEXP.exec(event.request.url)

    if (event.request.destination === 'image' && match) {
        event.respondWith(handleTileRequest(event.request, match))
    }
    else {
        // Open the cache
        event.respondWith(caches.open(cacheName).then((cache) => {
            // Go to the network first
            return fetch(event.request).then((fetchedResponse) => {
                // IMPORTANT: Tell the service worker what not to cache
                if (!['image', 'video', 'audio'].includes(event.request.destination))
                    // Cache response
                    cache.put(event.request, fetchedResponse.clone());

                return fetchedResponse;
            }).catch(() => {
                // If the network is unavailable, try to get it from cache
                return cache.match(event.request.url);
            });
        }));
    }
});
