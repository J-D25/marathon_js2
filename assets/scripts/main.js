/* Worldtime */
fetch("http://worldtimeapi.org/api/ip").then((response) => response.json().then((worldtime) => {
    if (worldtime) {
        /* Converting UNIX to time */
        let unixTimestamp = worldtime.unixtime
        // JavaScript works in milliseconds, convert time into milliseconds by multiplying it by 1000.
        let date = new Date(unixTimestamp * 1000);
        // Hours part from the timestamp
        let hours = date.getHours();
        // Minutes part from the timestamp
        let minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = "0" + date.getMinutes();
        }
        // Will display time in 11:10 format
        let formatTime = hours + ':' + minutes;
        /* End converting UNIX to time */

        // Greetings
        let greetings = 'good ';
        if (hours >= 5 && hours <= 11) {
            greetings += 'morning';
        } else if (hours >= 12 && hours <= 17) {
            greetings += 'afternoon';
        } else {
            greetings += 'evening';
        }

        const greeting = document.getElementById('greeting');
        const currentHour = document.getElementById('currently_hour');
        const abbreviation = document.getElementById('abbreviation');
        const currentTimezone = document.getElementById('current_timezone_span');
        const dayYear = document.getElementById('day_of_the_year_span');
        const dayWeek = document.getElementById('day_of_the_week_span');
        const weekNumber = document.getElementById('week_number_span');

        greeting.textContent = greetings;
        currentHour.textContent = formatTime;
        abbreviation.textContent = worldtime.abbreviation;
        currentTimezone.textContent = worldtime.timezone;
        dayYear.textContent = worldtime.day_of_year;
        dayWeek.textContent = worldtime.day_of_week;
        weekNumber.textContent = worldtime.week_number;
    }
}));

/* Citation */
function getQuote() {
    fetch("https://api.quotable.io/random").then((response) => response.json().then((quote) => {
        if (quote.content) {
            document.getElementById('quote_citation').textContent = `“` + quote.content + `”`;
        }
        if (quote.author) {
            document.getElementById('quote_author').textContent = quote.author;
        }
    }));
}
getQuote(); // Lancement au chargement du script
const quoteRefresh = document.getElementById("quote_refresh");
quoteRefresh.addEventListener("click", (e) => {
    getQuote(); // Lancement au clic sur le bouton
})

fetch("http://ip-api.com/json/").then((response) => response.json().then((geo) =>{
///////// Insertion auto si les élements SPAN avec les ID existent dans le HTML
    // document.getElementById('city').textContent = geo.city+", ";
    // document.getElementById('country').textContent = geo.countryCode;
/////////

///////// Création et insertion des éléments SPAN dans l'HTML
    let inCity = document.getElementById("in");
    let mainContent = document.getElementById("main_content");

    const city_span = document.createElement("SPAN");
    let city_spanContent = document.createTextNode(geo.city+", ");
    city_span.appendChild(city_spanContent);
    city_span.setAttribute("id", "city");
    mainContent.insertBefore(city_span, inCity.nextSibling);

    const country_span = document.createElement("SPAN");
    let country_spanContent = document.createTextNode(geo.countryCode);
    country_span.appendChild(country_spanContent);
    country_span.setAttribute("id", "country");
    mainContent.insertBefore(country_span, city_span.nextSibling);
/////////
}));