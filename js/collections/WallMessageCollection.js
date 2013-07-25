/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "Parse",
  "models/Match"
],
  function (
    $,
    Parse,
    Match
  ) {
    var WallMessageCollection = Parse.Collection.extend({
      model: WallMessage,
      getFromParse: function (matchID) {
        var self = this;

        // retrieve match-related WallMessages
        var query = new Parse.Query(WallMessage);
        query.equalTo('matchID', matchID)
        
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