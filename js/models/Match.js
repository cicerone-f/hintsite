/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "Parse",
  "models/UserSearched"
],
  function ($, Parse, UserSearched) {
    var Match = Parse.Object.extend("Match", {
      saveDraftToP: function () {
        var self = this;
        this.save({
          user: UserSearched.current(),
          ACL: new Parse.ACL(UserSearched.current())
        }, {
          success: function (result) {
            self.trigger('NuovaPartita_VM_MATCHCREATED');
          },
          error: function (e) {
            console.log("Error in saving a match draft (probably because of UserSearched.current())");
          }
        });
      },
      salvaNomePartita: function (vm,n) {
        var self = this;
        this.save({
          name: n
        }, {
          success: function (result) {
            self.trigger( vm+'_MATCHNAMEUPDATED');
          },
          error: function (e) {

          }
        });
      },
      launchPartita: function (vm) {
        var self = this;
        this.save({
          state: self.states.RUNNING
        }, {
          success: function (result) {
            self.trigger(vm+'_MATCHLAUNCHED');
          },
          error: function (e) {

          }
        });
      },
      fetchFromP: function (vm){
        var self = this;
        this.fetch({ 
          success: function() {
            self.trigger(vm+'_MATCHSYNC');
          },
          error: function () {
          }
        });
      },
      salvaTimePartita: function (t,vm) {
        var self = this;
        this.save({
          launchTime: t
        }, {
          success: function (result) {
            self.trigger(vm+'_MATCHTIMEUPDATED');
          },
          error: function (e) {

          }
        });
      }

    });

    return Match;

  });