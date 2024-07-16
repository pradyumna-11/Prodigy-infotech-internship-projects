let cityInputEl = document.getElementById("cityInput");
let tempEl = document.getElementById("temparature");
let cityEl = document.getElementById("city");
let humidityResultEl = document.getElementById("humidityResult");
let windSpeedResultEl = document.getElementById("windSpeedResult");
let imageEl = document.getElementById("resultImg");
let retryButtonEl = document.getElementById("retryButton");
let notFoundContainerEl = document.getElementById("bg2");
let mainBg = document.getElementById("bg1");

let makeApiCall = async () => {
    let apiKey = "ff2922d408c84c54b44026ffa11781c2";
    let city = cityInputEl.value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    if (data.cod === 200) {
        let {
            main,
            name,
            weather,
            wind
        } = data;
        let {
            temp,
            humidity
        } = main;
        let {
            speed
        } = wind;
        console.log(weather);
        tempEl.textContent = Math.round(temp) + '°C';
        cityEl.textContent = name;
        humidityResultEl.textContent = humidity + '%';
        windSpeedResultEl.textContent = speed + 'km/h';
        cityInputEl.value = '';
        if (weather[0].main === 'Clouds') {
            imageEl.src = 'https://res.cloudinary.com/daxizvsge/image/upload/v1713090333/clouds_sdj3yk.png';
        }
        if (weather[0].main === 'Clear') {
            imageEl.src = 'https://res.cloudinary.com/daxizvsge/image/upload/v1713090333/clear_jmmcav.png';
        }
        if (weather[0].main === 'Rain') {
            imageEl.src = 'https://res.cloudinary.com/daxizvsge/image/upload/v1713090334/rain_hclwaz.png';
        }
        if (weather[0].main === 'Drizzle' || weather[0].main === 'Haze') {
            imageEl.src = 'https://res.cloudinary.com/daxizvsge/image/upload/v1713090334/drizzle_eq0zte.png';
        }
        if (weather[0].main === 'Mist') {
            imageEl.src = 'https://res.cloudinary.com/daxizvsge/image/upload/v1713090334/mist_ccedzu.png';
        }
        if (weather[0].main === 'Snow') {
            imageEl.src = 'https://res.cloudinary.com/daxizvsge/image/upload/v1713090335/snow_osp1ma.png';
        }
    } else {
        notFoundContainerEl.style.display = 'flex';
        mainBg.style.display = 'none';
    }

};

let searchWeather = function() {
    if (cityInputEl.value === '') {
        alert("Please enter valid city name");
    } else {
        makeApiCall();
    }
};

retryButtonEl.onclick = function() {
    notFoundContainerEl.style.display = 'none';
    mainBg.style.display = 'flex';
}