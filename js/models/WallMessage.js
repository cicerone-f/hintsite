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
        matchID: "",
      }

      saveToP: function (msg) {
        this.save({
          message: msg
        }, {
          success: function (result) {
            console.log('Wall message saved to Parse.');
          }
          success: function (error) {
            console.error('Error in saving wall message to Parse.');
          }
        });
      },

    return WallMessage;

  });