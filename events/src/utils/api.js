let developmentServer = "http://localhost:3333";
let productionServer = "https://mobile.dxetech.org";

let server = (process.env.NODE_ENV === 'development') ? developmentServer : productionServer;

export function getEvents() {
  let dxeURL = server + "/events";
  return fetch(dxeURL)
    .then((resp) => resp.json())
    .then(function (data) {
      return data;
    })
    .catch(function (error) {
      console.error("Could not get events", error);
    });
}

// Analytics API
export function logHit() {
  return fetch(server + '/a/web', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      'type': 'hit',
    })
  }).catch(function (error) {
    console.error("Could not log hit", error);
  });
}

export function logClickLink(href, type) {
  return fetch(server + '/a/web', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      type: 'click-link',
      data: {
        href: href,
        type: type,
      },
    }),
  }).catch(function (error) {
    console.error("Could not log click-link", error);
  });
}
