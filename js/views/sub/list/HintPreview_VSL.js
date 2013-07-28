/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "hammer",
  "views/sub/item/HintPreview_VSI",
  "collections/HintCollection",
  "models/Hint",
  "text!templates/sub/list/hint-preview-TSL.html"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    Hammer,
    HintPreview_VSI,
    HintCollection,
    Hint,
    template
  ) {

    var HintPreview_VSL = Parse.View.extend({
      tagName: "div",
      id: "container-hint-in-partita",
      template: Handlebars.compile(template),
      events: {
        "click #controller-slide-hint": "drag",
        //"touchend": "endDrag",
        //"touchmove": "duringDrag" 
      },

      initialize: function () {
        this.countHints = 0;
        this.opened = 1;
        this.dragFlag = 0;
        this.currentHeight = 0;
        this.Pms = this.options.Pms;
        this.currentViewHint = this.Pms.attributes.myHint -1;
        this.collection = new HintCollection();
        this.collection.bind("add", this.render, this);
        this.collection.getFromParse(this.model.id, this.Pms.attributes.myHint);
      },

      drag: function () {
        if (this.opened == 1) {
          this.closeDrag();
        } else {
          this.openDrag();
        }
      },

      openDrag: function () {
        $(this.el).css({'height': '30%'});
        this.opened = 1;
      },

      closeDrag: function () {
        $(this.el).css({'height': '20px'});
        this.opened = 0;
      },

      moveHints: function () {
        var tempPerc = -(this.currentViewHint*100);
        $('.partita-player ul').css({'margin-left': tempPerc+'%'});
      },

      render: function (eventName) {
        $(this.el).html(this.template());
        var temp;
        _.each(this.collection.models, function (hint) {
          $(this.el).find('#list').append(new HintPreview_VSI({
            model: hint
          }).render().el);
        }, this);
        this.countHints = $(this.el).find('#list li').length;
        this.moveHints();
        var self = this;
        var swiperight = Hammer($(this.el)).on("swiperight", function(event) {
          console.log(self.currentViewHint);
          console.log(self.countHints);
          if(self.currentViewHint < self.countHints - 1) {
            self.currentViewHint++;
            self.moveHints();
          }
        });
        var swipeleft = Hammer($(this.el)).on("click", function(event) {
          if(self.currentViewHint > 0) {
            self.currentViewHint--;
            self.moveHints();
          }
        });
        return this;
      }
    });

    return HintPreview_VSL;

  });