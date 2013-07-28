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
        //"touchstart #controller-slide-hint": "startDrag",
        //"touchend": "endDrag",
        //"touchmove": "duringDrag" 
      },

      initialize: function () {
        this.countHints = 0;

        this.dragFlag = 0;
        this.currentHeight = 0;
        this.Pms = this.options.Pms;
        this.currentViewHint = this.Pms.attributes.myHint - 1;
        this.collection = new HintCollection();
        this.collection.bind("add", this.render, this);
        this.collection.getFromParse(this.model.id, this.Pms.attributes.myHint);
      },

      startDrag: function () {
        this.dragFlag = 1;
      },

      endDrag: function () {
        this.dragFlag = 0;
        if (this.currentHeight < 25) {
          $(this.el).css({'height': '20px'});
        } else {
          $(this.el).css({'height': '30%'});
        }
      },

      duringDrag: function (e) {
        if(this.dragFlag) {
          this.currentHeight = parseInt(((e.originalEvent.pageY-20) * 100) / $(window).height());
          if (this.currentHeight > 80) {
            this.currentHeight = 80;
          }
          if (this.currentHeight < 3) {
            this.currentHeight = 3;
          }
          $(this.el).css({'height': this.currentHeight+'%'});
        }
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
        $('#controller-slide-hint').on('touchstart',$.proxy(this.startDrag,this));
        $(document).on('touchend',$.proxy(this.endDrag,this));
        $(document).on('touchmove',$.proxy(this.duringDrag,this));
        //$('#controller-slide-hint').on('touchstart', this.startDrag, this);
        var swiperight = Hammer($(this.el)).on("click", function(event) {
          if(this.currentViewHint < this.countHints) {
            this.currentViewHint++;
            this.moveHints();
          }
        });
        var swipeleft = Hammer($(this.el)).on("swipeleft", function(event) {
          if(this.currentViewHint > 0) {
            this.currentViewHint--;
            this.moveHints();
          }
        });
        return this;
      }
    });

    return HintPreview_VSL;

  });