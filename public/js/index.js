function makeCalendar(activities) {
    console.log("executing make calendar");
    var events = []
    // activities.forEach((activity) => {
    //     activity_description = {
    //         title: activity.title,
    //         description: acitivity.description,
    //         start: activity.start_date,
    //         end: activity.end_date,
    //         group_id: activity.group_id
    //     }
    //     events += [activity_description]
    // })
    // console.log(events);
    console.log('making calendar');
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
}

function makeCalendar2() {
    console.log("executing make calendar");
    var events = []
    // activities.forEach((activity) => {
    //     activity_description = {
    //         title: activity.title,
    //         description: acitivity.description,
    //         start: activity.start_date,
    //         end: activity.end_date,
    //         group_id: activity.group_id
    //     }
    //     events += [activity_description]
    // })
    // console.log(events);
    console.log('making calendar');
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
}