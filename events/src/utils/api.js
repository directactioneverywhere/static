import moment from 'moment';

let server = "https://adb.dxe.io";

let developmentServer = "http://localhost:3333";
let productionServer = "https://mobile.dxetech.org";

export function getEvents() {
  let pageID = "1377014279263790";

  // calculate start date (today) & end date (+30 days) in utc
  let startTime = moment().utc().format("YYYY-MM-DD")
  let endTime = moment().add(30,'days').utc().format("YYYY-MM-DD")

  let dxeURL = server + "/fb_events/" + pageID + "?start_time=" + startTime + "&end_time=" + endTime;

  console.log(dxeURL);

  return fetch(dxeURL)
    .then((resp) => resp.json())
    .then(function (data) {
      return data;
    })
    .catch(function (error) {
      console.error("Could not get events", error);
    });
}