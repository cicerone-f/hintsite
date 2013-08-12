/*jslint undef: true*/
/*global define*/

define([
  "jquery",
  "underscore",
  "backbone",
  "Parse",
  "handlebars",
  "text!templates/main/set-launch-time.html",
  "views/sub/Header_VS",
  "models/Match",
  "views/LoadingView"
],
  function (
    $,
    _,
    Backbone,
    Parse,
    Handlebars,
    template,
    Header_VS,
    Match,
    LoadingView
  ) {

    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var SetLaunchTime_VM = Parse.View.extend({
      id: 'container',
      template: Handlebars.compile(template),
      model: Match,
      initialize: function () {
        this.model = new Match();
        this.loading = new LoadingView();
        this.model.id = this.options.matchIdToGet;
        this.model.fetchFromP("SetLaunchTime_VM");
        this.model.on("SetLaunchTime_VM_MATCHSYNC", this.setFlag, this);
        this.model.on("SetLaunchTime_VM_MATCHTIMEUPDATED", this.backToPreviousView, this);
      },
      events: {
        "click #menoday": "menoday",
        "click #piuday": "piuday",
        "click #menotime": "menotime",
        "click #piutime": "piutime",
        "click #setthistime": "setthistime"

      },
      menoday: function () {
        if( (this.model.attributes.launchTime - (24 * 60 * 60 * 1000) ) > new Date().getTime()){
          this.model.attributes.launchTime -= 24 * 60 * 60 * 1000;
          this.renderVero();
        }
      },
      piuday: function () {
        this.model.attributes.launchTime += 24 * 60 * 60 * 1000;
        this.renderVero();
      },
      menotime: function () {
      if( (this.model.attributes.launchTime - ( 60 * 60 * 1000) ) > new Date().getTime()){        
        this.model.attributes.launchTime -= 60 * 60 * 1000;
        this.renderVero();
        }
      },
      piutime: function () {
        this.model.attributes.launchTime += 60 * 60 * 1000;
        this.renderVero();
      },
      setthistime: function () {
        $("#overlay-loading").fadeIn(); 
        this.model.salvaTimePartita(this.model.attributes.launchTime, "SetLaunchTime_VM");
      },
      setFlag: function () {
        if (!this.model.attributes.launchTime) {
          this.model.attributes.launchTime = new Date().getTime();
        }
        this.renderVero();
      },
      backToPreviousView: function () {
        Parse.history.navigate('back/SetLaunchTime_VM/'+this.model.id, { trigger : true, replace : true });
      },
      render: function (eventName) {
        var header = new Header_VS({owner: "SetLaunchTime_VM",backViewModelId:this.model.id});
        $(this.el).html(
          header.render().el);
        return this;
      },

      renderVero: function (eventName) {
        var header = new Header_VS({owner: "SetLaunchTime_VM",backViewModelId:this.model.id});
        var launchDate = new Date(this.model.attributes.launchTime);
        var numGiorno = launchDate.getDate();
        var numMese = launchDate.getMonth();
        var numAnno = launchDate.getFullYear();
        var hour = launchDate.getHours();
        var min = launchDate.getMinutes();
        var giornomeseanno = numGiorno + "/" + numMese + "/" + numAnno + " " + weekday[launchDate.getDay()];
        var oramin = hour + ":" + min;
        console.log(this.model.attributes.launchTime);
        $(this.el).html(
          header.render().el).append(this.template({day: giornomeseanno, time: oramin}));
        $("#overlay-loading").fadeOut();         
        return this;
      }
    });

    return SetLaunchTime_VM;

  });