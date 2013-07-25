/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "Parse",
],
  function ($, Parse) {
    var WallMessage = Parse.Object.extend("WallMessage", {
      defaults: {
        message: "",
        matchId: "",
        userId: ""
      },

      saveToP: function (msg, match, user) {
        // by default, use current user's ID
        user = user || Parse.User.current().id;

        this.save({
          message: msg,
          matchId: match,
          userId: user,
        }, {
          success: function (result) {
            console.log('Wall message saved to Parse.');
          },
          error: function (error) {
            console.error('Error in saving wall message to Parse. Error is: ' + error);
          }
        });
      },
    });
    return WallMessage;

  });