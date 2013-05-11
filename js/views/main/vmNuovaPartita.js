/*jslint undef: true*/
/*global define*/

define([
    "jquery",
    "underscore",
    "backbone",
    "Parse",
    "handlebars",
    "models/Match",
    "text!templates/new-match.html"
],
    function (
        $,
        _,
        Backbone,
        Parse,
        Handlebars,
        Match,
        template
    ) {

        var vmNuovaPartita = Parse.View.extend({
                template: Handlebars.compile(template),
                model: new Match(),
                initialize: function () {
                    this.bind("change", this.render());
                    this.model.saveDraftToP();
                },

                render: function (eventName) {
                    var match = this.model.toJSON();
                    $(this.el).html(this.template(match));
                    return this;
                }
            });

        return vmNuovaPartita;

    });