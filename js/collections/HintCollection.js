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
      getFromParse: function (matchId, myHint) {
        var query = new Parse.Query(Hint);
        query.equalTo("matchId", matchId);
        query.ascending("number");
        query.lessThanOrEqualTo("number", myHint);
        var self = this;
        query.find({
          success: function (results) {
            if (self.length !== 0){
              self.reset();
            }
            self.add(results);
            self.trigger("OKHINTSITE");
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
          this.add(new Hint( { matchId:matchId , number:i } ));
        }

        var self = this;
        this.model.saveAll(this.models,
          {
            success: function () {
              self.trigger('NuovaPartita_VM_COLLECTIONCOMPLETED', this);
            },
            error: function(error){
              console.log(error);
            }
          }
        );
      },
      isLaunchable: function (){
        var launchable = true;
        _.each(this.models, function (myHint) {
          if (!(myHint.attributes.point && ($.trim(myHint.attributes.description) !== ''))){
            launchable = false;
          }
        } );
        return launchable;
      },
      isInRange : function (){
        var rangeOk = true;
        var self = this;
        _.each(self.models, function (myHint1){
          _.each(self.models, function (myHint2){
            if (myHint1.attributes.point.kilometersTo(myHint2.attributes.point) > 5){
              rangeOk = false;
            }
          });
        } );
        return rangeOk;
      } 
    });

    return HintCollection;
  }
  );