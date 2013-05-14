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
    "text!templates/new-match.html",
    "views/sub/vsHeader"
],
    function (
        $,
        _,
        Backbone,
        Parse,
        Handlebars,
        Match,
        HintCollection,
        template,
        vsHeader
    ) {

        var vmNuovaPartita = Parse.View.extend({
                template: Handlebars.compile(template),
                model: new Match(),
                collection: new HintCollection(),
                initialize: function () {
                    this.model.bind("vmNuovaPartitaMATCHCREATED", this.a, this);
                    this.collection.bind("vmNuovaPartitaCOLLECTIONCOMPLETED", this.render, this);
                    this.model.saveDraftToP();
                },

                a : function(){
                    //console.log(this.model.id);
                    this.collection.createFourHints(this.model.id);
                },

                render: function (eventName) {

                    var header = new vsHeader();
                    var match = this.model.toJSON();
                    $(this.el).html( header.render({title:header.titles.vmNuovaPartita}).el ).append(this.template(match));
                    return this;
                }
            });

        return vmNuovaPartita;

    });