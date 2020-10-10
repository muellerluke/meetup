import { mockEvents } from "./mock-events";
import axios from "axios";

async function getSuggestions(query) {
  if (window.location.href.startsWith("http://localhost")) {
    var temp = [];
    var arr = [
      {
        city: "Munich",
        country: "de",
        localized_country_name: "Germany",
        name_string: "Munich, Germany",
        zip: "meetup3",
        lat: 48.14,
        lon: 11.58,
      },
      {
        city: "Munich",
        country: "us",
        localized_country_name: "USA",
        state: "ND",
        name_string: "Munich, North Dakota, USA",
        zip: "58352",
        lat: 48.66,
        lon: -98.85,
      },
    ];
    arr.forEach((stuff) => {
      if (stuff.name_string.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        temp.push(stuff);
      }
    });

    return temp;
  }

  const token = await getAccessToken();
  if (token) {
    const url =
      "https://cors-anywhere.herokuapp.com/https://api.meetup.com/find/locations?&sign=true&photo-host=public&query=" +
      query +
      "&access_token=" +
      token;
    const result = await axios.get(url);
    return result.data;
  }
  return [];
}

async function getEvents(lat, lon, page) {
  if (window.location.href.startsWith("http://localhost")) {
    let events2 = [];
    if (page === null) {
      events2 = mockEvents.events;
    } else {
      for (let i = 0; i < page; i++) {
        console.log(page);
        try {
          if (i < page && mockEvents.events[i].id !== null)
            events2.push(mockEvents.events[i]);
        } catch {
          console.log("no id");
        }
      }
    }
    return events2;
  }
  if (!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    return JSON.parse(events);
  }

  const token = await getAccessToken();
  if (token) {
    let url =
      "https://cors-anywhere.herokuapp.com/https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public" +
      "&access_token=" +
      token;
    // lat, lon is optional; if you have a lat and lon, you can add them
    if (lat && lon) {
      url += "&lat=" + lat + "&lon=" + lon;
    }
    if (page) {
      url += "&page=" + page;
    }
    const result = await axios.get(url);
    const events = result.data.events;
    if (events.length) {
      // Check if the events exist
      localStorage.setItem("lastEvents", JSON.stringify(events));
    }
    return events;
  }
}

async function getAccessToken() {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (!code) {
      window.location.href =
        "https://secure.meetup.com/oauth2/authorize?client_id=29f2e4gtqdgcvq829jg5jo38qs&response_type=code&redirect_uri=https://muellerluke.github.io/meetup/";
      return null;
    }
    return getOrRenewAccessToken("get", code);
  }
  const lastSavedTime = localStorage.getItem("last_saved_time");

  if (accessToken && Date.now() - lastSavedTime < 3600000) {
    return accessToken;
  } else if (accessToken && Date.now() - lastSavedTime > 3600000) {
    const refreshToken = localStorage.getItem("refresh_token");
    return getOrRenewAccessToken("renew", refreshToken);
  }
}

async function getOrRenewAccessToken(type, key) {
  let url;
  if (type === "get") {
    // Lambda endpoint to get token by code
    url =
      "https://cwchc3wu5f.execute-api.us-east-1.amazonaws.com/dev/api/token/" +
      key;
  } else if (type === "renew") {
    // Lambda endpoint to get token by refresh_token
    url =
      "https://cwchc3wu5f.execute-api.us-east-1.amazonaws.com/dev/api/refresh/" +
      key;
  }

  // Use Axios to make a GET request to the endpoint
  const tokenInfo = await axios.get(url);
  console.log(tokenInfo);
  // Save tokens to localStorage together with a timestamp
  localStorage.setItem("access_token", tokenInfo.data.access_token);
  localStorage.setItem("refresh_token", tokenInfo.data.refresh_token);
  localStorage.setItem("last_saved_time", Date.now());

  // Return the access_token
  return tokenInfo.data.access_token;
}

export { getSuggestions, getEvents, getAccessToken };
