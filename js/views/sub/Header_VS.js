/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/sub/header-TS.html"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      template
    ) {

    var Header_VS = Parse.View.extend({
        tagName: "div",
        id: "header",
        template: Handlebars.compile(template),
        ownerName: {
        "SetLaunchTime_VM": "Set Time",     
        "ElencoPartite_VM": "Match List",
        "NuovaPartita_VM": "New Match",
        "EditPartita_VM": "Edit Match",        
        "PartitaPlayer_VM": "Player's Match",
        "PartitaMaster_VM": "Master's Match",
        "Opzioni_VM": "Options",      
        "Profilo_VM":"Profile",  
        "HintForm_VM": "Match",           
        "SetHintPosition_VM": "Set Hint",   
        "HintFull_VM": "Hint",             
        "SelezioneGiocatori_VM": "Select Players", 
        "WallFull_VM": "Wall" 
        },
        events: {
          "click #back": "goBack"
        },
        goBack: function () {
          $("#overlay-loading").fadeIn();
          Parse.history.navigate('back/'+this.options.owner+"/"+this.options.backViewModelId, { trigger : true, replace : true });
        },
        initialize: function () {
        },
        render: function () {
          var t = this.ownerName[this.options.owner];
          $(this.el).empty();
          $(this.el).html(
            this.template({
              title:t
              }
            )
          );
          return this;
        }
      });

    return Header_VS;

  });