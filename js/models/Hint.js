/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "Parse"
],
  function ($, Parse) {
    var Hint = Parse.Object.extend("Hint", {
      defaults: {
        ACL: "",
        number: 0,
        description: "",
        image: 0
      },

      fetchFromP: function () {
        self = this;
        this.fetch({
          success: function () {
            self.trigger('HintForm_VM_HINTSYNC');
          },
          error: function () {
          }
        });
      },

      updateGeoPoint: function (geoPoint) {
        self = this;
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
        self = this;
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
        self = this;
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

