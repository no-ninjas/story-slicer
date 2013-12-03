define(function(require){
    
    "use strict";


    var bus = require('mediator'), // in all modules that use a bus, require this to have access to the same object
    $ = require('jquery'),
    _ = require('underscore'),
    utils = require('ui.utils');
    

    ich.addTemplate('node',require('text!templates/node.tpl'));
    ich.addTemplate('addPanelTemplate',require('text!templates/addPanel.tpl'));
    ich.addTemplate('nodeDetails',require('text!templates/nodeDetails.tpl'));

    var main = {
        elements: {
            nodeArea: $("#nodes"),
            addPanelButton: $("[action=add-panel]")
        },
        openDialog: function(content,callback){
            $(".dialog").empty().html(content);
            $(".dialog").find('.button.submit').bind('click',callback);
            $(".dialog .button.cancel").bind('click',$.proxy(this.closeDialog,this));
            $(".overlay").removeClass('hidden');
        },
        closeDialog: function(){
            $(".overlay").addClass('hidden');
        },
        formJSON: function(selector){
            // convert form elements to a JS object <3
            var form = {};
             $(selector).find('input, select, textarea').each( function() {
                 var self = $(this);
                 var name = self.attr('name');
                 if (form[name]) {
                    form[name] = form[name] + ',' + self.val();
                 }
                 else {
                    form[name] = self.val();
                 }
             });

             return form;
        },
        data: {
            panels: {},
            state: {},
	    audio: ['track1.mp3','track2.mp3'],
            animation: []
        },
        init: function(){
            var self = this;

            this.bus = bus;
            

            this.bus.on('data:changed',$.proxy(this.updateStorage,this));
            this.elements.addPanelButton.bind('click',function(){
                self.openDialog(ich.addPanelTemplate({
                    audio_options: [],
                    animation_options: []
                }),function(){
                    var ok = confirm('sure?');
                    if (ok) {
                        var panelDetails = self.formJSON($(".dialog form"));
                        var newpanel = {
                            name: _.str.underscored(_.str.slugify(panelDetails.name)),
                            text: _.str.clean(panelDetails.text),
                            position: {
                                left: false,
                                top: false
                            }
                        }
                        self.addPanel(newpanel);
                        self.closeDialog();
                    };
                });
            });

            $(".pnode").live('click',$.proxy(this.nodeClickHandler,this));

    	    this.setupPlumbingStyle();
            this.loadNodes();

    	    // Events need to be setup after the nodes are loaded to
    	    // avoid having the connection handler adding more options
    	    // to the panel when the panel is loaded
    	    this.setupPlumbingEvents();

        },
        nodeClickHandler: function(e){
            console.log(arguments);
            console.log();

            var panel = this.data.panels[e.srcElement.id],
                self = this;

            if (panel) {
                $(".pnode").removeClass('current');
                $("#"+e.srcElement.id).addClass('current');

                this.currentEditPanel = e.srcElement.id;

                var details = ich.nodeDetails(panel);
                $("#node-details").empty().html(details);

                $("#node-details .button.delete").bind('click',function(){
                    var ok = confirm('sure?');
                    if (!ok) {return};
                    _.each(self.data.panels,function(item){
                        if (item.options && item.options.length) {
                            _.each(item.options,function(option,idx){
                                if (option.to && option.to == self.currentEditPanel) {
                                    item.options.splice(idx,1);
                                };
                            })
                        };
                    });
                    

                    delete self.data.panels[self.currentEditPanel];
                    $("#"+self.currentEditPanel).remove();
                    $("#node-details").empty();
                });

            };

        },
        updateStorage: function(){
	       window.localStorage.setItem('panels',JSON.stringify(this.data.panels))
        },
        loadNodes: function(){

            var nodes = JSON.parse(window.localStorage.getItem('panels'));
            var self = this;

            if (nodes) {
                _.each(nodes,function(item,idx){
                    self.addPanel(item);

                });
                this.buildConnections();
            };

        },
        buildConnections: function(){
            _.each(this.data.panels,function(panel){
                if (panel.options) {
                    _.each(panel.options,function(item){
                         jsPlumb.connect({
                            source: panel.name,
                            target: item.to
                        });
                    });
                };                    
            });
        },
        addPanel: function(panel){

            if (!panel.position) {
                panel.position = {
                    left: false,
                    top: false
                }
            };

            this.data.panels[panel.name] = {
                name: panel.name,
                options: panel.options && panel.options.length > 0 ? panel.options : [],
                text: panel.text || "missing text",
                animation: panel.anmiation || false,
                audio: panel.audio || false,
                position: {
                    left: panel.position.left || (Math.random() * 300) << 0,
                    top: panel.position.top || (Math.random() * 300) << 0
                }
            }

            var toinsert = ich.node(panel);

            this.elements.nodeArea.append(toinsert);
            var last_inserted = this.elements.nodeArea.find('.pnode:last');
            last_inserted.css({'left':this.data.panels[panel.name].position.left})
            last_inserted.css({'top':this.data.panels[panel.name].position.top})

            this.prepNode(last_inserted);

            this.bus.trigger('data:changed');
            return this;
        },
        prepNode: function(node){
            var p = node,
                target = node.find('.ep:first'),
                self = this;


            jsPlumb.makeSource(target, {
                parent: node,
                anchor: "Continuous",
                connector: ["StateMachine", {
                    curviness: 20
                }],
                connectorStyle: {
                    strokeStyle: '#AAAAAA',
                    lineWidth: 2
                },
                maxConnections: 12,
                onMaxConnections: function(info, e) {
                    alert("Maximum connections (" + info.maxConnections + ") reached");
                }
            });

            // initialise draggable elements. 
            jsPlumb.draggable(node,{
                containment: "#nodes",
                stop: $.proxy(self.handleDragEnd, self)
            });

            // initialise all '.w' elements as connection targets.
            jsPlumb.makeTarget(node, {
                dropOptions: {
                    hoverClass: "dragHover"
                },
                anchor: "Continuous"
            });
        },
        
	    handleDragEnd: function(e, item){
            var node = this.data.panels[item.helper.context.id];

            if (node) {
                node.position = item.position;
                this.bus.trigger('data:changed'); 
            };
            
        },

        setupPlumbingStyle: function(){
            // setup some defaults for jsPlumb. 
            jsPlumb.importDefaults({
                Endpoint: ["Dot", {
                    radius: 2
                }],
                HoverPaintStyle: {
                    strokeStyle: "#42a62c",
                    lineWidth: 2
                },
                ConnectionOverlays: [
                    ["Arrow", {
                        location: 1,
                        id: "arrow",
                        length: 14,
                        foldback: 0.8
                    }],
                    ["Label", {
                        label: "",
                        id: "label"
                    }]
                ]
            });   
    	},
    	setupPlumbingEvents: function() {

            var self = this;

            // bind a click listener to each connection; the connection is deleted. you could of course
            // just do this: jsPlumb.bind("click", jsPlumb.detach), but I wanted to make it clear what was
            // happening.
            jsPlumb.bind("click", function(c) {

                console.log(c.endpoints[0].elementId)

                // var from = c.endpoints[0].elementId;
                // var to = c.endpoints[1].elementId;

                // var panel = self.data.panels[from];

                // if (panel) {
                //     _.each(panel.options,function(item,idx){
                //         if (item.to && item.to == to) {
                //             panel.options.splice(idx,1);
                //         };
                //     });
                // };
                // self.bus.trigger('data:changed');
                // jsPlumb.detach(c);



            });

        

            // bind a connection listener. note that the parameter passed to this function contains more than
            // just the new connection - see the documentation for a full list of what is included in 'info'.
            // this listener changes the paint style to some random new color and also sets the connection's internal
            // id as the label overlay's text.
            jsPlumb.bind("connection", function(info) {
                var source = main.data.panels[info.sourceId];

                source.options.push({
                    to: info.targetId
                });

                info.connection.setPaintStyle({
                    strokeStyle: nextColour()
                });
                //info.connection.getOverlay("label").setLabel(info.connection.id);
            });
        }
    };
    

    return main;

});