/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/Pms",
  "models/WallMessage",
  "models/UserSearched",
  "views/sub/list/HintPreview_VSL",
  "text!templates/main/accept-match.html",
  "views/LoadingView",
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    Pms,
    WallMessage,
    UserSearched,
    HintPreview_VSL,
    template,
    LoadingView
  ) {
    var AcceptMatch_VM = Parse.View.extend({
        id: 'popup-container',
        template: Handlebars.compile(template),

        events: {
          "click #yes" : "matchAccepted", 
          "click #no" : "goBack"
        },

        initialize: function () {
          this.Pms = this.options.Pms;
          this.wallMsg = new WallMessage();
          this.loading = new LoadingView();
          this.loading.render();
        },

        render: function (eventName) {
          $(this.el).html(new HintPreview_VSL({
                Pms: this.Pms,
                model: this.model
              }).render().el
            )
          .append(this.template());
          return this;
        },


        matchAccepted: function (eventName) {
          $("#overlay-loading").fadeIn();
          var self = this;
          self.Pms.save({userState: self.Pms.userStates.INGAME}, {
            success: function () {
              //aggiungo i punti all'utente
              var user = new UserSearched();
              user.addPoints(100);
              $("#overlay-loading").fadeOut();
              self.remove();
            },
            error: function (error){
              $("#overlay-loading").fadeOut();
              console.error(error);
            }
          });

          var query = new Parse.Query(Parse.User);
          query.get(self.Pms.attributes.userId, {
            success: function (user) {
              self.wallMsg.saveToP(self.wallMsg.messageTypes.MATCH_ACCEPTED, self.Pms.attributes.matchId);
            },
            error: function (error) {
              console.error('Error while saving a WallMessage. Error is: ' + error);
            }
          });
        },

        goBack: function () {
          $("#overlay-loading").fadeIn();          
          var self = this;
          this.Pms.destroy({
            success: function () {
              $("#overlay-loading").fadeOut();
              Parse.history.navigate('back/'+self.options.owner+"/"+self.options.backViewModelId, { trigger : true, replace : true });
            },
            error: function (error){
              console.error(error);
              $("#overlay-loading").fadeOut();
            }
          });
        }

      });
    return AcceptMatch_VM;
  });