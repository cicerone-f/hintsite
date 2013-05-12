/*jslint undef: true*/
/*global define*/

define([
    "jquery",
    "underscore",
    "backbone",
    "Parse",
    "handlebars",
    "models/Match",
    "collections/HintCollection",
    "text!templates/new-match.html"
],
    function (
        $,
        _,
        Backbone,
        Parse,
        Handlebars,
        Match,
        HintCollection,
        template
    ) {

        var vmNuovaPartita = Parse.View.extend({
                template: Handlebars.compile(template),
                model: new Match(),
                collection: new HintCollection(),
                initialize: function () {
                    this.bind("creata", this.a() , this);
                    //this.collection.bind("collectionCompleted", this.render(), this);
                    //this.model = this.model.saveDraftToP();
                },

                a : function(){
                    this.collection.createFourHints(this.model);
                },

                render: function (eventName) {
                    var match = this.model.toJSON();
                    $(this.el).html(this.template(match));
                    return this;
                }
            });

        return vmNuovaPartita;

    });