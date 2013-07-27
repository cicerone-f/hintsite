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
        query.notEqualTo("objectId", Parse.User.current().id);
        var self = this;
        query.find({
          success: function (results) {
            if (results.length > 0) {
              self.set(results[0].attributes);
              self.set({id: results[0].id});
            } else {
              console.log('no results');
            }
          },
          error: function (error) {
            console.log(error);
          }
        });
      },

      getMeFromParse: function () {
        var query = new Parse.Query(Parse.User);
        query.equalTo("objectId", Parse.User.current().id);
        var self = this;
        query.find({
          success: function (results) {
            if (results.length > 0) {
              self.set(results[0].attributes);
              self.set({id: results[0].id});
              self.trigger("USERPERPROFILO");
            } else {
              console.log('no results');
            }
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
      },

      updateImageUrl: function(fileURL) {
        var self = this;
        this.save({
          image: fileURL,
        }, {
          success: function (result) {
            self.trigger('Profilo_VM_IMAGEUPDATED')
          },
          error: function (e) {
          }
        });
      }
    });

    return UserSearched;
  });
