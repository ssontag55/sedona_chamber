/*
Main App for Sedona Chambers Map App
Mapblender
2016
*/

function startup(){
	that = this;
	that.token = 'pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg';
	L.mapbox.accessToken = 'pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg';

	var map = L.mapbox.map('map').setView([34.86394, -111.764860], 14).addControl(L.mapbox.shareControl()).addControl(L.mapbox.geocoderControl('mapbox.places'));

	var points = L.mapbox.featureLayer('sedonachamber.pmj9fija').addTo(map);

	points.on('mouseover', function (e) {
	  e.layer.openPopup();
	});
	var myIcon = L.icon({
	    iconUrl: 'app/css/31.gif',
	    iconAnchor: [8, 8]
	})
	var lc = L.control.locate({follow: true,
		keepCurrentZoomLevel: false,
		locateOptions: {maxZoom: 16},
		metric: false,
		showPopup: true, 
		markerClass: L.marker,
		markerStyle: {icon:myIcon},
	  	onLocationError: function(err) {alert(err.message)}}).addTo(map);

	L.control.layers({
	    'Streets': L.mapbox.tileLayer('mapbox.streets',{maxZoom:20}),
	    'Imagery': L.mapbox.tileLayer('mapbox.satellite', {maxZoom:20}),
	    'Simple Streets': L.tileLayer('https://api.mapbox.com/styles/v1/sedonachamber/cin2opt8d00b9abnq6trki27e/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg', {maxZoom:20}),
	    'Outside<img src="http://sedona.simpleviewcrm.com/images//listings/celeste-800x600.jpg" height="160" width="160">': L.mapbox.tileLayer('mapbox.run-bike-hike'),
	    'Sedona': L.tileLayer('https://api.mapbox.com/styles/v1/sedonachamber/cin7oyyjz000waamcx7v412nr/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg', {maxZoom:20}),
	    'Red': L.tileLayer('https://api.mapbox.com/styles/v1/sedonachamber/cin2kt8ku001sb4mawvdvwjxf/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg', {maxZoom:20}).addTo(map),
	    'Light': L.mapbox.tileLayer('mapbox.light'),
	    'Dark': L.tileLayer('https://api.mapbox.com/styles/v1/sedonachamber/cin961o3z00epcxnhaxgzwdb6/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg', {maxZoom:20})
	}, {
	    //'Bike Stations': L.mapbox.tileLayer('examples.bike-locations')
	}).addTo(map);

	map.on('locationfound',(function(t) {
	        
	        //find closest point
	        var loc = {
	            "type": "Feature",
	            "properties": {
	              "marker-color": "#f00",
	              "marker-size": 'small'
	            },
	            "geometry": {
	              "type": "Point",
	              "coordinates": [t.longitude,t.latitude]
	            }
	        };

	        var jsonpoints = points.getGeoJSON();
	        ///filter out points
	        for (var i = 0; i < jsonpoints.features.length; i++) {
	          if(jsonpoints.features[i].geometry.type != 'Point'){
	            jsonpoints.features.splice(i, 1);
	          }
	        }

	        var nearestpoint = turf.nearest(loc, jsonpoints);
	        //nearestpoint.properties['marker-color'] = '#58595B';
	        //nearestpoint.properties['marker-size'] = 'large';
	        //points.setGeoJSON(jsonpoints);
	        //points._geojson.features.concat(nearestpoint);
	        
	        points.eachLayer(function (layer) {
			    if (layer.feature.properties.title === nearestpoint.properties.title) {
			      	//var tomarker = layer.toGeoJSON();
			      	layer.openPopup();
			    };
			 });

	        vex.dialog.buttons.YES.text = 'Get Directions';
	        vex.dialog.alert({
	            message: "You are here!<br><br><i>"+nearestpoint.properties.title+"</i> is the closest to you.<br>",
	            callback: function(value) {
	              //get directions  
	              //to
	              var tocoords=[nearestpoint.geometry.coordinates[1],nearestpoint.geometry.coordinates[0]];
	              L.circle(tocoords, 25,{
					    color: '#fff',
					    fillColor: '#9E2C2E',
					    fillOpacity: 0.7
				   }).addTo(map);  

	              //from 
	              L.circle(t.latlng, 25,{
					    color: '#fff',
					    fillColor: '#A1D490',
					    fillOpacity: 0.7
				   }).addTo(map).bringToFront();
	               //L.geoJson(loc).addTo(map);    

	               that.getdirections(t.latlng,tocoords)
	            }
	        });
	        map.stopLocate();
	        //lc.stop(); 
	}));

	//cluster
	// L.mapbox.featureLayer('sedonachamber.pmj9fija').on('ready', function(e) {
	//     // The clusterGroup gets each marker in the group added to it
	//     // once loaded, and then is added to the map
	//     var clusterGroup = new L.MarkerClusterGroup();
	//     e.target.eachLayer(function(layer) {
	//         clusterGroup.addLayer(layer);
	//     });
	//     map.addLayer(clusterGroup);
	// });

	var imagecontrol = L.Control.extend({
	    options: {
	      position: 'bottomright'
	    },
	    onAdd: function (map) {
	      var container = L.DomUtil.create('div', 'img-control');
	      return container;
	    }
	});
	map.addControl(new imagecontrol());

	$('.img-control').click(function() {
	  window.open('http://visitsedona.com/','_blank')
	});

	//map.legendControl.addLegend(document.getElementById('legend').innerHTML);

	vex.dialog.buttons.YES.text = 'Start Here';
	vex.dialog.buttons.NO.text = 'Browse Map';

	var todayDateString;
	var d = new Date(); 

	todayDateString = d.toString("dddd, MMMM dd, yyyy h:mm tt");
	if(d.getDay() == 5&&d.getDate()<7){
	  todayDateString= todayDateString+'<br><br><a target="_blank" style="color:#7A1800" href="http://sedonagalleryassociation.com/?page_id=236">First Friday Art Walk. Click here for more information.</a></i>'
	  
	}
	else if(d.getDay() == 4&&d.getDate()<7){
	  todayDateString= todayDateString+'<br><br><a target="_blank" style="color:#7A1800" href="http://sedonagalleryassociation.com/?page_id=236">First Friday Art Walk is tomorrow. Click here for more information.</a></i>'
	  
	}
	else if(d.getHours()>18||d.getHours()<8){
	  todayDateString= todayDateString+'<br><br><i>Galleries may be closed in the evening.</i>'
	}

	vex.dialog.confirm({
	  message: "Welcome to the Sedona ArtWalk Map!<br><br><img src='assets/red_sedona.jpg' style='margin-left: 29%'></><br><br>"+todayDateString,
	  callback: function(value) {
	    //locate for directions
	    if(value == true){

	      //locate
	      lc.start();    
	    }
	  }
	});

	$("#direc" ).click(function() {
	   //get direction same
	  alert( "Handler for called." );
	});
}

function getdirections(start,end){
	that = this;

	//https://api.tiles.mapbox.com/v4/directions/mapbox.walking/-74.8553466796875,40.029717557833266;-74.8553466796875,39.91605629078665.json?instructions=html&geometry=polyline&access_token="+that.token
}