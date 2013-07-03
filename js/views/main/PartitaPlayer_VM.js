/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "views/sub/list/HintPreview_VSL",
  "views/sub/Header_VS",
  "views/main/AcceptMatch_VM"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      HintPreview_VSL,
      Header_VS,
      AcceptMatch_VM
    ) {

    var PartitaPlayer_VM = Parse.View.extend({
        tagName: "div",
        id: "container",

        render: function (eventName) {
          var header = new Header_VS({owner: "PartitaPlayer_VM",backViewModelId:0});

          $(this.el)
            .html(header.render().el)
            .append(new HintPreview_VSL({
              model: this.model
            }).render().el);
          if (this.options.extra) {
            $(this.el)
            .append(new AcceptMatch_VM({ matchId: this.model.id, owner: "PartitaPlayer_VM", backViewModelId:0
            }).render().el);
          }
          return this;
        }
      });

    return PartitaPlayer_VM;

  });