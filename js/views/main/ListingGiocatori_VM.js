/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "collections/UserCollection",
  "views/sub/item/Player_VSI",
  "text!templates/sub/list/players-TSL.html"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    UserCollection,
    Player_VSI,
    template
  ) {
    var ListingGiocatori_VM = Parse.View.extend({
        tagName: "ul",
        id: "list",
        collection: UserCollection,
        template: Handlebars.compile(template),
        initialize: function () {
          this.collection = new UserCollection();
          this.collection.bind("UTENTIDAPARSE", this.render, this);
          this.collection.getFromParse();
        },

        render: function (eventName) {
          $(this.el).append(this.template());
          _.each(this.collection.models, function (user) {
            $(this.el).append(new Player_VSI({
              model: user}).render().el);
          console.log(user);
          }, this);
          return this;
        }
      });
    return ListingGiocatori_VM;
  });