(function(){
    // This dataset is licensed under the ODbL license; attribute tinyworldmap and OpenStreetMap
    let places = {"countries":[[0.3960976,0.7916665,"China",0],[0.3793621,0.2209837,"United States",0],[0.5069004,0.827473,"Indonesia",0],[0.5288606,0.3522222,"Brazil",0],[0.2622902,0.7715147,"Russia",0],[0.382323,0.5970138,"Turkey",1],[0.2921966,0.5403357,"Sweden",1],[0.1464646,0.3810761,"Greenland",0],[0.4732076,0.5222221,"Nigeria",1],[0.4323306,0.2166453,"Mexico",1],[0.4551783,0.799903,"Vietnam",1],[0.5836513,0.5694212,"South Africa",1],[0.6038903,0.3195353,"Argentina",1],[0.2843756,0.200023,"Canada",1],[0.5710734,0.8743194,"Australia",1],[0.4403149,0.6583436,"Oman",1],[0.5082855,0.566173,"Congo",2],[0.4362762,0.7185215,"India",2],[0.4115123,0.6979097,"Pakistan",2],[0.3907047,0.8867762,"Japan",2],[0.4243773,0.5812987,"Egypt",2],[0.3340532,0.5290218,"Germany",2],[0.4714829,0.607367,"Ethiopia",2],[0.3688186,0.5352064,"Italy",2],[0.4886016,0.2974755,"Colombia",2],[0.4189276,0.5083333,"Algeria",2],[0.3737316,0.6776467,"Uzbekistan",2],[0.5191291,0.2915393,"Peru",2],[0.4789514,0.724205,"Sri Lanka",2],[0.3471935,0.6854947,"Kazakhstan",2],[0.4342831,0.2754642,"Cuba",2],[0.3809868,0.4903236,"Spain",3],[0.5666338,0.3384185,"Paraguay",2],[0.4612905,0.2530165,"El Salvador",2],[0.3524377,0.7884721,"Mongolia",2],[0.4593568,0.4598529,"Senegal",3],[0.2603443,0.4497058,"Iceland",2],[0.4794606,0.9178259,"Micronesia",2],[0.4050958,0.3201214,"Bermuda",2],[0.4642864,0.84092,"Philippines",3],[0.4039648,0.6515676,"Iran",3],[0.3533358,0.5052454,"France",3],[0.317734,0.4908984,"United Kingdom",3],[0.3413491,0.5868662,"Ukraine",3],[0.5181635,0.5994107,"Tanzania",3],[0.4590429,0.5819216,"Sudan",3],[0.4959941,0.6067539,"Kenya",3],[0.4177363,0.7333333,"Nepal",3],[0.402483,0.6227083,"Iraq",3],[0.4872938,0.7840713,"Malaysia",3],[0.4539624,0.633032,"Yemen",3],[0.3772205,0.8530196,"North Korea",3],[0.4313729,0.8360612,"Taiwan",3],[0.5535521,0.6290046,"Madagascar",3],[0.3558209,0.568572,"Romania",3],[0.4871735,0.5365377,"Cameroon",3],[0.477734,0.4845335,"Ivory Coast",3],[0.4499282,0.5258996,"Niger",3],[0.540769,0.5765527,"Zambia",3],[0.4538961,0.4936388,"Mali",3],[0.5037219,0.279537,"Ecuador",3],[0.548096,0.3194688,"Bolivia",3],[0.3821957,0.561077,"Greece",3],[0.4560824,0.5528212,"Chad",3],[0.3999909,0.5261115,"Tunisia",3],[0.445816,0.2990081,"Haiti",3],[0.3237802,0.5769365,"Belarus",3],[0.3771477,0.6327424,"Azerbaijan",3],[0.4099585,0.5968319,"Israel",3],[0.5158082,0.9006914,"Papua New Guinea",3],[0.4226094,0.5503435,"Libya",3],[0.2714032,0.5720025,"Finland",3],[0.4761345,0.2746365,"Panama",3],[0.5663827,0.5481198,"Namibia",3],[0.3071712,0.5687605,"Latvia",3],[0.5025,0.5324721,"Gabon",3],[0.4699715,0.3303222,"Trinidad and Tobago",3],[0.4246836,0.6403735,"Bahrain",3],[0.3961578,0.5920698,"Cyprus",3],[0.4865348,0.3371064,"Guyana",3],[0.5341608,0.6230092,"Comoros",3],[0.4877275,0.8182372,"Brunei",3],[0.5465542,0.9669637,"Vanuatu",3],[0.5386219,0.0218888,"Sāmoa",3],[0.499042,0.9824005,"Kiribati",3],[0.5129518,0.6540389,"Seychelles",3],[0.4566651,0.3295407,"Dominica",3],[0.4755629,0.969753,"Marshall Islands",3],[0.2786703,0.4804658,"Faroe Islands",3],[0.4298408,0.7508151,"Bangladesh",4],[0.4581446,0.7800909,"Thailand",4],[0.3904848,0.8547114,"South Korea",4],[0.3293385,0.5531512,"Poland",4],[0.4957402,0.5894907,"Uganda",4],[0.4087907,0.4796215,"Morocco",4],[0.4002447,0.6839959,"Afghanistan",4],[0.4777,0.3163585,"Venezuela",4],[0.4263227,0.6176468,"Saudi Arabia",4],[0.5546613,0.5969847,"Mozambique",4],[0.3973153,0.6084706,"Syria",4],[0.4662064,0.495311,"Burkina Faso",4],[0.5931259,0.3018923,"Chile",4],[0.5371915,0.5942505,"Malawi",4],[0.4648757,0.7911514,"Cambodia",4],[0.5332322,0.5488031,"Angola",4],[0.5054585,0.5835123,"Rwanda",4],[0.4700395,0.4702546,"Guinea",4],[0.4766734,0.6363428,"Somalia",4],[0.4734067,0.5062734,"Benin",4],[0.3492934,0.5392349,"Austria",4],[0.47807,0.5824077,"South Sudan",4],[0.3689357,0.5707935,"Bulgaria",4],[0.3835047,0.6967102,"Tajikistan",4],[0.44323,0.7871618,"Laos",4],[0.3730456,0.7075669,"Kyrgyzstan",4],[0.3130244,0.5287037,"Denmark",4],[0.2838797,0.5244102,"Norway",4],[0.4551108,0.6055555,"Eritrea",4],[0.3808303,0.6649791,"Turkmenistan",4],[0.4962299,0.7883875,"Singapore",4],[0.3263731,0.4778348,"Ireland",4],[0.4312929,0.6499986,"United Arab Emirates",4],[0.6269216,0.9800956,"New Zealand",4],[0.3582832,0.5434931,"Croatia",4],[0.3145954,0.5659722,"Lithuania",4],[0.4148974,0.6319387,"Kuwait",4],[0.5967884,0.3443885,"Uruguay",4],[0.442529,0.4743335,"Mauritania",4],[0.4486159,0.2850145,"Jamaica",4],[0.5661851,0.5683135,"Botswana",4],[0.5765793,0.5872198,"Eswatini",4],[0.2972039,0.5703664,"Estonia",4],[0.5575358,0.6599177,"Mauritius",4],[0.5243846,0.8501763,"East Timor",4],[0.4955184,0.529214,"Equatorial Guinea",4],[0.420342,0.751422,"Bhutan",4],[0.5271739,0.9523024,"Solomon Islands",4],[0.4549662,0.43331,"Cape Verde",4],[0.393068,0.5401325,"Malta",4],[0.4896584,0.7034012,"Maldives",4],[0.4517192,0.2536503,"Belize",4],[0.4631472,0.3346527,"Barbados",4],[0.3668788,0.6145277,"Abkhazia",4],[0.5564714,0.013326,"Tonga",4],[0.3424824,0.4940671,"Jersey",4],[0.3691872,0.50437,"Andorra",4],[0.4759084,0.467111,"Sierra Leone",5],[0.3749259,0.5555554,"Albania",5],[0.4669466,0.6190147,"Djibouti",5],[0.3525451,0.5228666,"Switzerland",5],[0.3646509,0.5206325,"Monaco",5],[0.4515606,0.7666666,"Myanmar",5],[0.3630265,0.5570873,"Serbia",5],[0.3509847,0.5541836,"Hungary",5],[0.3724069,0.6223022,"Georgia",5],[0.4646888,0.2630731,"Nicaragua",5],[0.5512056,0.9972563,"Fiji",5],[0.477621,0.4969999,"Ghana",5],[0.3292135,0.5156509,"Netherlands",5],[0.5521755,0.5826301,"Zimbabwe",5],[0.3363592,0.5129631,"Belgium",5],[0.3402485,0.5426059,"Czechia",5],[0.5095236,0.5831457,"Burundi",5],[0.3798012,0.4774018,"Portugal",5],[0.4571088,0.2609013,"Honduras",5],[0.3445153,0.5540357,"Slovakia",5],[0.3998868,0.599565,"Lebanon",5],[0.4713082,0.2664614,"Costa Rica",5],[0.4804164,0.5555503,"Central African Republic",5],[0.3505502,0.579353,"Moldova",5],[0.5020179,0.5434498,"Congo",5],[0.484001,0.4739837,"Liberia",5],[0.3690128,0.5580615,"Kosovo",5],[0.4669448,0.4576803,"Guinea-Bissau",5],[0.339939,0.5170269,"Luxembourg",5],[0.4289341,0.2833332,"The Bahamas",5],[0.4649951,0.3056615,"Aruba",5],[0.4514198,0.3279015,"Antigua and Barbuda",5],[0.4561628,0.2490396,"Guatemala",5],[0.4728477,0.6278053,"Somaliland",5],[0.4446333,0.2762036,"Cayman Islands",5],[0.4381622,0.3012423,"Turks and Caicos Islands",5],[0.4973018,0.5195071,"São Tomé and Príncipe",6],[0.4272168,0.6423042,"Qatar",6],[0.4459412,0.3047144,"Dominican Republic",7],[0.3726439,0.5603246,"North Macedonia",6],[0.5861569,0.5787084,"Lesotho",6],[0.475515,0.5028333,"Togo",6],[0.4088106,0.6026156,"Jordan",6],[0.3624375,0.5488782,"Bosnia and Herzegovina",6],[0.3757725,0.6240935,"Armenia",6],[0.3552816,0.5411537,"Slovenia",6],[0.4622336,0.4569721,"The Gambia",6],[0.4884864,0.3442302,"Suriname",6],[0.4612189,0.3306249,"Saint Lucia",6],[0.4660338,0.3286378,"Grenada",6],[0.3201642,0.4873358,"Isle of Man",6],[0.3699141,0.6224943,"South Ossetia",6],[0.3674991,0.5542169,"Montenegro",7],[0.4638473,0.3297873,"Saint Vincent and the Grenadines",7],[0.3414798,0.4928271,"Guernsey",7],[0.4660861,0.3085252,"Curacao",7],[0.3953354,0.5934034,"Northern Cyprus",8]],"cities":[],"paths":[]}

    // The rest of this file is licensed under the MIT license
    function drawPlaces(tile, coords, places, opts) {
    var ctx = tile.getContext('2d', {alpha: false});

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
    ctx.lineJoin = 'round'

    let pathsToDraw = new Path2D()

    for (let [p, bounds] of places.path2ds) { // 60-100 fails
        if (!(bounds[0] > rbound || bounds[2] < lbound || bounds[1] > bbound || bounds[3] < tbound)) {
            pathsToDraw.addPath(p)
        }
    }

    if (opts.borderFillColor != 'transparent')
        ctx.fill(pathsToDraw)
    if (opts.borderStrokeColor != 'transparent')
        ctx.stroke(pathsToDraw)

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