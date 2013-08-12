/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "Parse",
  "underscore",
  "models/Pms"
],
  function (
    $,
    Parse,
    _,
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
            if(results.length > 0){
              self.add(results);
            }else{
              self.trigger("noresultsinpmscollection");
            }
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

        console.log('launchPartita() called from inside PmsCollection.js');

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
                  self.trigger("pointscanbeadded",this);
                },
                error: function(error){
                  console.log(error);
                }
              }
            );

            console.log('About to call inviteUsersViaPush() from inside PmsCollection.js');
            self.inviteUsersViaPush(results);

          },
          error: function (error) {
            console.error("Error: " + error.message);
          }
        });


      },

      getAllUsersPms: function () {
        var query = new Parse.Query(Pms);
        query.equalTo("userId", Parse.User.current().id);
        query.notEqualTo("userState", 1 );
        var self = this;
        query.find({
          success: function (results) {
            self.add(results);
            self.trigger("addedallpmsforuser");
          },
          error: function (error) {
            console.log(error);
          }
        });
      },

      inviteUsersViaPush: function (pmss) {
        console.log('inviteUsersViaPush() called.');
        console.log('pmss: ' + pmss);

        // this.models is an array of PMSs with the current matchId
        // I only have to use those PMSs to retrieve the user IDs I'll need
        // in order to send Push Notifications
        //
        // First I filter the array in order to slice out the master
        // of the current match (which has a userState of 0), then I map
        // an anonymous function 
        var userIds = pmss.filter(function (pms) {
          return pms.attributes.userState !== 0;
        }).map(function (pms) {
          return pms.attributes.userId;
        });

        // var userIds = pmss.reduce(function (currPms, ids, index, arr) {
        //   var master = currPms.attributes.userState == 0;
        //   return master? ids : ids.concat(currPms);
        // })

        console.log('userIds retrieved: ' + userIds);

        var queryInstallations = new Parse.Query(Parse.Installation);
        queryInstallations.containedIn('userId', userIds);

        Parse.Push.send({
          where: queryInstallations,
          data: {
            title: "New Hintsite match!",
            alert: "You've been invited to a new match.3"
          },
        }, {
          success: function () { console.log("Push notification sent."); },
          error: function (error) { console.log("Error in sending push notification: " + error.message); }
        });

      }
    });

    return PmsCollection;
  });