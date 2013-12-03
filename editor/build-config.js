{
	// urlArgs: "bust=" +  (new Date()).getTime(), // remove this in production, cachebustaaa
	deps: ['app', 'jquery','jsplumb'], // load app.js as central kick off
	paths: {
		"jquery" : "http://code.jquery.com/jquery.min",
		'jquery-ui' : '../lib/jquery-ui-1.8.23-min',
		"backbone" : "../lib/backbone",
		"underscore" : "../lib/lodash",
		"jsplumb" : "../lib/jsPlumb-1.4.0-RC1"
	},
	shim: {
		"jquery-ui" : {
			"deps": ['jquery']
		},
		"../lib/jquery.ui.touch-punch.min": {
			"deps": ['jquery-ui']
		},
		"jsplumb": {
			"deps":[ // jsplumbs massive dependency list go here
				'jquery',
				'jquery-ui',
				'../lib/jquery.ui.touch-punch.min',
				// '../lib/jsBezier-0.4',
				'../lib/jsPlumb-util-1.4.0-RC1',
				'../lib/jsPlumb-dom-adapter-1.4.0-RC1',
				// '../lib/jsPlumb-defaults-1.4.0-RC1',
				// '../lib/jsPlumb-connectors-statemachine-1.4.0-RC1',
				// '../lib/jsPlumb-renderers-svg-1.4.0-RC1',
				// '../lib/jsPlumb-renderers-canvas-1.4.0-RC1',
				// '../lib/jsPlumb-renderers-vml-1.4.0-RC1',
				// '../lib/jquery.jsPlumb-1.4.0-RC1'
			],
			"exports":"jsPlumb"
		},
		"backbone": {
			"deps":['underscore','jquery']
		},
		"main": {
			"deps" : ['jsplumb']
		},
		"mediator": {
			"deps":['backbone']
		}
	}
}