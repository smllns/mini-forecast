// Main js file which is controlling all the other files

import * as model from "./model.js";
import { weatherView } from "./view/view.js";
import { sevenDaysView } from "./view/sevenDaysView.js";
import { whatToWearToday } from "./whatToWear.js";
import { errorHandler } from "./view/errorHandling.js";
import { noWearData } from "./whatToWear.js";
import { forecastView } from "./view/favouritesView.js";
import { dropdownClickHandlers } from "./view/dropdownClicks.js";
import { locationView } from "./view/locationView.js";
import { bgChange } from "./view/bgChange.js";
import { btnBgChange } from "./view/bgChange.js";
import { firstWindow } from "./view/locationWindow.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

// Generating current day and dates for 7 days forecast
const generateDate = function () {
  const currentDate = new Date();
  const endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() + 8);
  return { currentDate, endDate };
};

// Generating current forecast data
const createWeatherData = async function () {
  try {
    const { latitude, longitude } = await model.getLocation();
    const { currentDate, endDate } = generateDate();
    // Geting the city from coordinates using reverse geocoding
    const cityAndCountry = await model.getCityFromCoordinates(
      latitude,
      longitude
    );
    const { city, country } = cityAndCountry;
    const apiData = await model.fetchDataByCity(
      cityAndCountry.city,
      currentDate,
      endDate
    );

    const weatherData = model.generateWeatherData(apiData, city, country);
    model.setWeatherData(weatherData);
    weatherView.renderWeatherData(weatherData);
    sevenDaysView.renderWeatherData(weatherData);
    weatherView.changePlaceholder(weatherData);
    whatToWearToday();
    forecastView.settingBtnText(city);
  } catch (error) {
    console.error("Async function error:", error);
    errorHandler.locationLoadingError();
    noWearData();
    errorHandler.lilForecastError();
  }
};

// Generating new cities forecast data
const newForecastGeneration = async function (inputCity) {
  const { currentDate, endDate } = generateDate();
  const apiData = await model.fetchDataByCity(inputCity, currentDate, endDate);
  const cityAndCountry = await model.getCityFromCoordinates(
    apiData.latitude,
    apiData.longitude
  );
  const { city, country } = cityAndCountry;
  function capitalizeWords(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
  const newCity = capitalizeWords(inputCity);
  const weatherData = model.generateWeatherData(apiData, newCity, country);
  model.setWeatherData(weatherData);
  locationView.clearInput();
  weatherView.renderWeatherData(weatherData);
  sevenDaysView.renderWeatherData(weatherData);
  weatherView.changePlaceholder(weatherData);
  whatToWearToday();
  locationView.hideSpinner();
  locationView.hideSuggestions();
  forecastView.settingBtnText(inputCity);
};

async function initializeWeatherApp() {
  try {
    await createWeatherData();
  } catch (error) {
    console.error("Error initializing weather app:", error);
  }
}

// Displaing cities from local storage
const localStorageDisplaying = async function (inputCity) {
  const { currentDate, endDate } = generateDate();
  const apiData = await model.fetchDataByCity(inputCity, currentDate, endDate);
  const cityAndCountry = await model.getCityFromCoordinates(
    apiData.latitude,
    apiData.longitude
  );
  const { city, country } = cityAndCountry;
  function capitalizeWords(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
  const newCity = capitalizeWords(inputCity);
  const weatherData = model.generateWeatherData(apiData, newCity, country);
  model.setWeatherData(weatherData);
  forecastView.settingBtnText(inputCity);
  return {
    favcity: weatherData.city,
    curTemp: weatherData.temp,
    curCond: weatherData.conditions,
    icon: weatherData.icon,
  };
};

// Calling all the functions
firstWindow();
locationView.keypressEnter(newForecastGeneration, errorHandler);
locationView.handleLocationDropdownClick(createWeatherData);
initializeWeatherApp();
locationView.handleInput(errorHandler, model.fetchSuggestions);
locationView.openDropdown();
locationView.closeDropdown();
dropdownClickHandlers(newForecastGeneration, errorHandler, forecastView);
forecastView.initializeFavouritesView();
forecastView.observeForecastInnerChanges(
  model.getCountryCodeByCity,
  errorHandler.favouritesError
);
const currentHour = new Date().getHours();
bgChange(currentHour);
btnBgChange();
forecastView.checkingFavs(localStorageDisplaying, model.getCountryCodeByCity);
forecastView.noFavs();
