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
        query.ascending("number");
        var self = this;
        query.find({
          success: function (results) {
            if (self.length != 0){
              self.reset();
            }
            self.add(results);

          },
          error: function (error) {
            console.log(error);
          }
        });
      },
      saveToParse: function () {
        
      },
      createFourHints: function (matchId) {
        for (var i = 1; i < 5; i++) {
          this.add(new Hint( { matchId:matchId , number:i , ACL:new Parse.ACL(Parse.User.current())} ));
        };
        var self = this;
        this.model.saveAll(this.models,
          {
            success: function (){
              self.trigger('NuovaPartita_VM_COLLECTIONCOMPLETED', this);
            },
            error: function(error){
              console.log(error);
            }
          }
        );
      } 
    });

    return HintCollection;
  }
  );