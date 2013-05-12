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
        
      },
      createFourHints: function (matchId) {
        console.log(matchId.id);
        for (var i = 1; i < 5; i++) {
          this.add(new Hint( { matchId:matchId , number:i , ACL:new Parse.ACL(Parse.User.current())} ));
        };
        this.model.saveAll(this.models,
          {
            success: function (){
              //this.trigger('collectionCompleted', this);
            },
            error: function(){
            }
          }
        );
      } 
    });

    return HintCollection;
  }
  );