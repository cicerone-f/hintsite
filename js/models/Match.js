/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "Parse"
],
  function ($, Parse) {
    var Match = Parse.Object.extend("Match", {
      states: {'DRAFT': 0, 'RUNNING': 1, 'ENDED': 2},
      saveDraftToP: function () {
        var self = this;
        this.save({
          user: Parse.User.current(),
          ACL: new Parse.ACL(Parse.User.current()),
          state: self.states.DRAFT
        }, {
          success: function (result) {
            self.trigger('vmNuovaPartitaMATCHCREATED');
          },
          error: function (e) {

          }
        });
      },
      salvaNomePartita: function (n) {
        this.save({
          name: n,
        }, {
          success: function (result) {
          },
          error: function (e) {

          }
        });
      },
      launchPartita: function () {
        var self = this;
        this.save({
          state: self.states.RUNNING,
        }, {
          success: function (result) {
            self.trigger('vmNuovaPartitaMATCHLAUNCHED');
          },
          error: function (e) {

          }
        });
      }

    });

    return Match;

  });