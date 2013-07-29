/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/sub/item/PmsEdit_VSI",
  "collections/PmsCollection",
  "models/Pms",
  "text!templates/sub/list/pms-edit-TSL.html"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    PmsEdit_VSI,
    PmsCollection,
    Pms,
    template
  ) {

    var PmsEdit_VSL = Parse.View.extend({
      tagName: "ul",
      id: "list",
      className: "pmsListEdit",
      template: Handlebars.compile(template),
      render: function (eventName) {
        $(this.el).empty();
        _.each(this.collection.models, function (pms) {
          $(this.el).append(new PmsEdit_VSI({
            model: pms
          }).render().el);
        }, this);
        return this;
      }
    });

    return PmsEdit_VSL;

  });