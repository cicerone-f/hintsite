/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "Parse",
],
  function ($, Parse) {
    var WallMessage = Parse.Object.extend("WallMessage", {
      
      messageTypes: {'HINT_FOUND': 0, 'MATCH_ACCEPTED': 1},

      defaults: {
        messageType: 0,
        matchId: "",
        userId: "",
        username: "",
        hintNumber: 0,
      },

      saveToP: function (msgType, match, hintNo) {
        // by default, use current user's ID        
        id = Parse.User.current().id;
        name = Parse.User.current().attributes.username;

        this.save({
          messageType: msgType,
          matchId: match,
          userId: id,
          username: name,
          hintNumber: hintNo
        }, {
          success: function (result) {
            console.log('Wall message saved to Parse. ');
          },
          error: function (error) {
            console.error('Error in saving wall message to Parse. Error is: ' + error);
          }
        });
      },
    });
    return WallMessage;

  });