document.addEventListener('DOMContentLoaded', function() {
    if(document.getElementById('calendar')){
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            themeSystem: 'darkly',
            height: 500,
            locale: 'nl',
            dayMaxEventRows: 2,
            events: {
                url: window.location.href + 'events'
            },
            eventColor: '#378006',
            eventClick: function(info) {
                window.location.href = "/activities/activity/" + info.event.id
            }

        });
        calendar.render();
    } else {
        console.log('no calendar');
    }
});