(function(){
    // This dataset is licensed under the ODbL license; attribute tinyworldmap and OpenStreetMap

    function drawPlaces(tile, coords, places, opts) {
    var ctx = tile.getContext('2d', {alpha: false});

    if (!places.path2ds)
        places.path2ds = places.paths.map(p => [new Path2D(p[0]), p[1]])

    if (!places.lakepath2ds)
        places.lakepath2ds = places.lakes.map(p => [new Path2D(p[0]), p[1]])

    if (!places.statepath2ds)
        places.statepath2ds = places.states.map(p => [new Path2D(p[0]), p[1]])

    let vwidth = 800, vheight = 800

    var size = {x: tile.width, y: tile.height};
    let margin1 = 2/size.x, margin2 = 35/size.x, margin3 = 50/size.x, N = Math.pow(2, coords.z);

    let lbound = coords.x / N, rbound = lbound + 1/N, tbound = coords.y / N, bbound = tbound + 1/N

    ctx.fillStyle = opts.backgroundColor || (places.path2ds.length ? "#aad3df" : 'white')
    ctx.fillRect(0, 0, size.x, size.y)

    ctx.translate(-size.x*coords.x, -size.x*coords.y)
    ctx.scale(size.x*N/vwidth,size.y*N/vheight)
    ctx.fillStyle = opts.borderFillColor || '#fdf9f1'
    ctx.lineWidth = (opts.borderWidth||4)/N
    ctx.lineJoin = 'round'

    let pathsToDraw = new Path2D()

    for (let [p, bounds] of places.path2ds) { // 60-100 fails
        if (!(bounds[0] > rbound || bounds[2] < lbound || bounds[1] > bbound || bounds[3] < tbound)) {
            pathsToDraw.addPath(p)
        }
    }

    let statePathsToDraw = new Path2D()

    if (coords.z > 3 && opts.stateColor != 'transparent') {
        for (let [p, bounds] of places.statepath2ds) { // 60-100 fails
            if (!(bounds[0] > rbound || bounds[2] < lbound || bounds[1] > bbound || bounds[3] < tbound)) {
                statePathsToDraw.addPath(p)
            }
        }
    }

    if (opts.borderFillColor != 'transparent')
        ctx.fill(pathsToDraw)

    ctx.setLineDash([5/N, 5/N])
    ctx.lineWidth = (opts.borderWidth||4)/N/2
    ctx.strokeStyle = opts.stateColor || '#b4a6ae'

    if (opts.stateStrokeColor != 'transparent')
        ctx.stroke(statePathsToDraw)

    ctx.setLineDash([])

    ctx.lineWidth = (opts.borderWidth||4)/N
    ctx.strokeStyle = opts.borderColor || '#b4a6ae'

    if (opts.borderStrokeColor != 'transparent')
        ctx.stroke(pathsToDraw)

    ctx.fillStyle = opts.backgroundColor || '#aad3df'

    let lakePathsToDraw = new Path2D()

    for (let [p, bounds] of places.lakepath2ds) { // 60-100 fails
        if (!(bounds[0] > rbound || bounds[2] < lbound || bounds[1] > bbound || bounds[3] < tbound)) {
            lakePathsToDraw.addPath(p)
        }
    }

    if (opts.backgroundColor != 'transparent')
        ctx.fill(lakePathsToDraw)
    if (opts.borderStrokeColor != 'transparent')
        ctx.stroke(lakePathsToDraw)

    ctx.resetTransform()

    let dotColor = opts.dotColor || (places.path2ds.length ? 'transparent' : 'red')
    ctx.fillStyle = dotColor

    if (dotColor != 'transparent')
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
    ctx.fillStyle = opts.textFillColor || "black";
    ctx.font = opts.cityFont || '12px Arial, Helvetica, Ubuntu, sans-serif'

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


    L.GridLayer.TinyWorld = L.GridLayer.extend({
        createTile: function(xyz){
            // create a <canvas> element for drawing
            let tile = L.DomUtil.create('canvas', 'leaflet-tile');

            var tileSize = this.getTileSize();
            tile.setAttribute('width', tileSize.x);
            tile.setAttribute('height', tileSize.y);

            return drawPlaces(tile, xyz, places, this.options)
        },
        getAttribution: function() {
            return '&copy; <a href="https://tinyworldmap.com">tinyworldmap</a>, <a href="https://openstreetmap.org">OpenStreetMap</a>'
        }
    });
})()