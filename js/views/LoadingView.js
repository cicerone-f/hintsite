/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/loading.html"
],
    function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    template
  ) {

    var LoadingView = Parse.View.extend({

        template: Handlebars.compile(template),
        initialize: function () {
          this.render();
        },
        render: function (eventName) {
          $(this.el).html(this.template);
          $('body').append($(this.el));
          return this;
        }
      });

    return LoadingView;

  });