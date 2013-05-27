/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "models/UserSearched",
  "text!templates/main/search-add-from-search.html"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    UserSearched,
    template
  ) {
    var AddFromSearch_VM = Parse.View.extend({
        id: 'popup_container',
        template: Handlebars.compile(template),
        model: UserSearched,
        initialize: function () {
          this.model = new UserSearched();
          this.model.on("AddFromSearch_VM_USERFOUND", this.render, this);
        },
        events: {
          "blur #nick": "searchNick",
        },

        searchNick: function () {
          this.model.getFromParse(this.$("#nick").val());
        },

        render: function (eventName) {
          var match = this.model.toJSON();
          $(this.el).html(this.template());
          return this;
        },

        unrenderAddFromSearch: function (eventName){
          this.remove();
        }

      });
    return AddFromSearch_VM;
  });