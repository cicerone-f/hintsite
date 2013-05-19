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
  "views/sub/Header_VS"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      Match_VSL,
      NewMatch_VS,
      Header_VS
    ) {

    var ElencoPartite_VM = Parse.View.extend({
        tagName: "div",
        id: "container",
        initialize: function () {
        },
        render: function (eventName) {
          $(this.el).empty();
          var viewContent = new NewMatch_VS().render().el;
          var header = new Header_VS();
          $(this.el).html(
            header.render(
              {title: header.titles.ElencoPartite_VM}
            ).el).append(viewContent).append(new Match_VSL().render().el);
          return this;
        },
        removeElements: function() {
          
        }
      });

    return ElencoPartite_VM;

  });