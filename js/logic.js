/**
 * Created by 6872 on 20/08/2014.
 */
logic = {};

(function () {


    var settings = {
        teamCalendar: '.EventsSection',
        monthNavigation: '.monthNavigation',
        currentMonth: '.EventsSection > .currentMonth',
        dataLoading: '.calendarDataLoading',
        calendarData: '.calendarData',
        backFull: '.EventsSection > .monthNavigation > .back',
        back: ' .back',
        nextFull: '.EventsSection > .monthNavigation > .next',
        next: '.next',
        config: {
            currentMonth: 'current-month',
            currentYear: 'current-year',
            teamId: 'team-id'
        },
        wording: {
            'noData': 'There are no upcoming events'
        }
    };


    this.init = function () {
        $("#SideBar div.EventsSection").each(function () {
            var today = getToday();
            var parentElement = $(this);
            setDateToParent(parentElement, today);
            setCurrentMonth(today, parentElement);
            processData(parentElement);
        });
    };

    // back - negative add
    $(settings.backFull).click(function () {
        var parent = getContainerElement($(this));
        updateDate(parent, -1);
        processData(parent);
    });

    // next - positive add
    $(settings.nextFull).click(function () {
        var parent = getContainerElement($(this));
        updateDate(parent, +1);
        processData(parent);
    });

    function getContainerElement(element) {
        return element.parent().parent();
    }


    //behavior

    function processData(parent) {

        ShowIfBackIsToBeShown(parent);
        loadData(parent);
    }

    function loadData(parent) {

        var teamId = parent.data(settings.config.teamId);
        var currentMonth = parent.data(settings.config.currentMonth);
        var currentYear = parent.data(settings.config.currentYear);

        var url = 'http://localhost:3000/loadTeamEvents/' + teamId + '/' + currentYear + '/' + (parseInt(currentMonth) + 1).toString();

        $(parent).find(settings.dataLoading).show();

        $.when($.ajax(url)).then(function (data) {

            setCurrentMonth(new Date(currentYear, currentMonth), parent);
            $(parent).find(settings.calendarData).html(data);
            $(parent).find(settings.calendarData).show(data);
            $(parent).find(settings.dataLoading).hide();
        });
    }

    function ShowIfBackIsToBeShown(parent) {

        var today = getToday();
        var backLink = $(parent).find(settings.back);

        var date = getDateFromElement(parent);
        if (date.getFullYear() > today.getFullYear()) {
            backLink.show();
        } else if (date.getFullYear() == today.getFullYear() && date.getMonth() > today.getMonth()) {
            backLink.show();
        } else {
            backLink.hide();
        }
    }

    function setCurrentMonth(date, parent) {

        $(parent).find('.currentMonth').html(monthYear(date));
    }

    function setDateToParent(element, date) {

        element.data(settings.config.currentYear, date.getFullYear());
        element.data(settings.config.currentMonth, date.getMonth());
    }

    function getDateFromElement(element) {
        var year = element.data(settings.config.currentYear);
        var month = element.data(settings.config.currentMonth);
        return new Date(year, month, 1);
    }


    function getToday() {
        return new Date(Date.now());
    }

    function updateDate(parent, move) {
        var date = getDateFromElement(parent);
        date.setMonth(date.getMonth() + move);
        setDateToParent(parent, date);
    }

    function monthYear(date) {

        var monthNames = [ "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ];

        var year = date.getFullYear().toString();

        return monthNames[date.getMonth()] + ' ' + year;
    }


}).apply(logic);