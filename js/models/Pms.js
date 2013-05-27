/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "Parse"
],
  function ($, Parse) {
    var Pms = Parse.Object.extend("Pms", {
      roles: {'MASTER': 0, 'LISTED': 1, 'INVITED': 2, 'INGAME': 3},
      saveMaster: function (matchId) {
        var self = this;
        this.save({
          userId: Parse.User.current().id,
          matchId: matchId,
          state: self.states.MASTER
        }, {
          success: function (result) {
            self.trigger('NUOVA_PARTITA_VM_PMSMASTERCREATED');
          },
          error: function (e) {

          }
        });
      }
    });
    return Pms;

  });
