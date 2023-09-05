import { countryEmojiMap } from "../countryEmojiMap.js";
import sadgrey from "../../imgs/sad_grey.svg";
import { weather } from "./weatherIcons.js";

// Class responsible for favourites

export class ForecastView {
  constructor() {
    this.forecastInner = document.querySelector(".current__forecast--inner");
    this.favouritesDropdown = document.querySelector(".favs__ul--another");
    this.favouritesContainer = document.querySelector(".lil__favs--container");
    this.favsUl = document.querySelector(".favs__ul");
    this.favsProb = document.querySelector(".favs_problems");
    this.sadPic = document.querySelector(".sad_img");
    this.errorTxt = document.querySelector(".error_text");
  }

  // Checking and handling local storage info
  checkingFavs(localStorageDisplaying, getCountryCodeByCity) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("favoriteItem_")) {
        const cityName = key.replace("favoriteItem_", "");
        localStorageDisplaying(cityName)
          .then((result) => {
            const data = JSON.stringify(result);
            try {
              const jsonObject = eval(`(${data})`);
              this.addToFavsFromLocalStorage(jsonObject, getCountryCodeByCity);
              this.updateAdditionalHtml();
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          })
          .catch((error) => {
            console.error(`Rejected: ${error}`);
          });
      }
    }
  }

  // Rendering favourites from local storage
  addToFavsFromLocalStorage(data, getCountryCodeByCity) {
    const favsList = document.querySelector(".favs__ul");
    const cityName = data.favcity;
    const weathers = `${data.curTemp}°C`;
    const conditions = data.curCond;
    const icon = `${weather(data.icon)}`;
    const newItem = document.createElement("li");
    const cssClassName = cityName.toLowerCase().replace(/\s+/g, "_");

    newItem.classList.add("favs-item", cssClassName);
    newItem.innerHTML = `<div class="favs-item--block"><img
        class="favs-item--icon"
        src="${icon}"
        alt="weather icon"
      /><p class="favs-item--city">${cityName}</p></div>
      <p class="favs-item--weather"><span>${weathers}</span> (${conditions})</p>
      <button class="new_button btn">
      <svg class="another_one" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12.9398 12L18.4665 6.47333C18.693 6.20883 18.6778 5.81454 18.4316 5.56829C18.1853 5.32205 17.791 5.30682 17.5265 5.53333L11.9998 11.06L6.47317 5.52667C6.21176 5.26525 5.78792 5.26525 5.52651 5.52667C5.26509 5.78808 5.26509 6.21192 5.52651 6.47333L11.0598 12L5.52651 17.5267C5.33626 17.6896 5.25339 17.9454 5.31197 18.1889C5.37055 18.4325 5.56069 18.6226 5.80423 18.6812C6.04776 18.7398 6.30358 18.6569 6.46651 18.4667L11.9998 12.94L17.5265 18.4667C17.791 18.6932 18.1853 18.678 18.4316 18.4317C18.6778 18.1855 18.693 17.7912 18.4665 17.5267L12.9398 12Z" fill="#737373"/>
      </svg>
      </button>
       `;
    // Rendering favourite city to favourites
    favsList.appendChild(newItem);

    getCountryCodeByCity(cityName).then((countryCode) => {
      const countryFlag = countryEmojiMap[countryCode] || "";
      const cssClassName = cityName.toLowerCase().replace(/\s+/g, "_");
      const favoritesItem = document.createElement("li");
      favoritesItem.classList.add(`${cssClassName}f`);
      favoritesItem.textContent = `${countryFlag} ${cityName}, ${countryCode}`;
      // Rendering favourite city to favourites dropdown
      this.favouritesDropdown.appendChild(favoritesItem);
    });
  }

  // Rendering a special state to favourites when nothing is added to favourites
  noFavs() {
    const favsUl = document.querySelector(".favs__ul");
    if (favsUl.children.length === 0) {
      const additionalHtml = `
    <div class="favs_problems">
      <img class="sad_img" src="${sadgrey}" alt="sad icon" />
      <p class="error_text">
        There're no favourites yet. <br>Start adding by pressing “Add to Favourites” button
      </p>
    </div>
  `;
      const favsList = document.querySelector(".favs-list");
      favsList.insertAdjacentHTML("afterend", additionalHtml);
    }
  }

  // Function responsible for checking if there're any favourites
  hasLiItems() {
    const favsUl = document.querySelector(".favs__ul");
    return favsUl && favsUl.children.length > 0;
  }

  // Handling different favourites states
  updateAdditionalHtml() {
    const additionalHtmlElement = document.querySelector(".favs_problems");
    const htmlllll = `
    <div class="favs_problems">
      <img class="sad_img" src="${sadgrey}" alt="sad icon" />
      <p class="error_text">
        There're no favourites yet. <br>Start adding by pressing “Add to Favourites” button
      </p>
    </div>
  `;
    if (!this.hasLiItems()) {
      // If there are no favourites items, adding the additional HTML
      const favssList = document.querySelector(".favs-list");
      favssList.insertAdjacentHTML("beforeend", htmlllll);
    } else {
      // If there are favourites, removing the additional HTML if it exists
      if (additionalHtmlElement) {
        additionalHtmlElement.remove();
      }
    }
  }

  // Function that collects all the information about the city forecast when "add to favourites" button is clicked
  initializeListeners(getCountryCodeByCity) {
    // Selecting elements
    const addButton = this.forecastInner.querySelector(".forecast__head--btn");
    const crossBtn = document.querySelector(".another_one");

    // Getting current city name and checking if it's added to favorites
    const cityNameElement = document.querySelector(".forecast__head--city");
    const favsList = document.querySelector(".favs__ul");
    const currentCityName = cityNameElement.textContent;
    const isCityAdded = this.isCityAlreadyAdded(currentCityName, favsList);

    // Setting up SVG path attributes based on whether the city is added
    const svgPath = addButton.querySelector("path");
    this.setupSvgAttributes(svgPath, isCityAdded);

    // Adding click event listener to addButton
    addButton.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target !== crossBtn) {
        this.handleAddButtonClick(
          cityNameElement,
          favsList,
          svgPath,
          getCountryCodeByCity
        );
      }
    });
  }

  // Changing heart svg color
  setupSvgAttributes(svgPath, isCityAdded) {
    svgPath.setAttribute("fill", isCityAdded ? "#b6c423" : "white");
    svgPath.setAttribute(
      "d",
      isCityAdded
        ? "M6.54112 2.94746C5.26943 1.67576 3.21207 1.66958 1.94588 2.93578C0.679686 4.20197 0.685866 6.25933 1.95756 7.53102L6.66505 12.2385C6.86031 12.4338 7.1769 12.4338 7.37216 12.2385L12.0552 7.55824C13.3184 6.28793 13.3144 4.23634 12.0425 2.96442C10.7686 1.69045 8.71024 1.68427 7.44178 2.95273L6.99452 3.40085L6.54112 2.94746Z"
        : "M6.54112 3.44746C5.26943 2.17576 3.21207 2.16958 1.94588 3.43578C0.679686 4.70197 0.685866 6.75933 1.95756 8.03102L6.66505 12.7385C6.86031 12.9338 7.1769 12.9338 7.37216 12.7385L12.0552 8.05824C13.3184 6.78793 13.3144 4.73634 12.0425 3.46442C10.7686 2.19045 8.71024 2.18427 7.44178 3.45273L6.99452 3.90085L6.54112 3.44746ZM11.3461 7.35311L7.01861 11.6779L2.66467 7.32391C1.78255 6.4418 1.77827 5.0176 2.65299 4.14288C3.5277 3.26817 4.9519 3.27245 5.83402 4.15456L6.64337 4.96392C6.84197 5.16252 7.16514 5.15862 7.35889 4.9553L8.14889 4.15984C9.02587 3.28286 10.451 3.28714 11.3354 4.17153C12.2178 5.05387 12.2205 6.47382 11.3461 7.35311Z"
    );
  }

  // Deciding if city should be added ot deleted from favourites
  handleAddButtonClick(
    cityNameElement,
    favsList,
    svgPath,
    getCountryCodeByCity
  ) {
    const cityName = cityNameElement.textContent;
    if (!this.isCityAlreadyAdded(cityName, favsList)) {
      this.addToFavorites(cityName, favsList, svgPath, getCountryCodeByCity);
    } else {
      this.removeFromFavorites(cityName, favsList, svgPath);
    }
  }

  // Adding a city to favourites
  addToFavorites(cityName, favsList, svgPath, getCountryCodeByCity) {
    const weatherElement = document.querySelector(".middle__celsius");
    const conditionsElement = document.querySelector(".middle__weather");
    const iconWeather = document.querySelector(".middle__inner--icon");
    const btnText = document.querySelector(".head__btn--text");
    const weather = weatherElement.textContent;
    const conditions = conditionsElement.textContent;
    const icon = iconWeather.cloneNode(true);
    const newItem = document.createElement("li");
    const cssClassName = cityName.toLowerCase().replace(/\s+/g, "_");

    newItem.classList.add("favs-item", cssClassName);
    newItem.innerHTML = `<div class="favs-item--block"><img
      class="favs-item--icon"
      src="${icon.src}"
      alt="weather icon"
    /><p class="favs-item--city">${cityName}</p></div>
    <p class="favs-item--weather"><span>${weather}</span> (${conditions})</p> 
  
    <button class="new_button btn">
    <svg class="another_one" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12.9398 12L18.4665 6.47333C18.693 6.20883 18.6778 5.81454 18.4316 5.56829C18.1853 5.32205 17.791 5.30682 17.5265 5.53333L11.9998 11.06L6.47317 5.52667C6.21176 5.26525 5.78792 5.26525 5.52651 5.52667C5.26509 5.78808 5.26509 6.21192 5.52651 6.47333L11.0598 12L5.52651 17.5267C5.33626 17.6896 5.25339 17.9454 5.31197 18.1889C5.37055 18.4325 5.56069 18.6226 5.80423 18.6812C6.04776 18.7398 6.30358 18.6569 6.46651 18.4667L11.9998 12.94L17.5265 18.4667C17.791 18.6932 18.1853 18.678 18.4316 18.4317C18.6778 18.1855 18.693 17.7912 18.4665 17.5267L12.9398 12Z" fill="#737373"/>
    </svg>
    </button>
     `;
    favsList.appendChild(newItem);

    svgPath.setAttribute(
      "d",
      "M6.54112 2.94746C5.26943 1.67576 3.21207 1.66958 1.94588 2.93578C0.679686 4.20197 0.685866 6.25933 1.95756 7.53102L6.66505 12.2385C6.86031 12.4338 7.1769 12.4338 7.37216 12.2385L12.0552 7.55824C13.3184 6.28793 13.3144 4.23634 12.0425 2.96442C10.7686 1.69045 8.71024 1.68427 7.44178 2.95273L6.99452 3.40085L6.54112 2.94746Z"
    );
    svgPath.setAttribute("fill", "#b6c423");
    btnText.textContent = "Remove from Favourites";
    // Create a div element to hold the item's HTML

    const itemContainer = document.createElement("div");
    itemContainer.innerHTML = `
  <div class="favs-item--block"><img
  class="favs-item--icon"
  src="${icon.src}"
  alt="weather icon"
/><p class="favs-item--city">${cityName}</p></div>
<p class="favs-item--weather"><span>${weather}</span> (${conditions})</p> 

<button class="new_button btn">
<svg class="another_one" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12.9398 12L18.4665 6.47333C18.693 6.20883 18.6778 5.81454 18.4316 5.56829C18.1853 5.32205 17.791 5.30682 17.5265 5.53333L11.9998 11.06L6.47317 5.52667C6.21176 5.26525 5.78792 5.26525 5.52651 5.52667C5.26509 5.78808 5.26509 6.21192 5.52651 6.47333L11.0598 12L5.52651 17.5267C5.33626 17.6896 5.25339 17.9454 5.31197 18.1889C5.37055 18.4325 5.56069 18.6226 5.80423 18.6812C6.04776 18.7398 6.30358 18.6569 6.46651 18.4667L11.9998 12.94L17.5265 18.4667C17.791 18.6932 18.1853 18.678 18.4316 18.4317C18.6778 18.1855 18.693 17.7912 18.4665 17.5267L12.9398 12Z" fill="#737373"/>
</svg>
</button>
  `;
    // Storing the HTML representation in local storage
    localStorage.setItem(`favoriteItem_${cityName}`, itemContainer.innerHTML);

    this.updateAdditionalHtml();

    getCountryCodeByCity(cityName).then((countryCode) => {
      const countryFlag = countryEmojiMap[countryCode] || "";
      const cssClassName = cityName.toLowerCase().replace(/\s+/g, "_");
      const favoritesItem = document.createElement("li");
      favoritesItem.classList.add(`${cssClassName}f`);
      favoritesItem.textContent = `${countryFlag} ${cityName}, ${countryCode}`;
      this.favouritesDropdown.appendChild(favoritesItem);
    });
  }

  // Removing a city from favourites
  removeFromFavorites(cityName) {
    const storedHTML = localStorage.getItem(`favoriteItem_${cityName}`);
    if (storedHTML) {
      // Removing the item's HTML from local storage
      localStorage.removeItem(`favoriteItem_${cityName}`);
    }
    const addButton = this.forecastInner.querySelector(".forecast__head--btn");
    const headCity = document.querySelector(".forecast__head--city");
    const svgPath = addButton.querySelector("path");
    const btnText = document.querySelector(".head__btn--text");
    const thatItem = document.querySelector(
      `.${cityName.toLowerCase().replace(/\s+/g, "_")}`
    );
    const thatItemf = document.querySelector(
      `.${cityName.toLowerCase().replace(/\s+/g, "_")}f`
    );
    thatItem.remove();
    thatItemf.remove();

    if (headCity) {
      if (cityName === headCity.textContent) {
        btnText.textContent = "Add to Favourites";
        svgPath.setAttribute(
          "d",
          "M6.54112 3.44746C5.26943 2.17576 3.21207 2.16958 1.94588 3.43578C0.679686 4.70197 0.685866 6.75933 1.95756 8.03102L6.66505 12.7385C6.86031 12.9338 7.1769 12.9338 7.37216 12.7385L12.0552 8.05824C13.3184 6.78793 13.3144 4.73634 12.0425 3.46442C10.7686 2.19045 8.71024 2.18427 7.44178 3.45273L6.99452 3.90085L6.54112 3.44746ZM11.3461 7.35311L7.01861 11.6779L2.66467 7.32391C1.78255 6.4418 1.77827 5.0176 2.65299 4.14288C3.5277 3.26817 4.9519 3.27245 5.83402 4.15456L6.64337 4.96392C6.84197 5.16252 7.16514 5.15862 7.35889 4.9553L8.14889 4.15984C9.02587 3.28286 10.451 3.28714 11.3354 4.17153C12.2178 5.05387 12.2205 6.47382 11.3461 7.35311Z"
        );
        svgPath.setAttribute("fill", "white");
      }
    }
    this.updateAdditionalHtml();
  }

  // Checking if city is already added to favourites
  isCityAlreadyAdded(cityName, list) {
    const cityItems = list.querySelectorAll(".favs-item--city");
    for (const item of cityItems) {
      if (item.textContent === cityName) {
        return true;
      }
    }
    return false;
  }

  // Logic of favourites dropdown
  initializeFavouritesView() {
    // Toggle favorites dropdown on button click
    const favouritesButton = document.querySelector(".header__favourites");
    favouritesButton.addEventListener("click", () => {
      if (this.favouritesDropdown.innerHTML === "") return;
      this.favouritesDropdown.classList.toggle("active");
      this.favouritesContainer.classList.toggle("active");
    });
    // Close favorites dropdown when clicking outside
    document.addEventListener("click", (event) => {
      if (
        !favouritesButton.contains(event.target) &&
        !this.favouritesDropdown.contains(event.target)
      ) {
        this.favouritesDropdown.classList.remove("active");
        this.favouritesContainer.classList.remove("active");
      }
    });
  }

  // Changing "add to favourites" button text
  settingBtnText(city) {
    const btnText = document.querySelector(".head__btn--text");
    if (
      document.querySelector(`li.${city.toLowerCase().replace(/\s+/g, "_")}f`)
    ) {
      btnText.textContent = "Remove from Favourites";
    }
  }
  // Observing changes in forecastInner and initializing listeners
  observeForecastInnerChanges(getCountryCodeByCity, favouritesError) {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "childList" &&
          this.forecastInner.innerHTML !== ""
        ) {
          this.initializeListeners(getCountryCodeByCity, favouritesError);
          break;
        }
      }
    });
    observer.observe(this.forecastInner, { childList: true });
  }
}

export const forecastView = new ForecastView();
