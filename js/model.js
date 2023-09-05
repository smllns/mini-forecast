// This js file is responsible for data storage and API calls
import { async } from "regenerator-runtime";

// Getting current location coords and throwing an error if it takes too long
export async function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      const timeoutId = setTimeout(() => {
        reject(new Error("Geolocation request timed out."));
      }, 5000);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeoutId);
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        },
        (error) => {
          clearTimeout(timeoutId);
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}

// Getting city and country names based on current coords
export async function getCityFromCoordinates(latitude, longitude) {
  const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  const headers = new Headers();
  headers.append("accept-language", "en");
  try {
    const response = await fetch(apiUrl, { headers });

    if (!response.ok) {
      throw new Error(
        `Location data request failed with status: ${response.status}`
      );
    }
    const data = await response.json();
    const city = data.address.city;
    const country = data.address.country;
    const cityAndCountry = { city, country };
    return cityAndCountry;
  } catch (error) {
    console.error("Error fetching location data:", error);
    throw error;
  }
}

//Getting weather forecast for current location
export async function fetchDataByCity(city, startDate, endDate) {
  const apiKey = "GJY8BSEVG66EE9A57D8ADCVLE";
  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate
    .toISOString()
    .slice(0, 10)}/${endDate
    .toISOString()
    .slice(0, 10)}?unitGroup=metric&key=${apiKey}&contentType=json`;
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error making API request:", error);
    throw error;
  }
}

let weatherData = null;

export function setWeatherData(data) {
  weatherData = data;
}

export function getWeatherData() {
  return weatherData;
}
// Weather object
export function generateWeatherData(apiData, city, country) {
  return {
    city: city,
    country: country,
    temp: Math.round(apiData.currentConditions.temp),
    feelsLike: Math.round(apiData.currentConditions.feelslike),
    wind: Math.round(apiData.currentConditions.windspeed),
    humidity: Math.round(apiData.currentConditions.humidity),
    pressure: apiData.currentConditions.pressure,
    uvIndex: apiData.currentConditions.uvindex,
    visibility: apiData.currentConditions.visibility,
    sunrise: apiData.currentConditions.sunrise,
    sunset: apiData.currentConditions.sunset,
    conditions: apiData.currentConditions.conditions.split(",")[0].trim(),
    icon: apiData.currentConditions.icon,
    dates: apiData.days.slice(1, 8).map((day) => ({
      weekDay: formatWeekDay(day.datetime),
      date: formatDate(day.datetime),
      conditions: day.conditions.split(",")[0].trim(),
      temp: Math.round(day.temp),
      icon: day.icon,
    })),
  };
}

// Weekdays
function formatWeekDay(dateString) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dateString);
  return daysOfWeek[date.getDay()];
}

// Months
function formatDate(dateString) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  return `${day} ${month}`;
}

// API call for suggested cities
let suggestedCities = [];

export async function fetchSuggestions(query) {
  const apiKey = "b598743ff7a57083586aa6cf9193527b";
  const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}&lang=en`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch suggestions");
  }
  const data = await response.json();
  const uniqueSuggestions = data.filter((city) => {
    const cityNameLower = city.name.toLowerCase();
    const existingCity = suggestedCities.find(
      (existingCity) => existingCity.toLowerCase() === cityNameLower
    );
    return !existingCity;
  });
  suggestedCities = suggestedCities.concat(
    uniqueSuggestions.map((city) => city.name.toLowerCase())
  );
  return uniqueSuggestions;
}

// Getting country code by city
export async function getCountryCodeByCity(city) {
  const apiKey = "b598743ff7a57083586aa6cf9193527b";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === 200) {
      // Weather data retrieved successfully
      const countryCode = data.sys.country;
      return countryCode;
    } else {
      // Handle API error
      console.error("Error:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
