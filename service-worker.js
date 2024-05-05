// Choose a cache name
const cacheName = 'sw-v1';
// IMPORTANT: List the files to precache
const TWM = 'https://tinyworldmap.com/dist/v3/tiny-world-all-10000.json';
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

function drawPlaces(tile, coords, twm, opts) {
    var ctx = tile.getContext('2d', {alpha: false});

    ctx.textAlign = 'center'
    ctx.lineJoin = 'round'

    // let sortedPlaces = twm.data.sort((a, b) => (b.zIndex || 0) - (a.zIndex || 0))

    let vwidth = 800, vheight = 800

    var size = {x: tile.width, y: tile.height};
    let margin1 = 2/size.x, margin2 = 35/size.x, margin3 = 50/size.x, N = Math.pow(2, coords.z);

    let lbound = coords.x / N, rbound = lbound + 1/N, tbound = coords.y / N, bbound = tbound + 1/N

    let transformed = false;

    let restoreStyle = {}, specialOptions = {}

    let matrix = new DOMMatrix()

    matrix.translateSelf(-size.x*coords.x, -size.x*coords.y)
    matrix.scaleSelf(size.x*N/vwidth,size.y*N/vheight)

    let applyStyle = (ctx, p) => {
        let render = twm.render[p.id] || {}

        let newRestoreStyle = {}

        for (let k in render.style || {}) {
            newRestoreStyle[k] = ctx[k]
            delete restoreStyle[k]
            ctx[k] = typeof render.style[k] == 'function' ? render.style[k](ctx, coords) : render.style[k]
        }

        for (let k in restoreStyle) {
            ctx[k] = restoreStyle[k]
        }

        restoreStyle = newRestoreStyle
        specialOptions = render.options || {}
    }

    for (let set of twm.data) {
        applyStyle(ctx, set)

        if(coords.z > (specialOptions.maxZoom || 99999) || coords.z < (specialOptions.minZoom || 0))
            continue

        if (specialOptions.lineDash) ctx.setLineDash(specialOptions.lineDash)

        if (set.type == 'fill') {
            // if (transformed) ctx.resetTransform()
            ctx.fillRect(0, 0, size.x, size.y)
        }
        else if (set.type == 'path') {
            if (!set._path2ds) {
                set._path2ds = set.paths.map(place => [new Path2D(place[0]), place[1]])
            }

            // if (!transformed) {
            //     ctx.translate(-size.x*coords.x, -size.x*coords.y)
            //     ctx.scale(size.x*N/vwidth,size.y*N/vheight)
            // }

            let pathsToDraw = new Path2D()

            for (let [p, bounds] of set._path2ds) {
                if (!(bounds[0] > rbound || bounds[2] < lbound || bounds[1] > bbound || bounds[3] < tbound)) {
                    pathsToDraw.addPath(p, matrix)
                }
            }

            if (specialOptions.fill !== false)
                ctx.fill(pathsToDraw)

            if (specialOptions.stroke !== false)
                ctx.stroke(pathsToDraw)
        }
        else if (set.type == 'label') {
            // if (transformed) ctx.resetTransform()

            let maxWidth = specialOptions.maxWidth

            if (specialOptions.dotColor) {
                let restoreFill = ctx.fillStyle
                ctx.fillStyle = specialOptions.dotColor

                for (let [yc, xc, name, zoom] of set.labels) {
                    let y = yc * N - coords.y, x = xc * N - coords.x
                    if (zoom > coords.z && y > -margin1 && y < 1+margin1 && x > -margin1 && x < 1+margin1) {
                        let xS = size.x * x, yS = size.y * y
                        ctx.fillRect(xS-1,yS-1,2,2)
                    }
                }

                ctx.fillStyle = restoreFill
            }

            for (let [yc, xc, name, zoom] of set.labels) {
                if (zoom > coords.z) continue

                let y = yc * N - coords.y, x = xc * N - coords.x
                if (y > -margin3 && y < 1+margin3 && x > -margin3 && x < 1+margin3) {
                    let xS = size.x * x, yS = size.y * y
                    if (maxWidth) {
                        ctx.strokeText(name, xS, yS, maxWidth)
                        ctx.fillText(name, xS, yS, maxWidth)
                    }
                    else {
                        ctx.strokeText(name, xS, yS)
                        ctx.fillText(name, xS, yS)
                    }
                }
            }
        }

        if (specialOptions.lineDash) ctx.setLineDash([])

        // transformed = set.type == 'path'
    }

    // if (!places.path2ds)
    //     places.path2ds = places.paths.map(p => [new Path2D(p[0]), p[1]])

    // if (!places.lakepath2ds)
    //     places.lakepath2ds = places.lakes.map(p => [new Path2D(p[0]), p[1]])

    // if (!places.statepath2ds)
    //     places.statepath2ds = places.states.map(p => [new Path2D(p[0]), p[1]])

    // ctx.fillStyle = opts.backgroundColor || (places.path2ds.length ? "#aad3df" : 'white')
    // ctx.fillRect(0, 0, size.x, size.y)

    // ctx.translate(-size.x*coords.x, -size.x*coords.y)
    // ctx.scale(size.x*N/vwidth,size.y*N/vheight)
    // ctx.fillStyle = opts.borderFillColor || '#fdf9f1'
    // ctx.lineWidth = (opts.borderWidth||4)/N
    // ctx.lineJoin = 'round'

    // let pathsToDraw = new Path2D()

    // for (let [p, bounds] of places.path2ds) { // 60-100 fails
    //     if (!(bounds[0] > rbound || bounds[2] < lbound || bounds[1] > bbound || bounds[3] < tbound)) {
    //         pathsToDraw.addPath(p)
    //     }
    // }

    // let statePathsToDraw = new Path2D()

    // if (coords.z > 3 && opts.stateColor != 'transparent') {
    //     for (let [p, bounds] of places.statepath2ds) { // 60-100 fails
    //         if (!(bounds[0] > rbound || bounds[2] < lbound || bounds[1] > bbound || bounds[3] < tbound)) {
    //             statePathsToDraw.addPath(p)
    //         }
    //     }
    // }

    // if (opts.borderFillColor != 'transparent')
    //     ctx.fill(pathsToDraw)

    // ctx.setLineDash([5/N, 5/N])
    // ctx.lineWidth = (opts.borderWidth||4)/N/2
    // ctx.strokeStyle = opts.stateColor || '#b4a6ae'

    // if (opts.stateStrokeColor != 'transparent')
    //     ctx.stroke(statePathsToDraw)

    // ctx.setLineDash([])

    // ctx.lineWidth = (opts.borderWidth||4)/N
    // ctx.strokeStyle = opts.borderColor || '#b4a6ae'

    // if (opts.borderStrokeColor != 'transparent')
    //     ctx.stroke(pathsToDraw)

    // ctx.fillStyle = opts.backgroundColor || '#aad3df'

    // let lakePathsToDraw = new Path2D()

    // for (let [p, bounds] of places.lakepath2ds) { // 60-100 fails
    //     if (!(bounds[0] > rbound || bounds[2] < lbound || bounds[1] > bbound || bounds[3] < tbound)) {
    //         lakePathsToDraw.addPath(p)
    //     }
    // }

    // if (opts.backgroundColor != 'transparent')
    //     ctx.fill(lakePathsToDraw)
    // if (opts.borderStrokeColor != 'transparent')
    //     ctx.stroke(lakePathsToDraw)

    // ctx.resetTransform()

    // let dotColor = opts.dotColor || (places.path2ds.length ? 'transparent' : 'red')
    // ctx.fillStyle = dotColor

    // if (dotColor != 'transparent')
    //     for (let [yc, xc, name, zoom] of places.cities) {
    //         let y = yc * N - coords.y, x = xc * N - coords.x
    //         if (zoom > coords.z && y > -margin1 && y < 1+margin1 && x > -margin1 && x < 1+margin1) {
    //             let xS = size.x * x, yS = size.y * y
    //             ctx.fillRect(xS-1,yS-1,2,2)
    //         }
    //     }

    // ctx.strokeStyle = opts.textStrokeColor || 'rgba(255,255,255,.8)'
    // ctx.lineWidth = opts.textStrokeWidth || 3
    // ctx.textAlign = 'center'
    // ctx.fillStyle = opts.textFillColor || "black";
    // ctx.font = opts.cityFont || '12px Arial, Helvetica, Ubuntu, sans-serif'

    // for (let [yc, xc, name, zoom] of places.cities) {
    //     if (zoom > coords.z) continue

    //     let y = yc * N - coords.y, x = xc * N - coords.x
    //     if (y > -margin2 && y < 1+margin2 && x > -margin2 && x < 1+margin2) {

    //         let xS = size.x * x, yS = size.y * y
    //         ctx.strokeText(name, xS, yS, 70)
    //         ctx.fillText(name, xS, yS, 70)
    //     }
    // }

    // ctx.font = opts.countryFont || 'bold 14px Arial, Helvetica, Ubuntu, sans-serif'

    // for (let [yc, xc, name, zoom] of places.countries) {
    //     if (zoom > coords.z || coords.z > 8) continue

    //     let y = yc * N - coords.y, x = xc * N - coords.x
    //     if (y > -margin3 && y < 1+margin3 && x > -margin3 && x < 1+margin3) {
    //         let xS = size.x * x, yS = size.y * y
    //         ctx.strokeText(name, xS, yS, 100)
    //         ctx.fillText(name, xS, yS, 100)
    //     }
    // }
    return tile;
}


let cb = places.find(p => p.id == 'country_borders')

let defaultStyling = {
    background: {
        style: {
            fillStyle: (cb && cb.paths.length ? "#aad3df" : 'white')
        }
    },
    country_borders: {
        style: {
            fillStyle: '#fdf9f1',
            strokeStyle: '#b4a6ae',
            lineWidth: 1
        },
    },
    state_borders: {
        style: {
            fillStyle: 'transparent',
            strokeStyle: '#b4a6ae',
            lineWidth: 0.5
        },
        options: {lineDash: [2, 2], minZoom: 4}
    },
    lakes: {
        style: {
            fillStyle: '#aad3df',
            strokeStyle: '#b4a6ae',
            lineJoin: 'round'
        }
    },
    country_labels: {
        style: {
            fillStyle: 'black',
            strokeStyle: 'rgba(255,255,255,.8)',
            lineWidth: 3,
            font: 'bold 14px Arial, Helvetica, Ubuntu, sans-serif'
        },
        options: {maxWidth: 100, maxZoom: 8}
    },
    city_labels: {
        style: {
            fillStyle: 'black',
            strokeStyle: 'rgba(255,255,255,.8)',
            lineWidth: 3,
            font: '12px Arial, Helvetica, Ubuntu, sans-serif'
        },
        options: {maxWidth: 70, dotColor: (cb ? null : 'red')}
    }
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
