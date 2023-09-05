// Functions with clothes suggestions

// Object where all clothes suggestions are stored
const whatToWear = {
  sunny: "Shorts and a t-shirt are a great choice 🥰",
  cloudy: "A light jacket and jeans would work well 🤍",
  rainy: "Don't forget an umbrella and a waterproof jacket ☔️",
  colder: "Bundle up with a warm coat, scarf, and boots 💚",
  chilly: "Layer up with a sweater and a light jacket to stay cozy 💙",
  cold: "Wear a heavy coat, gloves, and a hat to stay warm 💕",
  hot: "Opt for loose, breathable clothing to stay cool 🥵",
  foggy: "A light sweater and jeans should do the trick 🧡",
  supercold: "Better stay indoors and cozy up with a book 🥶",
  noaccess: "We do not know! Where are you? 😢",
};

// Displaying clothes advise if no forecast is loaded
export const noWearData = function () {
  const middleOutfitElement = document.querySelector(".wear__advise");
  middleOutfitElement.textContent = whatToWear.noaccess;
};

// Rendering clothes suggestions
export const whatToWearToday = function () {
  const middleWeatherElement = document.querySelector(".middle__weather");
  const middleCelsiusElement = document.querySelector(".middle__celsius");
  const middleOutfitElement = document.querySelector(".wear__advise");

  const weatherCondition = middleWeatherElement.textContent.toLowerCase();
  const temperatureCelsius = middleCelsiusElement.textContent
    .slice(0, -2)
    .toLowerCase();
  if (weatherCondition === "rain" || weatherCondition === "thunderstorms") {
    middleOutfitElement.textContent = whatToWear.rainy;
    return;
  }
  if (temperatureCelsius >= 25) {
    middleOutfitElement.textContent = whatToWear.hot;
  }
  if (temperatureCelsius >= 20 && temperatureCelsius < 25) {
    middleOutfitElement.textContent = whatToWear.sunny;
  }
  if (temperatureCelsius >= 15 && temperatureCelsius < 20) {
    middleOutfitElement.textContent = whatToWear.cloudy;
  }
  if (temperatureCelsius >= 10 && temperatureCelsius < 15) {
    middleOutfitElement.textContent = whatToWear.foggy;
  }
  if (temperatureCelsius >= 5 && temperatureCelsius < 10) {
    middleOutfitElement.textContent = whatToWear.chilly;
  }
  if (temperatureCelsius >= 0 && temperatureCelsius < 5) {
    middleOutfitElement.textContent = whatToWear.colder;
  }
  if (temperatureCelsius >= -5 && temperatureCelsius < 0) {
    middleOutfitElement.textContent = whatToWear.cold;
  }
  if (temperatureCelsius >= -100 && temperatureCelsius < -5) {
    middleOutfitElement.textContent = whatToWear.supercold;
  }
};
