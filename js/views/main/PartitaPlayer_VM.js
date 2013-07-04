/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/Pms",
  "views/sub/list/HintPreview_VSL",
  "views/sub/Header_VS",
  "views/main/AcceptMatch_VM",
  "views/sub/HintMap_VS"
],
    function ($,
      _,
      Backbone,
      Parse,
      Handlebars,
      Pms,
      HintPreview_VSL,
      Header_VS,
      AcceptMatch_VM,
      HintMap_VS
    ) {

    var PartitaPlayer_VM = Parse.View.extend({
        tagName: "div",
        id: "container",

        initialize: function () {
          this.Pms = new Pms();
          var query = new Parse.Query(Pms);
          query.equalTo("matchId", this.model.id);
          query.equalTo("userId", Parse.User.current().id);
          var self = this;
          query.find({
            success: function (results) {
              self.Pms = results[0];
              self.render();
            },
            error: function (error){
              console.log(error);
            }
          });
        },
        render: function (eventName) {
          var header = new Header_VS({owner: "PartitaPlayer_VM",backViewModelId:0});

          $(this.el)
            .html(header.render().el)
            .append(
              new HintPreview_VSL({
                Pms: this.Pms,
                model: this.model
              }).render().el)
            .append(new HintMap_VS({'matchId':this.model.id, 'pms':this.Pms}).render().el);

          if (this.options.extra) {
            $(this.el)
            .append(new AcceptMatch_VM({ Pms: this.Pms, owner: "PartitaPlayer_VM", backViewModelId:0
            }).render().el);
          }
          return this;
        }
      });

    return PartitaPlayer_VM;

  });