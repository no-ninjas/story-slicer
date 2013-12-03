define(function(require){

	// main application pub/sub bus


	var mediator = {};

	_.extend(mediator,Backbone.Events); // extend mediator object with BB event bus


	return mediator; 
});