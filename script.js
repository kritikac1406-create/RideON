import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

/* ================= SUPABASE ================= */

const supabaseUrl = "https://ecuvhnvpajodymdibuwt.supabase.co";
const supabaseKey =   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjdXZobnZwYWpvZHltZGlidXd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MjA0ODcsImV4cCI6MjA4NTQ5NjQ4N30.qJclkXxnYjPu7vSZD4MGyJch6n4pCjcd9HiD8hdM31g"
;

const supabase = createClient(supabaseUrl, supabaseKey);

/* ================= GENERIC LOADER ================= */

async function loadCarsByCategory(containerId, category) {
  const container = document.getElementById(containerId);
  if (!container) return; // Prevent errors on other pages

  const { data: cars, error } = await supabase
    .from("cars")
    .select("*")
    .eq("category", category);

  if (error) {
    console.error("Error loading cars:", error);
    return;
  }

  container.innerHTML = "";

  cars.forEach(car => {
    const card = document.createElement("div");

    card.className = "car-card bg-white rounded-xl shadow border overflow-hidden";

    /* 🔥 CRITICAL: DATA ATTRIBUTES FOR FILTERS */
    card.setAttribute("data-name", car.name);
    card.setAttribute("data-brand", car.brand);
    card.setAttribute("data-price", Number(car.rent_per_hour));
    card.setAttribute("data-fuel", car.fuel_type);
    card.setAttribute("data-transmission", car.transmission);

    card.innerHTML = `
      <img src="${car.image_url}" class="w-full h-56 object-cover">
      <div class="p-4">
        <h3 class="text-xl font-bold">${car.name}</h3>
        <p class="text-gray-600 mb-2">₹${car.rent_per_hour} / hour</p>
        <p class="text-sm text-gray-500">${car.fuel_type} | ${car.transmission}</p>
        <button class="mt-3 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          onclick="selectCar('${car.id}')">
          Book Now
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  /* 🔥 APPLY FILTERS AFTER LOADING */
  if (window.applyFilters) {
    window.applyFilters();
  }
}

/* ================= PAGE-SAFE LOADING ================= */

document.addEventListener("DOMContentLoaded", () => {

  if (document.getElementById("economyCars")) {
    loadCarsByCategory("economyCars", "economy");
  }

  if (document.getElementById("luxuryCars")) {
    loadCarsByCategory("luxuryCars", "luxury");
  }

  if (document.getElementById("electricCars")) {
    loadCarsByCategory("electricCars", "electric");
  }

});

window.selectCar = function (carId) {

  const pickupDate = document.getElementById("filterPickupDate").value;
  const dropDate = document.getElementById("filterDropDate").value;

  // Optional safety check
  if (!pickupDate || !dropDate) {
    alert("Please select pickup and drop dates first");
    return;
  }

  localStorage.setItem("pickupDate", pickupDate);
  localStorage.setItem("dropDate", dropDate);

  localStorage.setItem("selectedCarId", carId);

  window.location.href = "booking.html";
};
