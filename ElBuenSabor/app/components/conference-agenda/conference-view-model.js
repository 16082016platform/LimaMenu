var observable = require("data/observable");
function formatTime(time) {
    var hour = time.getHours();
    var min = time.getMinutes() + "";
    return (hour <= 12 ? hour : hour - 12) + ":" + (min.length === 1 ? '0' + min : min) + (hour < 12 ? " AM" : " PM");
}
var Session = (function (_super) {
    __extends(Session, _super);
    function Session(title, start, end, room, isFavourite, cssClass) {
        _super.call(this);
        this.title = title;
        this.start = start;
        this.end = end;
        this.room = room;
        this.isFavourite = isFavourite;
        this.cssClass = cssClass;
        this.cssClass = "session-favorite";
    }
    Object.defineProperty(Session.prototype, "range", {
        get: function () {
            return formatTime(this.start) + " - " + formatTime(this.end);
        },
        enumerable: true,
        configurable: true
    });
    Session.prototype.toggleFavourite = function () {
        var _this = this;
        var favourite = this.get("isFavourite");
        this.set("isFavourite", !favourite);
        this.set("cssClass", !favourite ? "session-favorite-selected" : "session-favorite-unselected");
        setTimeout(function () { _this.set("cssClass", "session-favorite"); }, 600);
    };
    return Session;
}(observable.Observable));
exports.Session = Session;
// Schedule
var allSessions = [
    // Day 1
    new Session("NativeScript Deep Dive 1", new Date(2015, 5, 3, 9, 30), new Date(2015, 5, 3, 12, 30), "room 1", true),
    new Session("Smart Design for Smartphones", new Date(2015, 5, 3, 9, 30), new Date(2015, 5, 3, 12, 30), "room 2", false),
    new Session("Build, Deploy, and Scale your Mobile Backend with Node.js and Modulus", new Date(2015, 5, 3, 9, 30), new Date(2015, 5, 3, 12, 30), "room 3", false),
    new Session("NativeScript Deep Dive 2", new Date(2015, 5, 3, 13, 30), new Date(2015, 5, 3, 16, 30), "room 1", true),
    new Session("Smart Design for Smartphones", new Date(2015, 5, 3, 13, 30), new Date(2015, 5, 3, 16, 30), "room 2", false),
    new Session("Responsive Apps with Telerik DevCraft", new Date(2015, 5, 3, 13, 30), new Date(2015, 5, 3, 16, 30), "room 3", false),
    // Day 2
    new Session("Telerik Keynote - Mobilizing and Modernizing", new Date(2015, 5, 4, 9, 30), new Date(2015, 5, 4, 12, 30), "room 1", true),
    new Session("A Lap Around NativeScript", new Date(2015, 5, 4, 10, 45), new Date(2015, 5, 4, 11, 30), "room 1", true),
    new Session("Kendo UI Building Blocks", new Date(2015, 5, 4, 10, 45), new Date(2015, 5, 4, 11, 30), "room 2", false),
    new Session("AngularJS 2.0", new Date(2015, 5, 4, 11, 45), new Date(2015, 5, 4, 12, 30), "room 1", true),
    new Session("Getting Started with ScreenBuilder", new Date(2015, 5, 4, 11, 45), new Date(2015, 5, 4, 12, 30), "room 2", false),
    new Session("NativeScript Extensibility", new Date(2015, 5, 4, 13, 30), new Date(2015, 5, 4, 14, 15), "room 1", true),
    new Session("AngularJS and Kendo UI ", new Date(2015, 5, 4, 13, 30), new Date(2015, 5, 4, 14, 15), "room 2", false),
    new Session("Building a CRM Portal in 45 Minutes", new Date(2015, 5, 4, 14, 30), new Date(2015, 5, 4, 15, 15), "room 1", false),
    new Session("JavaScript Beyond the Basics", new Date(2015, 5, 4, 14, 30), new Date(2015, 5, 4, 15, 15), "room 2", true),
    // Day 3
    new Session("Sitefinity Keynote", new Date(2015, 5, 5, 9, 30), new Date(2015, 5, 5, 12, 30), "room 1", true),
    new Session("Introduction to Mobile Testing & Device Cloud", new Date(2015, 5, 5, 10, 45), new Date(2015, 5, 5, 11, 30), "room 1", true),
    new Session("Using Kendo UI in SharePoint/Office 365", new Date(2015, 5, 5, 10, 45), new Date(2015, 5, 5, 11, 30), "room 2", false),
    new Session("Improving Applications with Telerik Analytics", new Date(2015, 5, 5, 11, 45), new Date(2015, 5, 5, 12, 30), "room 1", true),
    new Session("Building Offline Ready Mobile Apps", new Date(2015, 5, 5, 11, 45), new Date(2015, 5, 5, 12, 30), "room 2", false),
    new Session("Debugging with Fiddler", new Date(2015, 5, 5, 13, 30), new Date(2015, 5, 5, 14, 15), "room 1", true),
    new Session("Performance Tuning Your Mobile Web Apps", new Date(2015, 5, 5, 13, 30), new Date(2015, 5, 5, 14, 15), "room 2", false),
    new Session("Cross platform Telerik Native Mobile UI", new Date(2015, 5, 5, 14, 30), new Date(2015, 5, 5, 15, 15), "room 1", false),
    new Session("Advanced Kendo UI", new Date(2015, 5, 5, 14, 30), new Date(2015, 5, 5, 15, 15), "room 2", true),
];
var ConferenceViewModel = (function (_super) {
    __extends(ConferenceViewModel, _super);
    function ConferenceViewModel() {
        _super.call(this);
        this.selectedDay = 0;
        this.search = null;
        this.filter();
    }
    Object.defineProperty(ConferenceViewModel.prototype, "selectedDay", {
        get: function () {
            return this._selectedDay;
        },
        set: function (value) {
            if (this._selectedDay !== value) {
                this._selectedDay = value;
                this.filter();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConferenceViewModel.prototype, "search", {
        get: function () {
            return this._search;
        },
        set: function (value) {
            if (this._search !== value) {
                this._search = value;
                this.filter();
            }
        },
        enumerable: true,
        configurable: true
    });
    ConferenceViewModel.prototype.filter = function () {
        var day = this.selectedDay + 3;
        var textFilter = this.search ? this.search.toLocaleLowerCase() : this.search;
        var filteredSessions = allSessions.filter(function (session) {
            var include = (session.start.getDate() === day) &&
                (!textFilter || session.title.toLocaleLowerCase().indexOf(textFilter) >= 0);
            if (include) {
                session.cssClass = "session-favorite";
            }
            return include;
        });
        this.set("sessions", filteredSessions);
    };
    return ConferenceViewModel;
}(observable.Observable));
exports.ConferenceViewModel = ConferenceViewModel;
exports.instance = new ConferenceViewModel();