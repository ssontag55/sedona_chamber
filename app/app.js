/*
Main App for Sedona Chambers Map App
Mapblender
2016
	//not usuing from mapbox or layerlist
	//var artpts = L.mapbox.featureLayer('sedonachamber.pmj9fija');
	//var layergroup = {"Restaurants":restaurantpts, "Galleries":artpts,"Recyling Dropoff":recyclingpts};
*/
function startup(){
	that = this;
	that.gotoloc = [];
	that.loader = document.getElementById('loader');
	that.points = L.geoJson();
	
	$('#search-bar').selectpicker({liveSearchPlaceholder:"Filter Locations...",noneSelectedText:"Find Locations...",header:"Select Location Types"});
	//data-live-search="true" for searching

	that.token = 'pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg';
	
	L.mapbox.accessToken = 'pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg';

	var basefeatures = L.mapbox.featureLayer('data/basefeatures.json');
	
	var restaurantpts = L.mapbox.featureLayer('data/restaurant.json');
	var recyclingpts = L.mapbox.featureLayer('data/recycling.json');
	var artpts = L.mapbox.featureLayer('data/gallery.json');
	var buspts = L.mapbox.featureLayer('data/bus.json');
	var theatrepts = L.mapbox.featureLayer('data/theatre.json');
	var parkingpts = L.mapbox.featureLayer('data/parking.json');
	var walkingfeatures = L.mapbox.featureLayer('data/walking.json');
	var museumpts = L.mapbox.featureLayer('data/museum.json');

	//zoom usually [34.86394, -111.764860], 14 [34.81394, -111.764860], 12
	var map = L.mapbox.map('map').setView([34.86394, -111.764860], 14).addControl(L.mapbox.shareControl()).addControl(L.mapbox.geocoderControl('mapbox.places'));
	that.map = map;

    basefeatures.addTo(map);
	addMouseClickListener(basefeatures); 

	restaurantpts.on('ready', processLayerGeo);
	theatrepts.on('ready',  processLayerGeo);
	parkingpts.on('ready',  processLayerGeo);
	museumpts.on('ready',  processLayerGeo);
	artpts.on('ready',  processLayerGeo);
	theatrepts.on('ready',  processLayerGeo);
	buspts.on('ready',  processLayerGeo);

	if(window.location.href.indexOf("restaurants") > -1) {
		$('#search-bar').selectpicker('deselectAll');
    	$('#search-bar').selectpicker('val', 'rest');
        restaurantpts.addTo(map);
        addMouseClickListener(restaurantpts);
    }
    else if(window.location.href.indexOf("green") > -1){
    	$('#search-bar').selectpicker('deselectAll');
    	$('#search-bar').selectpicker('val', 'recycling');
    	recyclingpts.addTo(map);
    	addMouseClickListener(recyclingpts);	
    }
    else if(window.location.href.indexOf("art") > -1){
    	$('#search-bar').selectpicker('deselectAll');
    	$('#search-bar').selectpicker('val', ['gallery','bus','walk','museum','theatre']);
    	//theatrepts.addTo(map);
    	museumpts.addTo(map);
    	parkingpts.addTo(map);
    	artpts.addTo(map);
    	walkingfeatures.addTo(map);	
    	addMouseClickListener(artpts);	
    }
    else if(window.location.href.indexOf("galleries") > -1){
    	$('#search-bar').selectpicker('deselectAll');
    	$('#search-bar').selectpicker('val', ['gallery','bus','walk','museum','theatre']);
    	//theatrepts.addTo(map);
    	museumpts.addTo(map);
    	artpts.addTo(map);
    	buspts.addTo(map);
    	walkingfeatures.addTo(map);	
    	addMouseClickListener(artpts);	
    }
    else{
		restaurantpts.addTo(map);
		theatrepts.addTo(map);
		parkingpts.addTo(map);
		museumpts.addTo(map);
		artpts.addTo(map);	
		buspts.addTo(map);	
		walkingfeatures.addTo(map);	
		addMouseClickListener(artpts);
		addMouseClickListener(restaurantpts);
		addMouseClickListener(theatrepts);
		addMouseClickListener(parkingpts);
		addMouseClickListener(buspts);
		addMouseClickListener(museumpts);
		addMouseClickListener(walkingfeatures);
    }	
     
    $('#search-bar').on('changed.bs.select', function (e) {

    	var selectedLayers = $('#search-bar').val();
    	map.removeLayer(restaurantpts);
		map.removeLayer(recyclingpts);
		map.removeLayer(theatrepts);
		map.removeLayer(parkingpts);
		map.removeLayer(museumpts);
		map.removeLayer(artpts);	
		map.removeLayer(buspts);	
		map.removeLayer(walkingfeatures);

		that.points = L.geoJson();

		if(selectedLayers){
			
			for (var l = 0; l < selectedLayers.length; l++) {
		    	if(selectedLayers[l] == 'gallery'){
		    		artpts.addTo(map);
		    		processLayer2Geo(artpts);
		    		addMouseClickListener(artpts);
		    	}        
		    	else if(selectedLayers[l] == 'rest'){
		    		processLayer2Geo(restaurantpts);
		    		restaurantpts.addTo(map);
		    		addMouseClickListener(restaurantpts);
		    	}   
		    	else if(selectedLayers[l] == 'theatre'){
		    		theatrepts.addTo(map);	
		    		processLayer2Geo(theatrepts);
		    		addMouseClickListener(theatrepts);
		    	}
	    		else if(selectedLayers[l] == 'museum'){
	    			museumpts.addTo(map);	
	    			processLayer2Geo(museumpts);
	    			addMouseClickListener(museumpts);
	    		}
				else if(selectedLayers[l] == 'park'){
					parkingpts.addTo(map);	
					addMouseClickListener(parkingpts);
				}
				else if(selectedLayers[l] == 'recycling'){
					recyclingpts.addTo(map);	
					processLayer2Geo(recyclingpts);
					addMouseClickListener(recyclingpts);
				}
				else if(selectedLayers[l] == 'bus'){
					buspts.addTo(map);	
					addMouseClickListener(buspts);
				}
				else if(selectedLayers[l] == 'walk'){
					walkingfeatures.addTo(map);	
					addMouseClickListener(walkingfeatures);
				}
    		} 
		}
		    
	});
	
	var todayDateString;
	var d = new Date(); 

	todayDateString = d.toString("dddd, MMMM dd, yyyy h:mm tt");

	//search for mobile version 
	if(bowser.android||bowser.ios){
		//$('#search-bar').selectpicker('mobile');

		map.on('popupopen', function(e) {
		    var px = map.project(e.popup._latlng); // find the pixel location on the map where the popup anchor is
		    px.y -= e.popup._container.clientHeight/2-100 // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
		    map.panTo(map.unproject(px),{animate: true}); // pan to new center
		});
		//change header toolbar
		$('#toolbar').css('padding-left','17%');		
	}	
	
	var mylocIcon = L.icon({
	     iconUrl: 'app/css/ripple.gif',
	     iconAnchor: [10, 10]
	 });

	var lc = L.control.locate({
		follow: true,
		keepCurrentZoomLevel: false,
		locateOptions: {maxZoom: 16},
		metric: false,
		showPopup: true, 
		markerClass: L.marker,
		markerStyle: {icon:mylocIcon},
		strings: {
        	title: "Show me where I am and what is closest to me!"
    	},
	  	onLocationError: function(err) {
	  		vex.dialog.buttons.YES.text = 'OK';

	  		var howto = '';

	  		if(bowser.msie){
	  			howto = "<a target='_blank' style='color:#7A1800' href='http://windows.microsoft.com/en-us/internet-explorer/ie-security-privacy-settings#ie=ie-11'>How To </a>";	
	  		}
	  		else if(bowser.chrome){
	  			howto = "<a target='_blank' style='color:#7A1800' href='https://support.google.com/chrome/answer/142065?hl=en'>How To </a>";	
	  		}
	  		else if(bowser.firefox){
	  			howto = "<a target='_blank' style='color:#7A1800' href='https://support.mozilla.org/en-US/kb/improve-mozilla-location-services-turning-location'>How To </a>";	
	  		}
	  		else if(bowser.android){
	  			howto = "<a target='_blank' style='color:#7A1800' href='https://support.scruff.com/hc/en-us/articles/202623634-How-do-I-enable-location-services-on-my-Android-'>How To </a>";	
	  		}
	  		else if(bowser.ios){
	  			howto = "<a target='_blank' style='color:#7A1800' href='https://support.apple.com/en-us/HT203033'>How To </a>";	
	  		}
	  		
	  		vex.dialog.alert({
	            message: "Please Enable Your Location to find best directions from where you are.<br><br>"+howto
	        });

	  		that.loader.className = 'hide';
	  	}
	}).addTo(map);

	//turn dark if at night
	if(d.getHours()>19||d.getHours()<7){
		L.control.layers({
		    'Streets': L.mapbox.tileLayer('mapbox.streets',{maxZoom:20}),
		    'Imagery': L.mapbox.tileLayer('mapbox.satellite', {maxZoom:20}),
		    //'Simple Streets': L.tileLayer('https://api.mapbox.com/styles/v1/sedonachamber/cin2opt8d00b9abnq6trki27e/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg', {maxZoom:20}),
		    'Trails': L.mapbox.tileLayer('mapbox.run-bike-hike'),
		    'Sedona': L.tileLayer('https://api.mapbox.com/styles/v1/sedonachamber/cin7oyyjz000waamcx7v412nr/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg', {maxZoom:20}),
		    'Red': L.tileLayer('https://api.mapbox.com/styles/v1/sedonachamber/cin2kt8ku001sb4mawvdvwjxf/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg', {maxZoom:20}),
		    //'Light': L.mapbox.tileLayer('mapbox.light'),
		    'Dark': L.tileLayer('https://api.mapbox.com/styles/v1/sedonachamber/cin961o3z00epcxnhaxgzwdb6/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg', {maxZoom:20}).addTo(map)
		}).addTo(map);
		//},layergroup).addTo(map);
	}
	else{
		L.control.layers({
		    'Streets': L.mapbox.tileLayer('mapbox.streets',{maxZoom:20}),
		    'Imagery': L.mapbox.tileLayer('mapbox.satellite', {maxZoom:20}),
		    //'Simple Streets': L.tileLayer('https://api.mapbox.com/styles/v1/sedonachamber/cin2opt8d00b9abnq6trki27e/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg', {maxZoom:20}),
		    'Trails': L.mapbox.tileLayer('mapbox.run-bike-hike'),
		    'Sedona': L.tileLayer('https://api.mapbox.com/styles/v1/sedonachamber/cin7oyyjz000waamcx7v412nr/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg', {maxZoom:20}),
		    'Red': L.tileLayer('https://api.mapbox.com/styles/v1/sedonachamber/cin2kt8ku001sb4mawvdvwjxf/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg', {maxZoom:20}).addTo(map),
		    //'Light': L.mapbox.tileLayer('mapbox.light'),
		    'Dark': L.tileLayer('https://api.mapbox.com/styles/v1/sedonachamber/cin961o3z00epcxnhaxgzwdb6/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg', {maxZoom:20})
		//},layergroup).addTo(map);
		}).addTo(map);
	}
	
	that.loader.className = 'hide';
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

        //for locate option
        if(that.gotoloc.length==0){
        	///filter out points
	        /*
        	var jsonpoints = that.points.getGeoJSON();
        	var newlistpoints = {};
        	newlistpoints['type'] = "FeatureCollection";
        	newlistpoints['features']=[];
	        for (var i = 0; i < jsonpoints.features.length; i++) {
	          if(jsonpoints.features[i].geometry.type == 'Point' && jsonpoints.features[i].properties['marker-symbol']!="bus"&& jsonpoints.features[i].properties['marker-symbol']!="parking"){
	            newlistpoints['features'].push(jsonpoints.features[i]);
	          }
	        }*/
	        //var nolineslayer = L.geoJson(newlistpoints);
	        //var nearestpoint = turf.nearest(loc, jsonpoints);
	        //nearestpoint.properties['marker-color'] = '#58595B';
	        //nearestpoint.properties['marker-size'] = 'large';
	        //points.setGeoJSON(jsonpoints);
	        //points._geojson.features.concat(nearestpoint);

	        if(jQuery.isEmptyObject(that.points._layers)){
	        	vex.dialog.buttons.YES.text = 'OK';
	        	vex.dialog.alert({
		            message: "Please Turn Layers on to Find Closest Location."
		        });
	        }
	        else{
	        	var nearestpoint = L.GeometryUtil.closestLayer(that.map,that.points,t.latlng);
		        
		        if(!bowser.android&&!bowser.ios){
					that.points.eachLayer(function (layer) {
					    if (layer.feature.properties.title === nearestpoint.layer.feature.properties.title) {
					      	//var tomarker = layer.toGeoJSON();
					      	layer.openPopup();
					    };
					 });
		        }

				if(t.accuracy >550){
					that.map.setView(t.latlng,14);
					vex.dialog.buttons.YES.text = 'OK';
			  		
			  		vex.dialog.alert({
			            message: "Your computer says you are over "+Number(t.accuracy/3.28084).toFixed(0)+" feet from here<br><br><br><b>Please enable wifi or use your phone to locate you."
			        });
				}
				else{
					that.map.setView(t.latlng,16);

			        vex.dialog.buttons.YES.text = 'Get Directions';
			        vex.dialog.alert({
			            message: "You are within " +Number(t.accuracy/3.28084).toFixed(0) +" feet here!<br><br><i>"+nearestpoint.layer.feature.properties.title+"</i> is closest to you.<br>",
			            callback: function(value) {
			              //get directions  
			              //to
			              if(value == true){
				              var tocoords=[nearestpoint.layer.feature.geometry.coordinates[1],nearestpoint.layer.feature.geometry.coordinates[0]];
				              
							  that.loader.className = '';
							  that.getdirections(t.latlng,tocoords);
						  }
			            }
			        });
				}
	        }
	        
        }
        //for regular directions
        else{
        	//this shouldn't happen anymore based on the lines
        	if( Object.prototype.toString.call( that.gotoloc[0] ) === '[object Array]' ) {
        		that.getdirections(t.latlng,that.gotoloc[0]);	
        	}
        	else{
        		that.getdirections(t.latlng,that.gotoloc);		
        	}
        }
        
        //that.currentloc = loc;
        that.map.stopLocate();
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

	vex.dialog.buttons.YES.text = 'Start Here';
	vex.dialog.buttons.NO.text = 'Browse Map';


	//don't need to show data:
	todayDateString = "Walk Sedona shows Sedona Attractions and potential walkable locations.<br><br>Press 'Start Here' to find closest location.<br><br>Use the drop down list <span class='caret'></span> at the <b>top</b> of the page to search more categories.<br><br>Use the <span class='fa fa-map-marker'></span> to the <b>left</b> to find yourself on the map.";

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
	  message: "<br><a target='_blank' href='http://visitsedona.com/'><img src='assets/big_sedona.png' style='padding-left:70px;padding-bottom:5px !important;padding-right:32px !important;'></></a><br><br>"+todayDateString,
	  callback: function(value) {
	    //locate for directions
	    if(value == true){

	      //locate
	      lc.start();    
	    }
	  }
	});
}

function processLayerGeo(t){
	that.points.addData(t.target.getGeoJSON());
}

function processLayer2Geo(t){
	that.points.addData(t.getGeoJSON());
}

function addMouseClickListener(pts){

	//this is dynamic based on the selected points
	pts.on('click', function (e) {
	  	e.layer.openPopup();
	  	
	  	//make sure it doesn't take a line type
	  	if(e.layer.feature.geometry.type == 'Point'){
	  		that.gotoloc = [e.layer.feature.geometry.coordinates[1],e.layer.feature.geometry.coordinates[0]];	
	  	}

		$("#direc" ).on('click', function (e) {
			e.preventDefault();
			that.loader.className = '';
		  	//get direction same
		  	that.map.stopLocate();
		    that.map.locate();
		});

		that.layertitle = e.layer.feature.properties.title;
		that.id2send = String(e.layer.feature.properties.id).split('-')[1];
		//add event for event click for 
		$('#linksite').on('click', function (e) {
			ga('send', 'event', 'linksite', 'click', that.layertitle);

			var datenow = (new Date()).toJSON();
			//2016-01-01
			var datestring = datenow.split('T')[0];

			var dataObj = { action: "updateHits", username: "SedonaMaps_API",password: "cart0gr@phick!", hittypeid: "4",recid: that.id2send, hitdate: datestring };

			$.ajax({
			     url: "https://walksedona.com/php/updatehit.php?idval="+that.id2send+"&d="+datestring,
			 	 success : function (t){  
			         console.log(t.status);  
			     },
			     error : function (xhr, ajaxOptions, thrownError){  
			         console.log(xhr.status);          
			         console.log(thrownError);
			     } 
		 	}); 
		});
		
		// $("#direc" ).on('touchstart', function (e) {
		// 	e.preventDefault();
		// 	that.loader.className = '';
		//   	//get direction same
		//   	that.map.stopLocate();
		//     that.map.locate();
		// });
		//ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);
		ga('send', 'event', 'marker', 'click', e.layer.feature.properties.title);
	});

	/*points.on('mouseover', function (e) {
	  	e.layer.openPopup();
	  	
	  	//make sure it doesn't take a line type
	  	if(e.layer.feature.geometry.type == 'Point'){
	  		that.gotoloc = [e.layer.feature.geometry.coordinates[1],e.layer.feature.geometry.coordinates[0]];	
	  	}

		$("#direc" ).on('click', function (e) {
			e.preventDefault();
			that.loader.className = '';
		  	//get direction same
		  	that.map.stopLocate();
		    that.map.locate();
		});
	});*/
}

function getdirections(start,end){
	that = this;
	
	//duration in seconds/60 more because its cycling
	//distance in meters/3.28084 ft
	//distance in meters/0.000621371 miles
	if(that.directionlayer){
		that.map.removeLayer(that.directionlayer)
	}
	if(that.to){
		that.map.removeLayer(that.to)
	}
	if(that.from){
		that.map.removeLayer(that.from)
	}
	
	that.to = L.circle(end, 26,{
		    color: '#fff',
		    fillColor: '#9E2C2E',
		    fillOpacity: 0.7
	   }).addTo(map);  

	//from 
	that.from = L.circle(start, 26,{
		    color: '#fff',
		    fillColor: '#A1D490',
		    fillOpacity: 0.7
	}).addTo(map).bindPopup("You are here.").bringToFront();
	
	//using cycling because walking doesn't give adequate directions  Change from cycling
	var dir_url = "https://api.tiles.mapbox.com/v4/directions/mapbox.walking/"+start.lng+','+start.lat+";"+end[1]+','+end[0]+".json?instructions=json&geometry=line&access_token="+that.token
	
	$.get( dir_url, function( data ) {

		if(data.routes.length>0){
			var directions = {};
			directions.geometry = data.routes[0].geometry;
			directions.type="Feature";
		    directions.properties = {};
		    
		    //directions.properties.popupContent		    
		    var customPopup= "<i>Walking Time: "+Number(data.routes[0].duration/19).toFixed(0)+" minutes<br><br>Walking Distance: "+Number(data.routes[0].distance*0.000621371).toFixed(0)+" miles";
			
			var dirStyle = {
			    "color": "#61C5BE",
			    "weight": 5,
			    "dashArray": '5,10',
			    "opacity": 0.9
			};

			that.directionlayer = L.geoJson(directions,dirStyle).bindPopup(customPopup).addTo(that.map);
			
			//zoom to
			var bounds = that.directionlayer.getBounds();
			if(bowser.android||bowser.ios){
				//that.map.setView(start);
				//that.map.zoomOut(1);
				that.map.fitBounds(bounds,{padding: [73,73]});

				that.directionlayer.eachLayer(function(m) {
				  	m.openPopup();
				  	//that.map.setView(start);
				});
			}
			else{
				that.map.fitBounds(bounds,{padding: [15,15]});
				that.directionlayer.eachLayer(function(m) {
				  	m.openPopup();
				});
			}
		}
		else{
			vex.dialog.alert({
	            message: "No Current Directions, please try again."
	        });
		}	
		that.gotoloc = [];  
		that.loader.className = 'hide';
	});
}