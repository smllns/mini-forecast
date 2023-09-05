// Class resonsible for rendering 7 days weather forecast

import { weather } from "./weatherIcons.js";

export class SevenDaysView {
  constructor(containerSelector) {
    this.container = document.querySelector(".weekly__forecast");
  }
  renderWeatherData(weatherData) {
    const markup = weatherData.dates
      .map(
        (forecast) => `
        <div class="lil__forecast">
            <p class="lil__date">
                ${forecast.weekDay},<br />
                ${forecast.date}
            </p>
            <img
                class="lil__img"
                src="${weather(forecast.icon)}"
                alt="lil forecast img"
            />
            <p class="lil__weather">${forecast.conditions}</p>
            <p class="lil__celsius">${forecast.temp}°C</p>
        </div>`
      )
      .join("");
    this.container.innerHTML = markup;
  }
}
export const sevenDaysView = new SevenDaysView(".weekly__inner");
