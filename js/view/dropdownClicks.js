// Function responsible for clicks on dropdowns and favourites ul
import { async } from "regenerator-runtime";

export const dropdownClickHandlers = function (
  newForecastGeneration,
  errorHandler,
  forecastView
) {
  const suggestionsContainer = document.querySelector(".suggestions");
  const favouritesContainer = document.querySelector(".favs__ul--another");
  const favouritesDropdown = document.querySelector(".lil__favs--container");
  const bigFavouritesContainer = document.querySelector(".favs__ul");

  // Generating new forecast for the suggested city when is is clicked
  suggestionsContainer.addEventListener("click", async (event) => {
    if (event.target.tagName === "LI") {
      try {
        const inputCity = event.target.textContent.split(",")[0];
        const newCity = inputCity.slice(5);
        await newForecastGeneration(newCity);
      } catch (error) {
        console.error("Async function error:", error);
        errorHandler.dropdownError();
      }
    }
  });

  // Generating new forecast when a favourite city in favourites dropdown is clicked and closind the dropdown after
  favouritesContainer.addEventListener("click", async (event) => {
    if (event.target.tagName === "LI") {
      try {
        const inputCity = event.target.textContent.split(",")[0];
        const newCity = inputCity.slice(5);
        await newForecastGeneration(newCity);
        favouritesDropdown.classList.remove("active");
        favouritesContainer.classList.remove("active");
      } catch (error) {
        console.error("Async function error:", error);
      }
    }
  });

  // Generating new forecast when a favourite city in favourites ul is clicked or deleting a city from favourites when a cross is clicked
  bigFavouritesContainer.addEventListener("click", async (event) => {
    try {
      const buttonClicked =
        event.target.classList.contains("new_button") ||
        event.target.closest(".new_button");

      if (!buttonClicked) {
        const favsItem = event.target.closest(".favs-item");
        if (favsItem) {
          const inputCityElement = favsItem.querySelector(".favs-item--city");
          const inputCity = inputCityElement.textContent;
          await newForecastGeneration(inputCity);
        }
      }
      if (buttonClicked) {
        const favsItem = event.target.closest(".favs-item");
        const inputCityElement = favsItem.querySelector(".favs-item--city");
        const inputCity = inputCityElement.textContent;

        forecastView.removeFromFavorites(inputCity);
      }
    } catch (error) {
      console.error("Async function error:", error);
    }
  });
};
