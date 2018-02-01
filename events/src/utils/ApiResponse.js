let developmentServer = "http://localhost:3333";
let productionServer = "http://mobile.dxetech.org";

let server = (process.env.NODE_ENV === 'development') ? developmentServer : productionServer;

export function getEvents() {
  let dxeURL = server + "/events";
  return fetch(dxeURL)
    .then((resp) => resp.json())
    .then(function (data) {
      return data.data
    })
    .catch(function (error) {
      console.error("Could not get events", error);
    })
}
