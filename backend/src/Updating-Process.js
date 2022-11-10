import fetch from "node-fetch"

/* 
cron to schedule... weekly? daily? at midnight?
await fetch from https://data.calgary.ca/api/id/78gh-n26t(.json?)
save information from 'last-modified' header to new variable
compare new variable to information stored in a timestamp table (row pertinent to specific dataset source?)
if fetched timestamp is different(or more recent?) compared to table content, replace entire downloaded table
if not, process.exit()


*/