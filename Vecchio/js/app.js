document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	Parse.initialize( 'LkaGTOk7RGUaPXM0r9HQImwPAnmqUuhjF1QttcNE' , 'uxXxR7sEt2unuSABRyjF8tnd52bNymwlDuchsIhh' );
	document.addEventListener("pause", onPause, false);
	document.addEventListener("resume", onResume, false);

  //Partita Object
  var OPartita = Parse.Object.extend("Partita", {
    initialize: function() {

    }
  });

  //Hint Object
  var OHint = Parse.Object.extend("Hint", {
    initialize: function() {

    }
  });

  //Partite Collection
  var CPartite = Parse.Collection.extend({
    model: OPartita,
    filter: function(){
    }
  });

  //Error View 
  //Use it in popup
  var VError = Parse.View.extend({
    tagName: "div",
    className: "error",
    model: Parse.Error,
    initialize: function() {
      this.render();
    },
    render: function() {
      var sourceError = $('#error_template').html();
      var templateError = Handlebars.compile(sourceError);
      console.log(this.model);
      var html = templateError(this.model);
      $('body').append(this.$el.html(html));
      return this;
    },
    close: function() {
      this.remove();
    },
    events: {
      "click #closeError": "close"
    }
  });







  // Crea Hint View
  var VCreaHint = Parse.View.extend({
    el: $('#container'),
    model: OHint,
    initialize: function() {
      this.render();
    },
    render: function() {
      var sourceCreaHint = $('#crea_hint_template').html();
      var templateCreaHint = Handlebars.compile(sourceCreaHint);
      var html = templateCreaHint(this.model.toJSON());
      this.$el.html(html);
      return this;
    }
  });










var collectionHint = Parse.Collection.extend({
  model: OHint
});


  // Crea Partita View
  var VCreaPartita = Parse.View.extend({
    el: $('#container'),
    model: new OPartita(),
    initialize: function() {
      var self = this;
      this.collection = new collectionHint();
      this.collection.bind('add' , this.appendHint);
      this.model.save({user: Parse.User.current(), ACL: new Parse.ACL(Parse.User.current()), born: 0}, {
        success: function(object) {

          for (var i = 1; i < 5; i++ ){
            var currentHint = new OHint({
              idPartita: self.model.id,
              hintNumber: i,
              user: Parse.User.current(),
              ACL: new Parse.ACL(Parse.User.current())
            });
            self.collection.add(currentHint);
          }  
          OHint.saveAll(self.collection.toJSON(), {
              success: function(collectionHint) {
              },
              error: function(m, e) {
                console.log(e);
              }

          });     
        },
        error: function(error) {
          new VError({model: error});
        }
      });
      this.render();
    },
    appendHint: function(h){
               console.log("appeso");
    },
    render: function() {
      var sourceCreaPartita = $('#crea_partita_template').html();
      var templateCreaPartita = Handlebars.compile(sourceCreaPartita);
      var modelJSON = this.model.toJSON();
      modelJSON.hints = this.collection;
      console.log(modelJSON);
      var html = templateCreaPartita(modelJSON);
      this.$el.html(html);
      return this;
    },
    hasHint: function() {

    },
    salvaNomePartita: function() {
      var temp_nome = $('#nome_partita').val();
      this.model.set({nome: temp_nome});
      this.model.save(null, {
        success: function(ob) {
          console.log(ob);
        },
        error: function(error) {
          new VError({model: error});
        }
      });
    },
    launchPartita: function() {
      this.model.set({born: 1});
      this.model.save(null, {
        success: function(ob) {
          console.log(ob);
        },
        error: function(error) {
          new VError({model: error});
        }
      });
    },
    events: {
      "click .lista_hint li": "hasHint",
      "blur #nome_partita": "salvaNomePartita",
      "click #launchPartita": "launchPartita"
    }
  });









  // Partita View
  var VPartitaPlayer = Parse.View.extend({
    el: $('#container'),
    initialize: function() {
      var self = this;
      var query = new Parse.Query(OPartita);
      query.get(self.model.id, {
        success: function(results) {
          self.model = results;
          var queryHint = new Parse.Query(OHint);
          queryHint.equalTo("idPartita", self.model.id);
          queryHint.find({
            success: function(results){
              self.collection = [];
              for(var i = 0; i < results.length; i++) {
                self.collection.push(results[i].toJSON());
              }
              self.render();
            }
          });
        },
        error: function(error) {
          new VError({model: error});
        }
      });
    },

    render: function() {
      var sourcePartitaPlayer = $('#partita_player_template').html();
      var templatePartitaPlayer = Handlebars.compile(sourcePartitaPlayer);
      var modelJSON = this.model.toJSON();
      modelJSON.hints = this.collection;
      var html = templatePartitaPlayer(modelJSON);
      this.$el.html(html);
      return this;
    },

    indietro: function() {
      var self = this;
      new VListaPartite();
      self.undelegateEvents();
      delete self;
      return false;
    },
    events: {
      "click #back": "indietro"
    }
  });








  // Lista partite View
  var VListaPartite = Parse.View.extend({
    el: $("#container"),
    initialize: function() {
      var self = this;
      // Initialize Parse.Query on Object OPartita
      var query = new Parse.Query(OPartita);
      // Order results by last update (descending)
      query.descending('updatedAt');
      query.find({
        success: function(results) {
          // Initialize empty arrays of results linked to current View
          self.collectionMaster = [];
          self.collectionPlayer = [];
          // On success Callback iterates through results and transforms every object to JSON (for Handlebars)
          for(var i = 0; i < results.length; i++) {
            results[i] = results[i].toJSON();
            console.log(Parse.User.current());
            //Splits results into "Master Match" and "Player Match"
            //TODO: split results into "Storico", "In Sospeso", "Pubbliche", "In corso" using *born* value
            if (results[i].user.objectId == Parse.User.current().id) {
              self.collectionMaster.push(results[i]);
            } else {
              self.collectionPlayer.push(results[i]);
            }
          }
          // Renders current View on Query success
          self.render();
        },
        error: function(error) {
          new VError({model: error});
        }
      });
    },
    render: function() {
      var sourceLogout = $('#logout_template').html();
      var sourceListaPartite = $('#lista_partite_template').html();
      var templateLogout = Handlebars.compile(sourceLogout);
      var templateListaPartite = Handlebars.compile(sourceListaPartite);
      // Renders #logout_template and #lista_partite_template
      // #lista_partite_template displays two lists of match iterating through "partiteMaster" and "partitePlayer"
      var html = templateLogout()+templateListaPartite({partiteMaster: this.collectionMaster, partitePlayer: this.collectionPlayer});
      this.$el.html(html);
      return this;
    },

    // Logs out the user and shows the first App View 
    logout: function(e) {
      var self = this;
      Parse.User.logOut();
      new AppView();
      self.undelegateEvents();
      delete self;
      this.$(".Slogout button").attr("disabled", "disabled");
      return false;
    },
    zoomPartita: function(event) {
      var idFromEvent = event.currentTarget.attributes["data-idpartita"].nodeValue;
      var self = this;
      var tempModel = new OPartita({objectId: idFromEvent});
      new VPartitaPlayer({model: tempModel});
      self.undelegateEvents();
      delete self;
      return false;
    },
    creaPartita: function() {
      var self = this;
      new VCreaPartita();
      self.undelegateEvents();
      return false;
    },
    events: {
      "submit form.Slogout": "logout",
      "click #Bcreapartita": "creaPartita",
      "click li.partita_in_list": "zoomPartita"
    }
  });








  // The login view for the app
  var VLogSign = Parse.View.extend({
    el: $("#container"),
    initialize: function() {
      this.render();
    },
    events: {
      "submit form.Slogin": "login",
      "submit form.Ssignup": "signup"
    },

    render: function() {
      var sourceLogin = $('#login_template').html();
      var sourceSignup = $('#signup_template').html();
      var templateLogin = Handlebars.compile(sourceLogin);
      var templateSignup = Handlebars.compile(sourceSignup);
      var html = templateLogin()+templateSignup();
      this.$el.html(html);
      return this;
    },

    signup: function(){
      var self = this;
      var username = this.$("#signup-username").val();
      var password = this.$("#signup-password").val();
      Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
        success: function(user) {
          new VListaPartite();
          self.undelegateEvents();
          delete self;
        },

        error: function(user, error) {
          new VError({model: error});
          this.$(".Ssignup button").removeAttr("disabled");
        }
      });
      this.$(".Ssignup button").attr("disabled", "disabled");
      return false;
    },

    login: function(){
      var self = this;
      var username = this.$("#login-username").val();
      var password = this.$("#login-password").val();
      Parse.User.logIn(username, password, {
        success: function(user) {
          new VListaPartite();
          self.undelegateEvents();
          delete self;
        },
        error: function(user, error) {
          new VError({model: error});
          this.$(".Slogin button").removeAttr("disabled");
        }
      });
      this.$(".login-form button").attr("disabled", "disabled");
      return false;
    }
  });










  // The main view for the app
  var AppView = Parse.View.extend({
    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#container"),

    initialize: function() {
      this.render();
    },

    render: function() {
      if (Parse.User.current()) {
        new VListaPartite();
      } else {
        new VLogSign();
      }
    }
  });

  var App = new AppView();


/*		var Hint = Parse.Object.extend("Hint");
      var hint = new Hint();
      hint.save({titolo: "bls bls", description: "Il diavolo aquilano con la tazza in mano"}, {
      success: function(object) {
        $("#response").html('salvato');
      },
      error: function(model, error) {
        $("#response").html(error);
      }
    });
*/
}

//What to do when paused
function onPause() {
	alert("paused!");
}

//What to do when resumed
function onResume()	{
	alert("resume");
}

