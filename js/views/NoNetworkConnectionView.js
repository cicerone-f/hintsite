/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "handlebars",
  "text!templates/no-network-connection.html"
],
    function (
    $,
    _,
    Backbone,
    Handlebars,
    template
  ) {

    var LoadingView = Parse.View.extend({
      tagName: 'div',
      id: 'no-network-connection',

      template: Handlebars.compile(template),

      initialize: function () {
        console.warn("No network access.");
      },

      render: function (eventName) {
        $(this.el).html(this.template);
        $('body').append($(this.el));
        return this;
      }
    });

    return LoadingView;
  });