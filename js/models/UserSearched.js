/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "Parse"
],
  function ($, Parse) {
    var UserSearched = Parse.Object.extend("UserSearched", {
      getFromParse: function (nick) {
        var query = new Parse.Query(Parse.User);
        query.equalTo("username", nick);
        var self = this;
        query.find({
          success: function (results) {
            self.set(results[0].attributes);
            self.set({id:results[0].id});
          },
          error: function (error) {
            console.log(error);
          }
        });
      }
    });

    return UserSearched;
  });
