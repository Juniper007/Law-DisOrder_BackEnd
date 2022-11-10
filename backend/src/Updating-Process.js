import fetch from "node-fetch";
import { CronJob } from "cron";

// TODO: fetch request to pull table from DB as array of objects

// cron to schedule... weekly? daily? at midnight?
// var CronJob = require('cron').CronJob;
let job = new CronJob(
	// '* * * * * *', what is this for?
    
    function() {
// call on functions to do stuff
	},
	null,
	true,
	'America/Los_Angeles'
);
// Use this if the 4th param is default value(false)
// job.start()

function newFunction (array) {
    // fetch from MongoDB an array of all documents 
	array.forEach(element => {
        
    });
}

/* fetch from DB the html to reference below (i.e. https://data.calgary.ca etc...) as well as last date updated
await fetch from said https://data.calgary.ca/api/id/78gh-n26t(.json?)
save information from 'last-modified' header to new variable
compare new variable to information stored in a timestamp table (row pertinent to specific dataset source?)
if fetched timestamp is different(or more recent?) compared to table content, replace entire downloaded table
if not, process.exit()


*/