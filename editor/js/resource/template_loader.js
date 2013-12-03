// define(["jquery","underscore","icanhaz"],function($,_,ich){
	

// 	var template_names = [	
// 		'test'
// 	];

// 	require([
// 		'text!templates/test.tpl',
// 	],function (){
// 		for (var i = arguments.length - 1; i >= 0; i--) {
// 			ich.addTemplate(template_names[i],arguments[i]);
// 		};		
// 	});


// })

define([
	'text!templates/test.tpl',
	'text!templates/holder.tpl',
	'text!templates/structure.tpl'
], function(){
	
	var templates = Array.prototype.slice.call(arguments);

	// must match order above
	var template_names =  [
		'test',
		'holder',
		'structure'
	];

	for (var i = arguments.length - 1; i >= 0; i--) {
		ich.addTemplate(template_names[i],arguments[i]);
	};	
   	
   	return ich;
});

// define(function(require){




// 	var tpls = [
// 		{
// 			name: 'test',
// 			tpl: 'test.tpl'
// 		},
// 	];

// 	// $.each(tpls,function(){
// 	// 	this.tpl = require('text!templates/'+this.tpl);
// 	// });

// 	for (var i = 0; i < tpls.length; i++) {
// 		var template = tpls[i];
// 		template.tpl = require('text!templates/'+template.tpl);
// 	};


// 	return tpls;


// })