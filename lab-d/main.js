const WeatherApp = class {
  constructor(apiKey, currentBlockSelector, resultsBlockSelector) {
    this.apiKey = apiKey;
    this.currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q={query}&appid=${this.apiKey}&units=metric&lang=pl`;
    this.currentForecastURL = `https://api.openweathermap.org/data/2.5/forecast?q={query}&appid=${this.apiKey}&units=metric&lang=pl`;

    this.currentWeather = undefined;
    this.currentForecast = undefined;

    this.currentBlock = document.querySelector(currentBlockSelector);
    this.resultsBlock = document.querySelector(resultsBlockSelector);
  }

  getCurrentWeather(query) {
    let url = this.currentWeatherURL.replace('{query}', query);
    let req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.addEventListener('load', () => {
      this.currentWeather = JSON.parse(req.responseText);
      console.log('XMLHttpRequest:', this.currentWeather);
      this.drawWeather();
    });
    req.send();
  }

  getForecast(query) {
    let url = this.currentForecastURL.replace('{query}', query);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('Fetch:', data);
        this.currentForecast = data.list;
        this.drawWeather();
      });
  }

  getWeather(query) {
    this.getCurrentWeather(query);
    this.getForecast(query);
  }

  drawWeather() {
    this.currentBlock.innerHTML = '';
    this.resultsBlock.innerHTML = '';

    if (this.currentWeather) {
      const date = new Date(this.currentWeather.dt * 1000);
      const dateTimeString = `${date.toLocaleDateString('pl-PL')} ${date.toLocaleTimeString('pl-PL')}`;

      const temperature = this.currentWeather.main.temp;
      const feelsLikeTemperature = this.currentWeather.main.feels_like;
      const iconName = this.currentWeather.weather[0].icon;
      const description = this.currentWeather.weather[0].description;

      const weatherBlock = this.createWeatherBlock(
        dateTimeString,
        temperature,
        feelsLikeTemperature,
        iconName,
        description
      );

      this.currentBlock.appendChild(weatherBlock);
    }

    if (this.currentForecast && this.currentForecast.length > 0) {
      for (let i = 0; i < this.currentForecast.length; i++) {
        let weather = this.currentForecast[i];
        const date = new Date(weather.dt * 1000);
        const dateTimeString = `${date.toLocaleDateString('pl-PL')} ${date.toLocaleTimeString('pl-PL')}`;

        const temperature = weather.main.temp;
        const feelsLikeTemperature = weather.main.feels_like;
        const iconName = weather.weather[0].icon;
        const description = weather.weather[0].description;

        const weatherBlock = this.createWeatherBlock(
          dateTimeString,
          temperature,
          feelsLikeTemperature,
          iconName,
          description
        );
        this.resultsBlock.appendChild(weatherBlock);
      }
    }
  }

  createWeatherBlock(dateString, temperature, feelsLikeTemperature, iconName, description) {
    const weatherBlock = document.createElement('div');
    weatherBlock.className = 'weather-block';

    const dateBlock = document.createElement('div');
    dateBlock.className = 'weather-date';
    dateBlock.innerText = dateString;

    const temperatureBlock = document.createElement('div');
    temperatureBlock.className = 'weather-temperature';
    temperatureBlock.innerHTML = `${temperature} &deg;C`;

    const feelsLikeBlock = document.createElement('div');
    feelsLikeBlock.className = 'weather-temperature-feels-like';
    feelsLikeBlock.innerHTML = `Odczuwalna: ${feelsLikeTemperature} &deg;C`;

    const weatherIcon = document.createElement('img');
    weatherIcon.className = 'weather-icon';
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconName}@2x.png`;

    const weatherDescription = document.createElement('div');
    weatherDescription.className = 'weather-description';
    weatherDescription.innerText = description;

    weatherBlock.appendChild(dateBlock);
    weatherBlock.appendChild(temperatureBlock);
    weatherBlock.appendChild(feelsLikeBlock);
    weatherBlock.appendChild(weatherIcon);
    weatherBlock.appendChild(weatherDescription);

    return weatherBlock;
  }
};

window.addEventListener('load', () => {
  const app = new WeatherApp('7ded80d91f2b280ec979100cc8bbba94', '#weather-current', '#weather-results-container');

  document.querySelector('#checkButton').addEventListener('click', () => {
    const query = document.querySelector('#locationInput').value;
    if (!query) {
      alert('Wprowadź nazwę miasta!');
      return;
    }

    app.getWeather(query);
  });
});
