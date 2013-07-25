/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/main/error.html"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    template
  ) {
    var Error_VM = Parse.View.extend({
        id: 'popup-container',
        className: 'errorContainer',
        template: Handlebars.compile(template),

        events: {
          "click #close" : "unrender", 
        },

        initialize: function () {
          this.errorMsg = this.options.errorMsg;

        },

        render: function (eventName) {
          $(this.el).html(this.template({errorMsg: this.errorMsg}));
          $('body').append($(this.el));
          return this;
        },


        unrender: function (eventName){
          this.remove();
        }

      });
    return Error_VM;
  });