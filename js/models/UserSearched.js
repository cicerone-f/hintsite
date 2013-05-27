/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "Parse"
],
  function ($, Parse) {
    var UserSearched = Parse.User.extend({
      getFromParse: function (nick) {
        var query = new Parse.Query(Parse.User);
        query.equalTo("username", nick);
        var self = this;
        query.find({
          success: function (results) {
            self.trigger("AddFromSearch_VM_USERFOUND");
            console.log(results);
          },
          error: function (error) {
            console.log(error);
          }
        });
      },
      getFromParseId: function () {
        var self = this;
        this.fetch({
          success: function (results) {
            self.trigger("PmsEdit_VSI_USERFOUND");

          },
          error: function (error) {
            console.log(error);
          }
        });
      }
    });

    return UserSearched;
  });
