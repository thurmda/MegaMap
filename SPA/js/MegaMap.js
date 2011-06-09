/* ****************************************************************************
**************************************************************************** */
var $ = jQuery;
//TODO move these to MM
var ge, gex, lookAt, geocoder;

var MM = (function(){
	var _goo = false;
	var _pause = false;
	var _loopTO = null;
	var _type= {};
	var _feedPace = 12000;
	var _google = google ? google : {};
	var _ge, _gex, _geocoder;

	var _init = function() {
		console.log("Init");
		//instanciate all intended singletons, etc.
		MM.data.initDataConnection();
		$.event.trigger("initComplete");
	}
	var _loop = function (fdata){
		//look for data to process and display
		var extraTime =  0;
		if (!_pause && MM.data.feedQueue.length > 0 || fdata){
			var data = fdata ? fdata : MM.data.feedQueue.shift();
			$.event.trigger("newData", data);
			extraTime =  (data.card && data.card.duration) ? data.card.duration : 0;
		}
	  !_pause && !fdata ? _loopTO = setTimeout(_loop, _feedPace + extraTime) : null;
	  $.event.trigger("loopComplete");
	}

	var _initGoogle = function(){
		console.log("initGoogle");
		//Now we can test if Google Earth API actually loaded and for the plug-in	
		_goo = _google.earth  && _google.earth.isInstalled();
		if (_goo){
			var _googleInitCB = function (instance) {
				console.log("googleInitCB");
				  //success callback handed to GE create createInstance
				   _ge = ge = instance;
				   _gex = gex = new GEarthExtensions(ge);
				   _ge.getWindow().setVisibility(true);
				   //ge.getLayerRoot().enableLayerById(ge.LAYER_TERRAIN, true);
				   //ge.getLayerRoot().enableLayerById(ge.LAYER_BUILDINGS, true);
				   _ge.getOptions().setFlyToSpeed(ge.SPEED_TELEPORT);
				   /// look out in space 
					var c = _ge.getView().copyAsCamera(_ge.ALTITUDE_RELATIVE_TO_GROUND);
						c.setTilt(160);
				   _ge.getView().setAbstractView(c);
				   $.event.trigger("geReady");
				   _loop();
				}
			_google.earth.createInstance('map', _googleInitCB, _googleUnavailable);
			_geocoder = geocoder = new _google.maps.ClientGeocoder();
		}else{
			_googleUnavailable();
		}
		_init();
	}
	var _googleUnavailable = function() {
		console.log("google Unavailable");
		MM.gui.googleUnavailable();
	}

	if(_google.load && _google.setOnLoadCallback){
		console.log("Calling google.load for earth and maps");
		_google.load("earth", "1");
		_google.load("maps", "2");
		_google.setOnLoadCallback(_initGoogle);	
	}else {
		$(_initGoogle);
	}
	
	return {
		ge : function(){return _ge},
		gex : function(){return _gex},
		goo : function(){return _goo},
		pause  : function(val){return _pause = val === undefined ? _pause : val;}, 
		loopTO : _loopTO,
		loop : _loop,
		type : _type,
		feedPace :_feedPace	
	}
})();//MM