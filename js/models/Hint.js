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

      fetchFromP: function (){
        self = this;
        this.fetch({ 
          success: function() {
            self.trigger('HintForm_VM_HINTSYNC');
          },
          error: function () {
          }
        });
      }
    });

    return Hint;
  });

