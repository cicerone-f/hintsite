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
          state: self.roles.MASTER
        }, {
          success: function (result) {
            self.trigger('NuovaPartita_VM_PMSMASTERCREATED');
          },
          error: function (e) {

          }
        });
      },
      savePms: function(userId,matchId) {
        var self = this;
        var query = new Parse.Query(Pms);
        query.equalTo("matchId", matchId);
        query.equalTo("userId", userId);
        query.find({
          success: function (results) {
            if (results.length === 0) {
              self.save({
                userId: userId,
                matchId: matchId,
                state: self.roles.LISTED
              }, {
                success: function (result) {
                  self.trigger('AddFromSearch_VM_PMSLISTED');
                },
                error: function (e) {

                }
              });
            } else {
              console.log('already added');
            }
          },
          error: function (error) {
            console.log(error);
          }
        });
        

      }

    });
    return Pms;

  });
