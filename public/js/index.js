document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      height: 500,
      locale: 'nl',
      dayMaxEventRows: 2,
      events: [
          {
              title: 'Activiteit',
              description: 'Activiteit',
              start: '2020-10-24T17:00:00',
              end: '2020-10-24T20:30:00',
              group_id: 17
          }
      ],
      eventColor: '#378006',

    });
    calendar.render();
  });