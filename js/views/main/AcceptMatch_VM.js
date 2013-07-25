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
  "text!templates/main/accept-match.html"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    Pms,
    WallMessage,
    template
  ) {
    var AddFromSearch_VM = Parse.View.extend({
        id: 'popup-container',
        template: Handlebars.compile(template),

        events: {
          "click #yes" : "matchAccepted", 
          "click #no" : "goBack"
        },

        initialize: function () {
          this.Pms = this.options.Pms;
          this.wallMsg = new WallMessage();
        },

        render: function (eventName) {
          $(this.el).html(this.template());
          return this;
        },


        matchAccepted: function (eventName) {
          var self = this;

          self.Pms.save({userState: self.Pms.userStates.INGAME}, {
            success: function () {
              self.remove();
            },
            error: function (error){
              console.log(error);
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
          var self = this;
          this.Pms.destroy({
            success: function () {
              Parse.history.navigate('back/'+self.options.owner+"/"+self.options.backViewModelId, { trigger : true, replace : true });
            },
            error: function (error){
              console.log(error);
            }
          });
        }

      });
    return AddFromSearch_VM;
  });