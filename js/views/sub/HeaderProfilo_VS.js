/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  'BackStack',  
  "text!templates/sub/header-profilo-TS.html",
  "views/main/Opzioni_VM",
  "views/main/Profilo_VM"    
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      BackStack,      
      template,
      Opzioni_VM,
      Profilo_VM
    ) {

    var HeaderProfilo_VS = Parse.View.extend({
        tagName: "div",
        id: "header",
        className: 'header-profilo',
        template: Handlebars.compile(template),
        events: {
          "click #profilo": "goToProfilo",
          "click #opzioni": "goToOpzioni"
        },

        goToProfilo : function () {
          var page = new Profilo_VM({});          
          stacknavigator.pushView(page);          
        },

        goToOpzioni : function () {
          var page = new Opzioni_VM({});
          stacknavigator.pushView(page);             
        },

        initialize: function () {
        },
        
        render: function () {
          $(this.el).html(
            this.template()
          );
          return this;
        }
      });

    return HeaderProfilo_VS;

  });