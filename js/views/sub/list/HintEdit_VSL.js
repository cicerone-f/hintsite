/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/sub/item/HintEdit_VSI",
  "collections/HintCollection",
  "models/Hint",
  "text!templates/sub/list/hint-edit-TSL.html"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    HintEdit_VSI,
    HintCollection,
    Hint,
    template
  ) {

    var HintEdit_VSL = Parse.View.extend({
      tagName: "ul",
      id: "list",
      template: Handlebars.compile(template),
      render: function (eventName) {
        $(this.el).empty();
        _.each(this.collection.models, function (hint) {
          $(this.el).append(new HintEdit_VSI({
            model: hint
          }).render().el);
        }, this);
        return this;
      }
    });

    return HintEdit_VSL;

  });