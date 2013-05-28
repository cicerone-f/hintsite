/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "Parse",
  "models/Pms"
],
  function (
    $,
    Parse,
    Pms
  ) {
    var PmsCollection = Parse.Collection.extend({
      model: Pms,
      getFromParse: function (matchId) {
        var query = new Parse.Query(Pms);
        query.equalTo("matchId", matchId);
        var self = this;
        query.find({
          success: function (results) {
            self.add(results);
          },
          error: function (error) {
            console.log(error);
          }
        });
      }
    });

    return PmsCollection;
  });