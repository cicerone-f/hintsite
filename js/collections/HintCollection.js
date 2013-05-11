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
        getFromParse: function () {
        var query = new Parse.Query(Hint);
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

    return HintCollection;
  }
  );