/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/Pms",
  "text!templates/main/accept-match.html"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    Pms,
    template
  ) {
    var AddFromSearch_VM = Parse.View.extend({
        id: 'popup-container',
        template: Handlebars.compile(template),
        initialize: function () {
          this.on("addCliccability", this.enableClick, this);
          this.Pms = new Pms();
          var query = new Parse.Query(Pms);
          query.equalTo("matchId", this.options.matchId);
          query.equalTo("userId", Parse.User.current().id);
          var self = this;
          query.find({
            success: function (results) {
              self.Pms = results[0];
              self.trigger("addCliccability");
            },
            error: function (error){
              console.log(error);
            }
          })

        },

        enableClick: function () {
          this.events = {"click #yes" : "unrenderAcceptMatch" , "click #no" : "goBack"};
          this.delegateEvents();
        },

        render: function (eventName) {
          $(this.el).html(this.template());
          return this;
        },


        unrenderAcceptMatch: function (eventName){
          var self = this;
          this.Pms.save({userState: this.Pms.userStates.INGAME},{
            success: function () {
              self.remove();
            },
            error: function (error){
              console.log(error);
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