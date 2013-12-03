require.config({
	
	// when changing here, don't forget to sync changes afterwards 
	// to build-config in root, so the optimizer can build a concat/uglified js for us
	// if the build fails, probably because these are out of sync ;)

	// urlArgs: "bust=" +  (new Date()).getTime(), // remove this in production, cachebustaaa
	deps: ['app', 'jquery'], // load app.js as central kick off
	paths: {
		"jquery" : "http://code.jquery.com/jquery.min",
		'jquery-ui' : '../lib/jquery-ui-1.8.23-min',
		"backbone" : "../lib/backbone",
		"underscore" : "../lib/lodash", // lodash is a drop in replacement for underscore with better performance / AMD compatible
		"jsplumb" : "../lib/jsPlumb-1.4.0-RC1",
		"icanhaz" : "../lib/icanhaz",
		"text" : "../lib/text",
		"_s" : "../lib/underscore.string.min"

	},
	shim: {
		"icanhaz" : {
			"deps" : ['jquery'],
			"exports" : 'ich'
		},
		"jquery-ui" : {
			"deps": ['jquery']
		},
		"../lib/jquery.ui.touch-punch.min": {
			"deps": ['jquery-ui']
		},
		"../lib/jquery.jsPlumb-1.4.0-RC1": ['jquery','jsplumb'],
		"jsplumb": {
			"deps":[ // jsplumbs massive dependency list go here -.-
				'jquery',
				'jquery-ui',
				'../lib/jquery.ui.touch-punch.min',
				'../lib/jsBezier-0.4',
				'../lib/jsPlumb-util-1.4.0-RC1',
				'../lib/jsPlumb-dom-adapter-1.4.0-RC1',
			],
			"exports":"jsPlumb"
		},
		"jsplumb-loader": {
			"deps":['jsplumb']
		},
		"backbone": {
			"deps":['underscore','jquery']
		},
		"main": {
			"deps" : ['jsplumb-loader','icanhaz','_s']
		},
		"_s" : {
			"deps" : ['underscore'],
			"exports" : "_s"
		},
		"mediator": {
			"deps":['backbone'],
			"exports":"bus"
		}
	}
});