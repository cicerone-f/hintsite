/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "Parse",
  "models/WallMessage"
],
  function (
    $,
    Parse,
    WallMessage
  ) {
    var WallMessageCollection = Parse.Collection.extend({
      model: WallMessage,
      getFromParse: function (matchId) {
        var self = this;
        // retrieve match-related WallMessages
        var query = new Parse.Query(WallMessage);
        query.equalTo('matchId', matchId);
        query.descending("createdAt");
        // perform query
        query.find({
          success: function (results) {
            self.add(results);
          },
          error: function (error) {
            console.error("Error in getting a collection of WallMessage objects. Error is: " + error);
          }
        });
      },

      getFromParseHintRelated: function (matchId, hintNo) {
        var self = this;
        // retrieve match-related WallMessages
        var query = new Parse.Query(WallMessage);
        query.equalTo('matchId', matchId);
        query.equalTo('hintNumber', hintNo);
        query.descending("createdAt");
        // perform query
        query.find({
          success: function (results) {
            self.add(results);
          },
          error: function (error) {
            console.error("Error in getting a collection of WallMessage objects. Error is: " + error);
          }
        });
      }
    });

    return WallMessageCollection;
  });