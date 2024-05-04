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
