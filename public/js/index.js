document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        height: 500,
        locale: 'nl',
        dayMaxEventRows: 2,
        events: {
            url: 'http://localhost:3000/events'
        },
        eventColor: '#378006',

    });
    calendar.render();
});