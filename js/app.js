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

  //Partite Collection
  var CPartite = Parse.Collection.extend({
    model: OPartita,
    filter: function(){
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
          self.render();
        },
  
        error: function(error) {
          // error is an instance of Parse.Error.
        }
      });
    },

    render: function() {
      var sourcePartitaPlayer = $('#partita_player_template').html();
      var templatePartitaPlayer = Handlebars.compile(sourcePartitaPlayer);
      var html = templatePartitaPlayer(this.model.toJSON());
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
      query.find({
        success: function(results) {
          // Initialize empty array of results linked to current View
          self.collection = [];
          // On success Callback iterates through results and transforms every object to JSON (for Handlebars)
          for(var i = 0; i < results.length; i++) {
            self.collection.push(results[i].toJSON());
          }
          // Renders current View on Query success
          self.render();
        },
        error: function(error) {
          // error is an instance of Parse.Error.
        }
      });
    },

 	  render: function() {
		  var sourceLogout = $('#logout_template').html();
      var sourceListaPartite = $('#lista_partite_template').html();
      var templateLogout = Handlebars.compile(sourceLogout);
      var templateListaPartite = Handlebars.compile(sourceListaPartite);
      // Renders #logout_template and #lista_partite_template
      // #lista_partite_template displays a list of match iterating through "partite"
      var html = templateLogout()+templateListaPartite({partite: this.collection});
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
    events: {       
      "submit form.Slogout": "logout",
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
          self.$(".Ssignup .error").html(error.message).show();
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
          self.$(".Slogin .error").html("Invalid username or password. Please try again.").show();
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

  var App = new AppView;
	
	


		
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

