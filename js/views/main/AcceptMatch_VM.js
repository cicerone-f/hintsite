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

        events: {
          "click #yes" : "unrenderAcceptMatch", 
          "click #no" : "goBack"
        },

        initialize: function () {
          this.Pms = this.options.Pms;

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