
/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "collections/HintCollection",
  "collections/MatchCollection",
  "models/Hint",
  "models/Match",
  "views/main/HintFull_VM",
  "views/main/PartitaPlayer_VM",
  "views/main/NuovaPartita_VM",
  "views/sub/list/HintPreview_VSL",
  "views/main/ElencoPartite_VM",
  "views/sub/list/Match_VSL",
  "views/main/LogIn_VM",
  "views/main/SetLaunchTime_VM",
  "views/main/HintForm_VM",
  "views/main/SetHintPosition_VM"
],
    function ($,
      _,
      Backbone,
      Parse,
      HintCollection,
      MatchCollection,
      Hint,
      Match,
      HintFull_VM,
      PartitaPlayer_VM,
      NuovaPartita_VM,
      HintPreview_VSL,
      ElencoPartite_VM,
      Match_VSL,
      LogIn_VM,
      SetLaunchTime_VM,
      HintForm_VM,
      SetHintPosition_VM
    ) {

    var AppRouter = Parse.Router.extend({

      routes: {
        "": "userControl",
        "list": "list",  //non la chiama mai nessuno!!
        "mainMatchList": "mainMatchList",
        "matches/:id": "matchDetails",
        "hints/:id": "hintDetails",
        "newMatch": "newMatch",
        "editMatch/:id": "editMatchDraft",
        "setLaunchTime/:id": "setLTime",
        "hints/edit/:id": "hintForm",
        "sethintposition/:id": "setHintP",
        "back": "backToPrevious"
      },

      userControl: function () {
        if (Parse.User.current()) {
          this.mainMatchList();
        } else {
          this.log();
        }
      },

      list: function () {
        var page = new vslHintPreview({
        });
        this.changePage(page);
      },

      mainMatchList: function () {
        var page = new ElencoPartite_VM({
        });
        this.changePage(page);
      },

      log: function () {
        var page = new LogIn_VM({
        });
        this.changePage(page);
      },

      hintDetails: function (id) {
        var self = this;
        var query = new Parse.Query(Hint);
        var hint = query.get(id, {
          success: function (result) {
            self.changePage(new HintFull_VM({
              model: result
            }));
          },
          error: function (error) {
            console.log(error);
          }
        });
      },

      matchDetails: function (id) {
        var self = this;
        var query = new Parse.Query(Match);
        var match = query.get(id, {
          success: function (result) {
            self.changePage(new PartitaPlayer_VM({
              model: result
            }));
          },
          error: function (error) {
            console.log(error);
          }
        });
      },

      newMatch: function () {
        this.changePage(new NuovaPartita_VM());
      },

      editMatchDraft: function (id) {
        this.changePage(new NuovaPartita_VM(
          {'matchIdToGet': id})
        );
      },

      setLTime: function (id) {
        this.changePage(
          new SetLaunchTime_VM({'matchIdToGet':id})
        );
      },
      
      setHintP: function (id) {
        this.changePage(
          new SetHintPosition_VM({'hintIdToGet':id})
        );
      },

      hintForm: function (id) {
        this.changePage(
          new HintForm_VM({'hintIdToGet':id})
        );
      },

      changePage: function (page) {
        if(this.currentView) {
           this.currentView.removeElements();
           this.currentView.remove();
           console.log("destroyed view ");
         }
        this.currentView = page;
        page.render();
        $('body').append($(page.el));
      },

      backToPrevious: function () {
        if(this.currentView) {
          this.currentView.removeElements();
          this.currentView.remove();
          console.log("destroyed view back");
        }
        window.history.back();
        return false;  
      } 

    });

    return AppRouter;

  });