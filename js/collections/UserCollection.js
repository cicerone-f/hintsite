/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "Parse",
  "models/UserSearched"
],
  function (
    $,
    Parse,
    UserSearched
  ) {

    var UserCollection = Parse.Collection.extend({
      model: UserSearched,

      getFromParse: function () {
        var query = new Parse.Query(UserSearched);
        var self = this;
        query.find({
          success: function (results) {
            self.add(results);
            self.trigger("UTENTIDAPARSE");
          },
          error: function (error) {
            console.error(error);
          }
        });
      }
    });  

    return UserCollection;
  }
  );