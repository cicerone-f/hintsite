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
    var MatchCollection = Parse.Collection.extend({
      model: Match,
      getFromParse: function () {
        var query = new Parse.Query(Match);
        var self = this;
        query.find({
          success: function (results) {
            self.add(results);
          },
          error: function (error) {
            console.error(error);
          }
        });
      }
    });

    return MatchCollection;
  });