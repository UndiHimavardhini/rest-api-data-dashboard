const dashboard = document.getElementById("dashboard");
const errorBox = document.getElementById("error");
const input = document.getElementById("countryInput");

async function loadCountry() {
  const country = input.value.trim() || "india";
  dashboard.innerHTML = "Loading...";
  errorBox.classList.add("hidden");

  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    const c = data[0];

    dashboard.innerHTML = `
      <div class="card">
        <h3>Country</h3>
        <p>${c.name.common}</p>
        <p>${c.region} • ${c.subregion}</p>
      </div>

      <div class="card">
        <h3>Capital</h3>
        <p>${c.capital?.[0]}</p>
      </div>

      <div class="card">
        <h3>Population</h3>
        <p>${c.population.toLocaleString()}</p>
      </div>

      <div class="card">
        <h3>Currency</h3>
        <p>${Object.values(c.currencies)[0].name}</p>
      </div>

      <div class="card">
        <h3>Languages</h3>
        <p>${Object.values(c.languages).join(", ")}</p>
      </div>

      <div class="card">
        <h3>National Flag</h3>
        <img src="${c.flags.png}" alt="Flag">
      </div>
    `;
  } catch {
    errorBox.classList.remove("hidden");
    dashboard.innerHTML = "";
  }
}

loadCountry(); // loads India by default
