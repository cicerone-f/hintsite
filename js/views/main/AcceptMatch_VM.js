/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/main/accept-match.html"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    template
  ) {
    var AddFromSearch_VM = Parse.View.extend({
        id: 'popup-container',
        template: Handlebars.compile(template),
        initialize: function () {
        },
        events: {
          "click #yes": "unrenderAcceptMatch",
          "click #no": "goBack"
        },

        render: function (eventName) {
          $(this.el).html(this.template());
          return this;
        },


        unrenderAcceptMatch: function (eventName){
          this.remove();
        },

        goBack: function () {
          
        }

      });
    return AddFromSearch_VM;
  });