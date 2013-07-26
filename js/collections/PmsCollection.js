/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "Parse",
  "models/Pms"
],
  function (
    $,
    Parse,
    Pms
  ) {
    var PmsCollection = Parse.Collection.extend({
      model: Pms,
      getFromParse: function (matchId) {
        var query = new Parse.Query(Pms);
        query.equalTo("matchId", matchId);
        query.equalTo("userState", 1);
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

      getFromParseForMaster: function (matchId) {
        var query = new Parse.Query(Pms);
        query.equalTo("matchId", matchId);
        query.greaterThan("userState", 1);
        var self = this;
        query.find({
          success: function (results) {
            self.add(results);
            self.trigger("PMSDAPARSE");//???
          },
          error: function (error) {
            console.log(error);
          }
        });
      },

      getFromParseValidate: function (matchId) {
        var query = new Parse.Query(Pms);
        query.equalTo("matchId", matchId);
        var self = this;
        query.find({
          success: function (results) {
            self.add(results);
            self.trigger("PMSPLAYERSFETCHED");
          },
          error: function (error) {
            console.log(error);
          }
        });
      },

      launchPartita: function (vm, matchId) {
        var query = new Parse.Query(Pms);
        query.equalTo("matchId", matchId);
        this.reset();
        var self = this;
        query.find({
          success: function (results) {
            for (var i = 0; i < results.length; i++) {
              results[i].set('matchState', 1);
              if(results[i].attributes.userState == 1) {
                results[i].set('userState', 2);
              }
            }
            self.add(results);
            self.model.saveAll(self.models,
              {
                success: function (){
                  self.trigger(vm+'_MATCHLAUNCHED', this);
                },
                error: function(error){
                  console.log(error);
                }
              }
            );
          },
          error: function (error) {
            console.log(error);
          }
        });
      },

      getAllUsersPms: function (){
        var query = new Parse.Query(Pms);
        query.equalTo("userId", Parse.User.current().id);
        query.notEqualTo("userState", 1 );
        var self = this;
        query.find({
          success: function (results) {
            self.add(results);
          },
          error: function (error) {
            console.log(error);
          }
        });
      }
    });

    return PmsCollection;
  });