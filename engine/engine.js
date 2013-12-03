//
// No Ninja Story Slicer Engine
// 

"use strict"

// Namespace
var StorySlicer = {};

var StorySlicer.Game = function() {
    
    var _state = {},
    var _panels = {},

    var _run = function() {
	var panel = _panels['start'];
	
	// display template

	
    };

    var _add_panel = function (new_panel) {
	
    };

    return {
	start: _run,
	addPanel: _add_panel
    };
};

// Engine test code
var game = StorySlicer.Game();

game.addPanel ('start', 
	       StorySlicer.Library.StaticAnimation ('storm.png'),
	       StorySlicer.Library.DefaultPanel(),
	       'It was a dark and stormy night, {{playername}} was sitting by himself in the porch, watching the rain...',
	       [
		   StorySlicer.Choice('Go out into the rain',
				      function(state) {
					  return 'zap-end'
						      }),
		   StorySlicer.Choice('Stay Inside',
				      function(state) {
					  return 'bored-end'
				      })
	       ]);

game.addPanel ('zap-end',
	       StorySlicer.Library.StaticAnimation ('death.png'),
	       StorySlicer.Library.DefaultPanel(),
	       'He was zapped by lightning and died on the spot.',
	       []);

game.addPanel ('bored-end',
	       StorySlicer.Library.StaticAnimation ('boredom.png'),
	       StorySlicer.Library.DefaultPanel(),
	       'He was bored to death. Literally.',
	       []);

game.run();