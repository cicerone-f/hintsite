/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/sub/list/vslMatch",
  "views/sub/vsNewMatch",
  "views/sub/vsHeader"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      vslMatch,
      vsNewMatch,
      vsHeader
    ) {

    var vmElencoPartite = Parse.View.extend({
        tagName: "div",
        id: "container",
        initialize: function () {
        },
        render: function (eventName) {
          $(this.el).empty();
          var viewContent = new vsNewMatch().render().el;
          var v = new vsHeader().render({title:"Elenco Partite"}).el;
          $(this.el).html(v).append(viewContent).append(new vslMatch().render().el);
          return this;
        }
      });

    return vmElencoPartite;

  });