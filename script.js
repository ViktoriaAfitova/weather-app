let weather = {

    fetchWeather: function(city = "Minsk") {
        let appKey = '3d56f8644f5264299e9fda6e53b9a7da';
        const queryParams = {
            q: city,
            appid: appKey
        }
        let url = "https://api.openweathermap.org/data/2.5/forecast?" + new URLSearchParams(queryParams);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.cod == "200") {
                    document.querySelector('.message').hidden = true;
                    this.displayWeather(data);
                } else {
                    document.querySelector('.message').innerHTML = 'city not found';
                    document.querySelector('.message').hidden = false;
                }
            })
            .catch((error) => {
                return error.message;
            })
    },
    displayWeather: function(data) {
        const name = data.city.name;


// const {list} = data;
// console.log(list);
        const time = document.querySelector('.time');
        const day = document.querySelector('.day');
        const temperature = document.querySelector('.temperature');
        const weatherIcon = document.querySelector('.weather-icon');
        const weatherDescription = document.querySelector('.weather-description');
        const humidity = document.querySelector('.humidity');
        const speed = document.querySelector('.wind');

        function showTime() {
            const date = new Date();
            const currentTime = date.toLocaleTimeString();
            time.textContent = currentTime;
            setTimeout(showTime, 1000);
            showDate();
        }
        showTime();

        function showDate() {
            const date = new Date();
            const options = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
            const currentDate = date.toLocaleDateString('en', options);
            day.textContent = currentDate;
        }

        document.querySelector('.city').innerText = 'Weather in ' + name;
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.list[0].weather[0].id}`);
        weatherDescription.textContent = data.list[0].weather[0].description;
        speed.textContent = 'Wind: ' + data.list[0].wind.speed + ' kph';
        temperature.textContent = Math.round(data.list[0].main.temp - 273) + '°' + 'C';
        humidity.innerHTML = 'Humidity: ' + data.list[0].main.humidity + ' %';

        document.querySelector('.weather').classList.remove('loading');

        function getLinkToImage() {
            const url = 'https://api.unsplash.com/photos/random?query=morning&client_id=aUHA9v-u6K-IJNzT-8JMSp1odPVZYBQe5JbJ7cbKMdw';
            fetch(url)
              .then(res => res.json())
              .then(data => {
                console.log(data.urls.regular)
                document.body.style.backgroundImage = `url(${data.urls.regular})`;
            });
            }
        getLinkToImage();
    },
    search: function() {
        this.fetchWeather(document.querySelector('.search-bar').value);
    }

}

document.querySelector('.search button').addEventListener('click', function() {
    weather.search();
})

document.querySelector('.search-bar').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        weather.search();
    }
})

// weather.fetchWeather();

setTimeout(() => {
}, 10000);


















