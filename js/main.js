// js/main.js — the logic lives here, it imports the data from data.js

import { places } from "./data.js";

const list = document.getElementById("placesList");

for (const place of places) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h2>${place.name}</h2>
    <p><b>City:</b> ${place.city}</p>
    <p><b>Type:</b> ${place.type}</p>
    <p><b>Built:</b> ${place.year}</p>`;
  list.appendChild(card);
}

document.getElementById("count").textContent = places.length + " places loaded from data.js";
