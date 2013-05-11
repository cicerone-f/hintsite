/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "Parse",
  "models/Hint"
],
  function (
    $,
    Parse,
    Hint
  ) {

    var HintCollection = Parse.Collection.extend({
      model: Hint,
      getFromParse: function (matchId) {
        var query = new Parse.Query(Hint);
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
      },
      saveToParse: function () {
        
      } 
    });

    return HintCollection;
  }
  );