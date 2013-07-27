/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/Hint",
  "text!templates/main/profilo.html",
  "views/sub/Header_VS",
  "models/UserSearched"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    Hint,
    template,
    Header_VS,
    UserSearched
  ) {
    var Profilo_VM = Parse.View.extend({
      id: 'container',
        
      template: Handlebars.compile(template),
      
      model: UserSearched,
      
      initialize: function () {
        this.model = new UserSearched();
        this.model.getMeFromParse();
        this.model.bind("USERPERPROFILO",this.render, this);
      },

//        events: {
//          "click #log-out": "logOut"
//        },

        render: function (eventName) {
          var header = new Header_VS({owner: "Profilo_VM", backViewModelId:0 });
          $(this.el)
            .html(header.render().el)
            .append(this.template({name:this.model.attributes.username, pt:this.model.attributes.points}));
          return this;
        }

      });
    return Profilo_VM;
  });