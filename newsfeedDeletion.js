const con = require('./connect');
const fs = require('fs');

function DeleteNewsfeed() {
    var dateMonth = new Date()
    dateMonth = dateMonth.setMonth(dateMonth.getMonth()-1)
    var date = new Date(dateMonth).toJSON().slice(0, 19)
    con.query('SELECT * FROM newsfeeds WHERE end_publication <= ?', date, (err, newsfeeds)=> {
        if(err) return console.log(err);
        if(!newsfeeds[0]) return console.log('Nothing to delete :(');

        newsfeeds.forEach(function(newsfeed) {
            fs.unlinkSync(newsfeed.picture_path);
            con.query('DELETE FROM newsfeeds WHERE feed_id = ?', newsfeed.feed_id, (err, newsfeedDeleted)=> {
                if(err) return console.log(err);
                console.log(`Newsfeed id: ${newsfeed.feed_id} is deleted`);
            })
        })
    });
}

function EveryDayCheck() {
    var now = new Date();
    var night = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0, 0, 0
    );
    var msToMidnight = night.getTime() - now.getTime();

    setTimeout(function() {
        DeleteNewsfeed();
        EveryDayCheck();   
    }, msToMidnight);
}

EveryDayCheck();