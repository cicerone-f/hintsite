/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "Parse"
],
  function ($, Parse) {
    var Pms = Parse.Object.extend("Pms", {
      userStates: {'MASTER': 0, 'LISTED': 1, 'INVITED': 2, 'INGAME': 3},
      matchStates: {'DRAFT': 0, 'RUNNING': 1, 'ENDED': 2},
      saveMaster: function (matchId) {
        var self = this;
        this.save({
          userId: Parse.User.current().id,
          matchId: matchId,
          userState: self.userStates.MASTER,
          matchState: self.matchStates.DRAFT,
          myHint: 4
        }, {
          success: function (result) {
            self.trigger('NuovaPartita_VM_PMSMASTERCREATED');
          },
          error: function (e) {

          }
        });
      },

      fetchFromP: function (){
        var self = this;
        this.fetch({ 
          success: function() {
            console.log(self);
          },
          error: function () {
          }
        });
      },
      savePms: function (userId, matchId) {
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
                userState: self.userStates.LISTED,
                matchState: self.matchStates.DRAFT,
                myHint: 1
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
      },
      plusPlusMyHint: function (userId, matchId) {
        var self = this;
        var query = new Parse.Query(Pms);
        query.equalTo("matchId", matchId);
        query.equalTo("userId", userId);
        query.find({
          success: function (results) {
              results[0].increment("myHint");
              results[0].save({
                success: function (result) {
                  self.trigger('hintPlusplussed');
                },
                error: function (e) {
                  console.log("non salva")
                }
        }

                );  
          },
          error: function (e) {
            console.log("error");
          }
        });
      }

    });
    return Pms;

  });
