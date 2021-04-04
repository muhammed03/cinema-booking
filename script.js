const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occpied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const clear = document.getElementById("clear");
const sumbit = document.getElementById("submit");

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const occupiedSeats = document.querySelectorAll(".row .seat.occupied");

  // Copy selected seats into arr
  // Map through array
  // return a new array indexes
  const seatsIndex = [...selectedSeats, ...occupiedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get Data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("occupied");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

function cleanCountsAndTotal() {
  count.innerText = 0;
  total.innerText = 0;
}

function cleanSession() {
  localStorage.clear();
  cleanCountsAndTotal();
  seats.forEach((seat) => {
    seat.classList.remove("selected");
    seat.classList.remove("occupied");
  });
}

function submitSession() {
  cleanCountsAndTotal();
  seats.forEach((seat) => {
    if (seat.classList.contains("selected")) {
      seat.classList.remove("selected");
      seat.classList.add("occupied");
    }
  });
}

clear.addEventListener("click", function () {
  cleanSession();
});

submit.addEventListener("click", function () {
  submitSession();
});

// Initial count and total set
updateSelectedCount();
