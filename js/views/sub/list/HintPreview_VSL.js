/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/sub/item/HintPreview_VSI",
  "collections/HintCollection",
  "models/Hint",
  "text!templates/sub/list/hint-preview-TSL.html"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    HintPreview_VSI,
    HintCollection,
    Hint,
    template
  ) {

    var HintPreview_VSL = Parse.View.extend({
      tagName: "ul",
      id: "list",
      template: Handlebars.compile(template),
      initialize: function () {
        this.Pms = this.options.Pms;
        console.log(this.Pms);
        this.collection = new HintCollection();
        this.collection.bind("add", this.render, this);
        this.collection.getFromParse(this.model.id, this.Pms.attributes.myHint);
      },

      render: function (eventName) {
        $(this.el).empty();
        _.each(this.collection.models, function (hint) {
          $(this.el).append(new HintPreview_VSI({
            model: hint
          }).render().el);
        }, this);
        return this;
      }
    });

    return HintPreview_VSL;

  });