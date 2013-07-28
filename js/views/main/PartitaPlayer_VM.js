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
  "views/sub/HintMap_VS",
  "views/main/Error_VM"
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
      HintMap_VS,
      Error_VM
    ) {

    var PartitaPlayer_VM = Parse.View.extend({
        tagName: "div",
        id: "container",
        className: "partita-player",

        initialize: function () {
          this.Pms = new Pms();
          var query = new Parse.Query(Pms);
          console.log("matchId "+this.model.id);
          query.equalTo("matchId", this.model.id);
          query.equalTo("userId", Parse.User.current().id);
          var self = this;
          query.find({
            success: function (results) {
              self.Pms = results[0];
              self.render();
            },
            error: function (error){
              var ErrorView = new Error_VM({errorMsg: error.message});
              ErrorView.render();
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
            .append(new AcceptMatch_VM({ model: this.model, Pms: this.Pms, owner: "PartitaPlayer_VM", backViewModelId:0
            }).render().el);
          }
          return this;
        }
      });

    return PartitaPlayer_VM;

  });