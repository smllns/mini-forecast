// function responsible for first window that asks user to turn on the location
export function firstWindow() {
  const modal = document.getElementById("geolocationModal");
  const closeButton = document.querySelector(".close");
  modal.style.display = "flex";
  // Closing on click
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}
