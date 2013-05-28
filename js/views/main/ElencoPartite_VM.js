/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/sub/list/Match_VSL",
  "views/sub/NewMatch_VS",
  "views/sub/Header_VS",
  "collections/PmsCollection"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      Match_VSL,
      NewMatch_VS,
      Header_VS,
      PmsCollection
    ) {

    var ElencoPartite_VM = Parse.View.extend({
        tagName: "div",
        id: "container",
        collection: PmsCollection,
        initialize: function () {
          this.collection = new PmsCollection();
          this.collection.getAllUsersPms();
          this.collection.on("add", this.foo, this);
        },

        foo: function () {
          console.log(this.collection);
        },

        render: function (eventName) {
          $(this.el).empty();
          var viewContent = new NewMatch_VS().render().el;
          var header = new Header_VS({owner: "ElencoPartite_VM",backViewModelId:0});
          $(this.el).html(
            header.render().el).append(viewContent).append(new Match_VSL().render().el);
          return this;
        }
      });

    return ElencoPartite_VM;

  });