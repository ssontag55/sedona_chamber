/*
Main App for Sedona Chambers Map App
Mapblender
2019
	//not usuing from mapbox or layerlist
	//var artpts = L.mapbox.featureLayer('sedonachamber.pmj9fija');
	//var layergroup = {"Restaurants":restaurantpts, "Galleries":artpts,"Recyling Dropoff":recyclingpts};
*/
function startup(){
	that = this;
	that.gotoloc = [];
	that.loader = document.getElementById('loader');
	that.points = L.geoJson();

	that.token = 'pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg';
	
	L.mapbox.accessToken = 'pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg';

	that.browsertype = 'desktop';

  var map = L.mapbox.map('map',null,{zoomControl:false}).setView([34.86394, -111.764860], 14);
  
  //search for mobile version 
	if(bowser.android||bowser.ios||bowser.mobile){
		that.browsertype = 'mobile';
    L.control.zoom({position:'topright'}).addTo(map);
    map.addControl(new L.mapbox.shareControl({position:'topright'}));
		map.on('popupopen', 
      function(e) {
		    var px = map.project(e.popup._latlng) // find the pixel location on the map where the popup anchor is
		    px.y -= e.popup._container.clientHeight/2-100 // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
		    map.panTo(map.unproject(px),{animate: true}); // pan to new center
      });
		var map = L.mapbox.map('map',null, {zoomControl:false}).setView([34.86394, -111.764860], 14);
		L.control.zoom({position:'topright'}).addTo(map);
    map.addControl(new L.mapbox.shareControl({position:'topright'}));
    that.timedelay = 1000;
	}

  that.map = map;

  that.retailCategories = [];
  var retailpts =  L.mapbox.featureLayer('data/retail.json',{popupOptions: { closeButton: true }});
  
  // "tours" features
  var airpts =  L.mapbox.featureLayer('data/tours-air.json',{popupOptions: { closeButton: true }});
  var astronomypts = L.mapbox.featureLayer('data/tours-astronomy.json',{popupOptions: { closeButton: true }});
  // var bikesegwaypts = L.mapbox.featureLayer('data/tours-bikesegway.json',{popupOptions: { closeButton: true }});
  var spiritualpts = L.mapbox.featureLayer('data/spiritual.json',{popupOptions: { closeButton: true }});
  var groundpts = L.mapbox.featureLayer('data/tours-ground.json',{popupOptions: { closeButton: true }});
  var privatepts = L.mapbox.featureLayer('data/tours-guides.json',{popupOptions: { closeButton: true }});
  var jeeptrolleypts = L.mapbox.featureLayer('data/tours-jeeptrolley.json',{popupOptions: { closeButton: true }});
  var specialtypts = L.mapbox.featureLayer('data/tours-specialty.json',{popupOptions: { closeButton: true }});
  var winepts =  L.mapbox.featureLayer('data/tours-wine.json',{popupOptions: { closeButton: true }});
  var evpts = L.mapbox.featureLayer('data/ev.json',{popupOptions: { closeButton: true }});
  var water = L.mapbox.featureLayer('data/water.json',{popupOptions: { closeButton: true }});
  var fixit = L.mapbox.featureLayer('data/bike.json',{popupOptions: { closeButton: true }});
  var churchespts =  L.mapbox.featureLayer('data/churches.json',{popupOptions: { closeButton: true }});

	var basefeatures = L.mapbox.featureLayer('data/basefeatures.json',{popupOptions: { closeButton: true }});
	var lodgingpts = L.mapbox.featureLayer('data/hotels.json',{popupOptions: { closeButton: true }});
	var restaurantpts = L.mapbox.featureLayer('data/restaurant.json',{popupOptions: { closeButton: true }});
	var artpts = L.mapbox.featureLayer('data/gallery.json',{popupOptions: { closeButton: true }});
	var buspts = L.mapbox.featureLayer('data/bus.json',{popupOptions: { closeButton: true }});
	var theatrepts = L.mapbox.featureLayer('data/theatre.json',{popupOptions: { closeButton: true }});
	that.parkingpts = L.mapbox.featureLayer('data/parking.json',{popupOptions: { closeButton: true, settings: 'parking' }});
	var walkingfeatures = L.mapbox.featureLayer('data/walking.json',{popupOptions: { closeButton: true }});
	var museumpts = L.mapbox.featureLayer('data/museum.json',{popupOptions: { closeButton: true }});
	var publicartpts = L.mapbox.featureLayer('data/publicart.json',{popupOptions: { closeButton: true }});
	var recyclingpts = L.mapbox.featureLayer('data/recycling.json',{popupOptions: { closeButton: true }});
	var parkpts = L.mapbox.featureLayer('data/parks.json',{popupOptions: { closeButton: true }});
  that.spacespts = L.mapbox.featureLayer('data/spaces.json',{popupOptions: { closeButton: true }});

  var transpoints = L.mapbox.featureLayer('data/trans.json',{popupOptions: { closeButton: true }});
  var what2dopoints = L.mapbox.featureLayer('data/what2do.json',{popupOptions: { closeButton: true }});

	var trafficLayer = L.mapbox.styleLayer('mapbox://styles/sedonachamber/cj0d9x1vd00012rlbjrrj7ciu', {maxZoom:20,zIndex:1000});

  basefeatures.addTo(map);
	addMouseClickListener(basefeatures); 

  retailpts.on('ready', processLayerGeo);
  airpts.on('ready', processLayerGeo);
  water.on('ready', processLayerGeo);
  fixit.on('ready', processLayerGeo);
  astronomypts.on('ready', processLayerGeo);
  //bikesegwaypts.on('ready', processLayerGeo);
  groundpts.on('ready', processLayerGeo);
  privatepts.on('ready', processLayerGeo);
  jeeptrolleypts.on('ready', processLayerGeo);
  specialtypts.on('ready', processLayerGeo);
  winepts.on('ready', processLayerGeo);
  evpts.on('ready', processLayerGeo);
	lodgingpts.on('ready', processLayerGeo);
	restaurantpts.on('ready', processLayerGeo);
	theatrepts.on('ready',  processLayerGeo);
	that.parkingpts.on('ready',  processLayerGeo);
	museumpts.on('ready',  processLayerGeo);
  churchespts.on('ready',  processLayerGeo);
	artpts.on('ready',  processLayerGeo);
	theatrepts.on('ready',  processLayerGeo);
	buspts.on('ready',  processLayerGeo);
	publicartpts.on('ready',  processLayerGeo);
  parkpts.on('ready',  processLayerGeo);
  transpoints.on('ready',  processLayerGeo);
  what2dopoints.on('ready',  processLayerGeo);

	if(window.location.href.indexOf("tours") > -1) {
		deselectAllExcept(['tours', 'air', 'astronomy', 'bikesegway', 'ground', 'private', 'jeeptrolley', 'specialty', 'wine', 'water', 'bike', 'church']);
    airpts.addTo(map);
    astronomypts.addTo(map);
    //bikesegwaypts.addTo(map);
    groundpts.addTo(map);
    water.addTo(map);
    privatepts.addTo(map);
    jeeptrolleypts.addTo(map);
    specialtypts.addTo(map);
    winepts.addTo(map);
    addMouseClickListener(airpts);
    addMouseClickListener(astronomypts);
    //addMouseClickListener(bikesegwaypts);
    addMouseClickListener(groundpts);
    addMouseClickListener(privatepts);
    addMouseClickListener(jeeptrolleypts);
    addMouseClickListener(specialtypts);
    addMouseClickListener(winepts);
    addMouseClickListener(water);
  }
  else if(window.location.href.indexOf("restaurants") > -1) {
		deselectAllExcept(['rest']);
    restaurantpts.addTo(map);
    addMouseClickListener(restaurantpts);
  }
  else if(window.location.href.indexOf("bike") > -1) {
    deselectAllExcept(['bike', 'water']);
    fixit.addTo(map);
    water.addTo(map);
    addMouseClickListener(fixit);
    addMouseClickListener(water);
    map.setView([34.86394, -111.764860], 13);
  }
  else if(window.location.href.indexOf("churches") > -1){
    deselectAllExcept(['churches']);
    churchespts.addTo(map);
    addMouseClickListener(churchespts);  
  }
  else if(window.location.href.indexOf("lodging") > -1){
    deselectAllExcept(['lodge']);
    lodgingpts.addTo(map);
    addMouseClickListener(lodgingpts);	
  }
  else if(window.location.href.indexOf("green") > -1){
    deselectAllExcept(['recycling']);
    recyclingpts.addTo(map);
    addMouseClickListener(recyclingpts);	
  }
  else if(window.location.href.indexOf("parks") > -1){
    deselectAllExcept(['parks', 'water']);
    parkpts.addTo(map);
    water.addTo(map);
    addMouseClickListener(water);
    addMouseClickListener(parkpts);	
  }
  else if(window.location.href.indexOf("trails") > -1){
    deselectAllExcept(['parks', 'water']);
    parkpts.addTo(map);
    water.addTo(map);
    fixit.addTo(map);
    addMouseClickListener(fixit);
    addMouseClickListener(water);
    addMouseClickListener(parkpts);	
  }
  else if(window.location.href.indexOf("parking") > -1){
    deselectAllExcept(['parking','ev']);
    that.parkingpts.addTo(map);
    evpts.addTo(map);
    addMouseClickListener(evpts);
    addRealTimeParking(true);
    setInterval(addRealTimeParking, 50000);
  }
  else if(window.location.href.indexOf("publicart") > -1){
    deselectAllExcept(['pubart']);
    publicartpts.addTo(map);	
    addMouseClickListener(publicartpts);	
    if(that.browsertype == 'mobile'){
      $('#pubartCarouselmobile').show();
    }
    else{
      $('#pubartCarousel').show();	
    }
  }
  else if(window.location.href.indexOf("art") > -1){
    deselectAllExcept(['gallery','bus','walk','museum','theatre']);
    theatrepts.addTo(map);
    museumpts.addTo(map);
    that.parkingpts.addTo(map);
    buspts.addTo(map);
    artpts.addTo(map);
    walkingfeatures.addTo(map);	
    addMouseClickListener(artpts);	
  }
  else if(window.location.href.indexOf("galleries") > -1){
    deselectAllExcept(['gallery','bus','walk','museum','theatre']);
    theatrepts.addTo(map);
    museumpts.addTo(map);
    artpts.addTo(map);
    buspts.addTo(map);
    walkingfeatures.addTo(map);	
    addMouseClickListener(artpts);	
  }
  else if(window.location.href.indexOf("traffic") > -1){
    deselectAllExcept(['bus','parking','traffic']);
    trafficLayer.addTo(map);
    that.parkingpts.addTo(map);
    buspts.addTo(map);
    addMouseClickListener(that.parkingpts);	
  }
  else if(window.location.href.indexOf("retail") > -1){
    deselectAllExcept(['retail-293','retail','retail-276','retail-279','retail-284','retail-415','retail-286','retail-287','retail-288','retail-294']);
    that.retailCategories = ['276','415','286','287','288','337','294', '279', '293', '284'];
    retailpts.addTo(map);
    addMouseClickListener(retailpts); 
  }
  else{
    restaurantpts.addTo(map);
    theatrepts.addTo(map);
    museumpts.addTo(map);
    artpts.addTo(map);	
    buspts.addTo(map);
    walkingfeatures.addTo(map);
    addMouseClickListener(artpts);
    addMouseClickListener(restaurantpts);
    addMouseClickListener(theatrepts);
    addMouseClickListener(buspts);
    addMouseClickListener(museumpts);
    addMouseClickListener(walkingfeatures);
  }

  function deselectAllExcept(selectedValues) {
    selectedLayers = [selectedValues];

    // set selected values on select options
    $('#search-select-list')
      .find('.select-item')
      .each(function() {
        if (selectedValues.includes($(this).data('value'))) {
          $(this).data('selected', true);
          $(this).attr('data-selected', true);
        } else {
          $(this).data('selected', false);
          $(this).attr('data-selected', false);
        }
      });

    map.removeLayer(that.spacespts);

    map.removeLayer(artpts);
    map.removeLayer(water);
    map.removeLayer(retailpts);
    map.removeLayer(fixit);
    map.removeLayer(restaurantpts);
    map.removeLayer(theatrepts);
    map.removeLayer(museumpts);
    map.removeLayer(that.parkingpts);
    map.removeLayer(parkpts);
    map.removeLayer(publicartpts);
    map.removeLayer(recyclingpts);
    map.removeLayer(buspts);
    map.removeLayer(walkingfeatures);
    map.removeLayer(trafficLayer);
  }

  // Submenu collape/expand
  $('.select-item.parent .switch-label span').on('click', function(e) {
    e.stopPropagation();

    var parentLi = $(this)
      .parent('.switch-label')
      .parent('.select-item')
      .parent('li');
    
    var isExpanded = parentLi.hasClass('open');
    subMenuExpand(parentLi, !isExpanded)
  });

  function subMenuExpand(parentLi, expand) {
    // always remove open class and duplicates
    parentLi.removeClass('open');

    if (expand) {
      parentLi.addClass('open');
      parentLi.children('.select-item')
        .find('.parent-icon')
        .removeClass('glyphicon-plus')
        .addClass('glyphicon-minus');

      parentLi
        .children('ul.children')
        .each(function(i) {
          this.style.maxHeight = this.scrollHeight + 'px';
        });
    } else {
      parentLi.children('.select-item')
        .find('.parent-icon')
        .addClass('glyphicon-plus')
        .removeClass('glyphicon-minus');

      parentLi
        .children('ul.children')
        .each(function(i) {
          this.style.maxHeight = null;
        });
    }
  }

  var selectedLayers = [];
  
  // Select & add to map functionality
  // populate list with selected options in html
  $('#search-select-list .select-item').each(function() {
    if ($(this).data('selected')) selectedLayers.push($(this).data('value'));
  });

  // add event handlers for list item click
  $('#search-select-list .select-item').on('click', function(e) {
    // early return if checkbox itself is clicked (catch event at li)
    if (e.target.type === "checkbox") return;

    var selectedValue = $(this).data('value');
    
    // determine newSelectValue and select/deselect
    const newSelectValue = !selectedLayers.includes(selectedValue);
    selectDeselect($(this), selectedValue, newSelectValue);

    // if item has children, select/deselect them all
    if ($(this).siblings('.children').length > 0) {
      $(this).siblings('.children').each(function(i) {
        $(this).find('.select-item').each(function(i) {
          selectDeselect($(this), $(this).data('value'), newSelectValue);
        });
      });
    }

    // if target is a child, select/deselect parent based on children's selected status
    if ($(this).parents('.children').length > 0) {
      $(this).parents('.children').each(function (i) {
        var allSelected = true;

        // determine if all are selected
        $(this).find('.select-item').each(function(i) {
          if (!selectedLayers.includes($(this).data('value'))) allSelected = false;
        });

        if (allSelected) {
          $(this).siblings('.select-item').each(function(i) {
            selectDeselect($(this), $(this).data('value'), true);
          });
        } else {
          $(this).siblings('.select-item').each(function(i) {
            selectDeselect($(this), $(this).data('value'), false);
          });
        }
      });
    }
	});

  function selectDeselect(el, selectedValue, newSelectValue) {
    // open dropdowns if they exist
    if (el.siblings('.children').length > 0) {
      subMenuExpand(el.parent('li'), true);
    }

    that.points = L.geoJson();
    var showcarasal = false;

    // toggle "selected" attribute
    el.data('selected', newSelectValue);
    el.attr( 'data-selected', newSelectValue);

    if(selectedValue.search('retail')>-1) {

      // map.removeLayer(retailpts);
      if(!newSelectValue && selectedValue.split('-')[1] ) {
        that.retailCategories.splice(that.retailCategories.indexOf(selectedValue.split('-')[1]),1);

        retailpts.setFilter(function (feature) {
          return that.retailCategories.includes(feature.properties.subcat);
        });
        retailpts.addTo(map); 
      }
    }

    // add layer to array if it's not there, otherwise remove it
    if (!newSelectValue) {
      selectedLayers = selectedLayers.filter(function(val) { return val !== selectedValue });

      map.removeLayer(that.spacespts);

      if (selectedValue === 'gallery') map.removeLayer(artpts);
      if (selectedValue === 'rest') map.removeLayer(restaurantpts);
      if (selectedValue === 'theatre') map.removeLayer(theatrepts);
      if (selectedValue === 'museum') map.removeLayer(museumpts);
      if (selectedValue === 'parking') map.removeLayer(that.parkingpts);
      if (selectedValue === 'parks') map.removeLayer(parkpts);
      if (selectedValue === 'lodge') map.removeLayer(lodgingpts);
      if (selectedValue === 'church') map.removeLayer(churchespts);
      if (selectedValue === 'water') map.removeLayer(water);
      if (selectedValue === 'bike') map.removeLayer(fixit);
      if (selectedValue === 'pubart') map.removeLayer(publicartpts);
      if (selectedValue === 'recycling') map.removeLayer(recyclingpts);
      if (selectedValue === 'bus') map.removeLayer(buspts);
      if (selectedValue === 'walk') map.removeLayer(walkingfeatures);
      if (selectedValue === 'traffic') map.removeLayer(trafficLayer);
      if (selectedValue === 'air') map.removeLayer(airpts);
      if (selectedValue === 'astronomy') map.removeLayer(astronomypts);
      if (selectedValue === 'bikesegway') map.removeLayer(bikesegwaypts);
      if (selectedValue === 'ground') map.removeLayer(groundpts);
      if (selectedValue === 'private') map.removeLayer(privatepts);
      if (selectedValue === 'jeeptrolley') map.removeLayer(jeeptrolleypts);
      if (selectedValue === 'specialty') map.removeLayer(specialtypts);
      if (selectedValue === 'wine') map.removeLayer(winepts);
      if (selectedValue === 'ev') map.removeLayer(evpts);
      if (selectedValue === 'spiritual') map.removeLayer(spiritualpts);
      if (selectedValue === 'trans') map.removeLayer(transpoints);
      if (selectedValue === 'what2do') map.removeLayer(what2dopoints);
    } else {
      selectedLayers.push(selectedValue);

      if(selectedValue == 'air'){
        airpts.addTo(map);
        processLayer2Geo(airpts);
        addMouseClickListener(airpts);
      }
      else if(selectedValue == 'spiritual'){
        spiritualpts.addTo(map);
        processLayer2Geo(spiritualpts);
        addMouseClickListener(spiritualpts);
      }
      else if(selectedValue == 'trans'){
        transpoints.addTo(map);
        processLayer2Geo(transpoints);
        addMouseClickListener(transpoints);
      }
      else if(selectedValue == 'what2do'){
        what2dopoints.addTo(map);
        processLayer2Geo(what2dopoints);
        addMouseClickListener(what2dopoints);
      }  
      else if(selectedValue == 'church'){
        churchespts.addTo(map);
        processLayer2Geo(churchespts);
        addMouseClickListener(churchespts);
      }
      else if(selectedValue == 'astronomy'){
        astronomypts.addTo(map);
        processLayer2Geo(astronomypts);
        addMouseClickListener(astronomypts);
      }     
      else if(selectedValue == 'bikesegway'){
        bikesegwaypts.addTo(map);
        processLayer2Geo(bikesegwaypts);
        addMouseClickListener(bikesegwaypts);
      }        
      else if(selectedValue == 'ground'){
        groundpts.addTo(map);
        processLayer2Geo(groundpts);
        addMouseClickListener(groundpts);
      }        
      else if(selectedValue == 'private'){
        privatepts.addTo(map);
        processLayer2Geo(privatepts);
        addMouseClickListener(privatepts);
      }        
      else if(selectedValue == 'jeeptrolley'){
        jeeptrolleypts.addTo(map);
        processLayer2Geo(jeeptrolleypts);
        addMouseClickListener(jeeptrolleypts);
      }        
      else if(selectedValue == 'specialty'){
        specialtypts.addTo(map);
        processLayer2Geo(specialtypts);
        addMouseClickListener(specialtypts);
      }        
      else if(selectedValue == 'wine'){
        winepts.addTo(map);
        processLayer2Geo(winepts);
        addMouseClickListener(winepts);
      }        
      else if(selectedValue == 'gallery'){
        artpts.addTo(map);
        processLayer2Geo(artpts);
        addMouseClickListener(artpts);
      }        
      else if(selectedValue == 'rest'){
        processLayer2Geo(restaurantpts);
        restaurantpts.addTo(map);
        addMouseClickListener(restaurantpts);
      }   
      else if(selectedValue == 'theatre'){
        theatrepts.addTo(map);	
        processLayer2Geo(theatrepts);
        addMouseClickListener(theatrepts);
      }
      else if(selectedValue == 'museum'){
        museumpts.addTo(map);	
        processLayer2Geo(museumpts);
        addMouseClickListener(museumpts);
      }
      else if(selectedValue == 'parking'){
        that.parkingpts.addTo(map);	
        that.loader.className = '';
        addRealTimeParking(true);
        addMouseClickListener(that.parkingpts);
      }
      else if(selectedValue == 'parks'){
        parkpts.addTo(map);	
        addMouseClickListener(parkpts);
      }
      else if(selectedValue == 'lodge'){
        lodgingpts.addTo(map);	
        addMouseClickListener(lodgingpts);
      }
      else if(selectedValue == 'water'){
        water.addTo(map);  
        addMouseClickListener(water);
      }
      else if(selectedValue == 'bike'){
        fixit.addTo(map);  
        addMouseClickListener(fixit);
      }
      else if(selectedValue == 'pubart'){
        publicartpts.addTo(map);	
        processLayer2Geo(publicartpts);
        addMouseClickListener(publicartpts);
        showcarasal = true;
      }
      else if(selectedValue == 'recycling'){
        recyclingpts.addTo(map);	
        processLayer2Geo(recyclingpts);
        addMouseClickListener(recyclingpts);
      }
      else if(selectedValue == 'bus'){
        buspts.addTo(map);	
        addMouseClickListener(buspts);
      }
      else if(selectedValue == 'walk'){
        walkingfeatures.addTo(map);	
        addMouseClickListener(walkingfeatures);
      }
      else if(selectedValue == 'traffic'){
        trafficLayer.addTo(map);	
      }
      else if(selectedValue == 'ev'){
        evpts.addTo(map);  
      } else if(selectedValue.search('retail') > -1){

        // filter by sub categories
        if( selectedValue.split('-')[1] ) {
          that.retailCategories.push(selectedValue.split('-')[1]);
          retailpts.setFilter(function (feature) {
            return that.retailCategories.includes(feature.properties['subcat']);
          });
          map.removeLayer(retailpts);
          retailpts.addTo(map); 
          addMouseClickListener(retailpts);
        }
      }
    }
    if(showcarasal == true){
      if(that.browsertype == 'mobile'){
        $('#pubartCarouselmobile').show();
      }
      else{
        $('#pubartCarousel').show();	
      }
    }
    else{
      $('#pubartCarousel').hide();
      $('#pubartCarouselmobile').hide();
    }
  }

  // Search bar functionality
  $('#search-select-bar').on('input', function(e) {
    var searchVal = $(this).val();
    var found = 0;    

    // hide all options that don't match search value
    showMatches(
      $('#search-select-list').children('li:not(#no-results)'),
      searchVal
    );

    // expand all submenus if we are filtering
    $('#search-select-list').children('li:not(#no-results)').each(function() {
      subMenuExpand($(this), searchVal.length > 0);
    });

    if (found === 0) {
      $('#no-results')
        .show()
        .find('.switch-label')
        .html('<span class="icon glyphicon glyphicon-remove"></span>&nbsp;&nbsp;No results matched \"' + searchVal + '\"');
    } else {
      $('#no-results').hide();
    }

    function showMatches(elements, searchVal) {
      elements.each(function(i) {
        $(this).hide();
  
        if ($(this).children('.children').length > 0) {
          showMatches(
            $(this).children('.children').children('li'),
            searchVal
          )
        }
  
        if ($(this).text().toLowerCase().includes(searchVal.toLowerCase())) {
          $(this).show();
          found++
        }
      });
    }
  });

	var todayDateString;
	var d = new Date(); 
	todayDateString = d.toString("dddd, MMMM dd, yyyy h:mm tt");


    $('.thumbnail').on('click', function(t) {
    	var idimagery = this.id;
    	publicartpts.eachLayer(function (layer) {
		  if(layer.feature.id ==idimagery){
		  	layerpointclick(layer);
		  }
		});
	});
	
	var mylocIcon = L.icon({
     iconUrl: 'app/css/ripple.gif',
     iconAnchor: [10, 10]
	});


  
  var privacyLink = L.Control.extend({
      options: {
        position: 'bottomleft'
      },
      onAdd: function (map) {
        var container = L.DomUtil.create('div', 'privacy-control');

        container.innerHTML = '<a href="https://visitsedona.com/privacy-policy/" target="_blank">Privacy Policy</a>';
        return container;
      }
  });
  map.addControl(new privacyLink());

  //turn dark if at night
  if(d.getHours()>19||d.getHours()<7){
    L.control.layers({
        'Streets': L.mapbox.tileLayer('mapbox.streets',{maxZoom:20}),
        'Earth': L.mapbox.tileLayer('mapbox.satellite', {maxZoom:22}),
        //'Trails': L.mapbox.tileLayer('mapbox.run-bike-hike'),
        //'Sedona': L.tileLayer('https://api.mapbox.com/styles/v1/sedonachamber/cin7oyyjz000waamcx7v412nr/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg', {maxZoom:20}),
        //'Sedona Red': L.tileLayer('https://api.mapbox.com/styles/v1/sedonachamber/cin2kt8ku001sb4mawvdvwjxf/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg', {maxZoom:20}),
        'Dark': L.tileLayer('https://api.mapbox.com/styles/v1/sedonachamber/cin961o3z00epcxnhaxgzwdb6/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg', {maxZoom:20}).addTo(map)
    },null,{position:'bottomleft'}).addTo(map);
    //},layergroup).addTo(map);
  }
  else{
    L.control.layers({
        'Streets': L.mapbox.tileLayer('mapbox.streets',{maxZoom:20}),
        'Earth': L.mapbox.tileLayer('mapbox.satellite', {maxZoom:22}),
        //'Simple Streets': L.tileLayer('https://api.mapbox.com/styles/v1/sedonachamber/cin2opt8d00b9abnq6trki27e/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg', {maxZoom:20}),
        //'Trails': L.mapbox.tileLayer('mapbox.run-bike-hike'),
        //'Sedona': L.tileLayer('https://api.mapbox.com/styles/v1/sedonachamber/cin7oyyjz000waamcx7v412nr/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg', {maxZoom:20}),
        //'Red': L.mapbox.styleLayer('mapbox://styles/sedonachamber/cj0d9x1vd00012rlbjrrj7ciu', {maxZoom:20}).addTo(map),
        'Sedona Red': L.tileLayer('https://api.mapbox.com/styles/v1/sedonachamber/cin2kt8ku001sb4mawvdvwjxf/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg', {maxZoom:20}).addTo(map)
        //'Light': L.mapbox.tileLayer('mapbox.light'),
        //'Dark': L.tileLayer('https://api.mapbox.com/styles/v1/sedonachamber/cin961o3z00epcxnhaxgzwdb6/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg', {maxZoom:20})
    //},layergroup).addTo(map);
    },null,{position:'bottomleft'}).addTo(map);
  }


	var lc = L.control.locate({
		follow: true,
		keepCurrentZoomLevel: false,
		locateOptions: {maxZoom: 16},
		metric: false,
		showPopup: true, 
    position: 'topright',
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

	//add below locate
	map.addControl(L.control.customsearch({ position: 'topright' }));


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

function layerpointclick(layr){
	
	layr.openPopup();	
  	map.setView(layr._latlng, 15);
  	/*if(that.browsertype == 'mobile'){
  		//map.panBy([0, -130]);	
  	}
  	else{
  		//map.panBy([0, -10]);
  	}*/
  	map.panBy([0, -130]);

	if(layr.feature.geometry.type == 'Point'){
  		that.gotoloc = [layr.feature.geometry.coordinates[1],layr.feature.geometry.coordinates[0]];	
  	}

	$("#direc").on('click', function (e) {
		e.preventDefault();
		that.loader.className = '';
	  	//get direction same
	  	that.map.stopLocate();
	    that.map.locate();
	});
}

function processLayerGeo(t){
	that.points.addData(t.target.getGeoJSON());
}

function processLayer2Geo(t){
	that.points.addData(t.getGeoJSON());
}

function addParkinglotInfo(d){
	var parkingloturl = "https://walksedona.com/php/proxy_parkinglot.php?https://api.streetsoncloud.com/pl1/multi-lot-info";
	$.get({
        url: parkingloturl,
		success : function (data){  
			that.total_spaces = data[0][0].total_spaces;
			that.free_spaces = data[0][0].free_spaces;
			that.occupancy_per = data[0][0].occupancy + '%';

			that.map.eachLayer(function(marker) {    
		        if(marker.options){
		        	if (marker.options.hasOwnProperty('popupOptions')) {
			            if(marker.options.popupOptions.settings == 'parking'){
			            	//parking layer
			            	for (var parkingArea in that.parkingpts._layers) {
			            		if(that.parkingpts._layers[parkingArea].feature.properties['id']  == 'marker-in81c3mc7'){
			            			//that.parkingpts._layers[parkingArea].setPopupContent('<div class="marker-description"><br>@Cedar and Schnebly<br><div id="direc"><a target="_blank">Get Directions!</a></div></div>';//<br>'+that.occupancy_per+' Occupied<br>
			            			that.parkingpts._layers[parkingArea]._icon['title'] = 'Lot #5 (' + that.free_spaces + ') spaces available';
			            			that.parkingpts._layers[parkingArea].setPopupContent('<div style="color:#4bc1b9;width:162px;"><b>Lot #5 ('+ that.free_spaces + ') spaces currently available</b><div class="marker-description"><img style="padding-top:3px;" src="https://walksedona.com/assets/parkinglots/p5map.png"><br>@Cedar and Schnebly<br><div id="direc"><a target="_blank">Get Directions!</a></div></div>');
			            			if(d){
			            				that.parkingpts._layers[parkingArea].openPopup();	
			            			}
			            			
			            			that.gotoloc = [34.87280792707314,-111.76021456718445];

			            			$("#direc").on('click', function (e) {
    											e.preventDefault();
    											that.loader.className = '';
  										  	//get direction same
  										  	that.map.stopLocate();
  										    that.map.locate();
    										});
			            		}
			            	}
			            }
			        }
		        } 
		    });

        	//that.loader.className = 'hide';
	     },
	     error : function (xhr, ajaxOptions, thrownError){  
			vex.dialog.buttons.YES.text = 'OK';
	        vex.dialog.alert({
	            message: "There was an error collecting real time parking information.  Please try back later."
	        });
	        that.loader.className = 'hide';
	     } 
	});	
}

function addRealTimeParking(first){
	
	// real time service
	var realtimeurl = "https://walksedona.com/php/proxy.php?http://spaceoccupancy.duncan-usa.com/sensor/status/latest/get/json/customer/4211/area/100";
	
	addParkinglotInfo(first);
	setTimeout(function () { 
		$.get( {url:realtimeurl, 
			success : function (data){  
		        var data = JSON.parse(data);
				var spacesids = data.i_areas[0].indicators.glob_addr;
				var spacesoccupied = data.i_areas[0].indicators.occupied;
				that.totalopen = 0;

				for (var layerSpace in that.spacespts._layers) {
					for (var i = spacesoccupied.length; i >= -1; i--) {
						if(spacesids[i] == that.spacespts._layers[layerSpace].feature.properties['Spaceid']){

							if(spacesoccupied[i]){
								that.spacespts._layers[layerSpace].feature.properties['id'] = layerSpace;
								that.spacespts._layers[layerSpace].feature.properties['title'] = 'Occupied';
								that.spacespts._layers[layerSpace].feature.properties['description'] = "Occupied";
								that.spacespts._layers[layerSpace].bindPopup('Space Occupied');
								that.spacespts._layers[layerSpace].options.icon.options.iconUrl = "https://a.tiles.mapbox.com/v4/marker/pin-m-roadblock+ff2828.png?access_token=pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg";	
							}
							else{
								that.totalopen++;
								that.spacespts._layers[layerSpace].feature.properties['id'] = layerSpace;
								that.spacespts._layers[layerSpace].feature.properties['title'] = 'Open';
								that.spacespts._layers[layerSpace].feature.properties['description'] = "Open";
								that.spacespts._layers[layerSpace].bindPopup('Space Available');
								that.spacespts._layers[layerSpace].options.icon.options.iconUrl = "https://a.tiles.mapbox.com/v4/marker/pin-m-car+00ac00.png?access_token=pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg";	
							}
						}
					}
				}
				
	        	that.loader.className = 'hide';
				that.spacespts.addTo(map);

				that.totalopen = Number(that.free_spaces) + that.totalopen;
				/*vex.close();
				vex.dialog.buttons.YES.text = 'OK';
				vex.dialog.alert({
		            message: "There are currently <b> (" + String(that.totalopen) + ") </b>  parking spaces open in town. Refresh browser to show most up-to-date information."
		        });*/
		     },
		     error : function (xhr, ajaxOptions, thrownError){  
				vex.dialog.buttons.YES.text = 'OK';
		        vex.dialog.alert({
		            message: "There was an error collecting real time parking information.  Please try back later."
		        });
		        that.loader.className = 'hide';
		     } 
		});	
    }, 2300);
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
			         //console.log(t.status);  
			     },
			     error : function (xhr, ajaxOptions, thrownError){  
			         //console.log(xhr.status);          
			         //console.log(thrownError);
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

	/*pts.on('mouseover', function (e) {
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
	var dir_url = "https://api.tiles.mapbox.com/v4/directions/mapbox.driving/"+start.lng+','+start.lat+";"+end[1]+','+end[0]+".json?instructions=json&geometry=line&access_token="+that.token
	
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

function toggleNav() {
  $('#side-menu').toggleClass('is-active');
  $('#hamburger').toggleClass('is-active');
  $('#main').toggleClass('is-active');
}
