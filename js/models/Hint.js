/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "Parse"
],
  function ($, Parse) {
    var Hint = Parse.Object.extend("Hint", {
      defaults: {
        number: 0,
        description: "",
        image: ""
      },

      getWithNumberAndMatch: function (number, matchId) {
        var self = this;
        var query = new Parse.Query(Hint);
        query.equalTo("matchId", matchId);
        query.equalTo("number", number);
        query.find({
          success: function (results) {
            self.id = results[0].id;
            self.attributes = results[0].attributes;
            self.trigger('HintMap_VS_HINTFORPLACE');
          },
          error: function (error) {
            console.log(error);
          }
        });
      },

      fetchFromP: function () {
        var self = this;
        this.fetch({
          success: function () {
            self.trigger('HintForm_VM_HINTSYNC');
          },
          error: function () {
            console.log("no id??");
          }
        });
      },
      
      updateGeoPoint: function (geoPoint) {
        var self = this;
        this.save({
          point: geoPoint,
        }, {
          success: function (result) {
            self.trigger('SetHintPosition_VM_POINTUPDATED')
          },
          error: function (e) {
          }
        });
      },

      updateDescription: function(description) {
        var self = this;
        this.save({
          description: description,
        }, {
          success: function (result) {
            self.trigger('HintForm_VM_DESCUPDATED')
          },
          error: function (e) {
          }
        });
      },

      updateImageUrl: function(fileURL) {
        var self = this;
        this.save({
          image: fileURL,
        }, {
          success: function (result) {
            self.trigger('HintForm_VM_IMAGEUPDATED')
          },
          error: function (e) {
          }
        });
      }
    });

    return Hint;
  });

