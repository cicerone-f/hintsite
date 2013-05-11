/*jslint undef: true*/
/*global define*/

define([
    "jquery",
    "underscore",
    "backbone",
    "Parse",
    "handlebars",
    "views/HintListItemView",
    "collections/HintCollection",
    "models/Hint",
    "text!templates/hint-list.html"
],
    function (
        $,
        _,
        Backbone,
        Parse,
        Handlebars,
        HintListItemView,
        HintCollection,
        Hint,
        template
    ) {

        var HintListView = Parse.View.extend({
                tagName: "ul",
                id: "list",
                template: Handlebars.compile(template),
                initialize: function () {
                    this.collection = new HintCollection();
                    this.collection.bind("add", this.render, this);
                    this.collection.getFromParse();
                },

                render: function (eventName) {
                    $(this.el).empty();
                    _.each(this.collection.models, function (hint) {
                        $(this.el).append(new HintListItemView({
                            model: hint
                        }).render().el);
                    }, this);
                    return this;
                }
            });

        return HintListView;

    });