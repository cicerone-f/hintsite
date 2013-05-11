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
            self = result;
          },
          error: function (e) {

          }
        });
      }
    });

    return Match;

  });