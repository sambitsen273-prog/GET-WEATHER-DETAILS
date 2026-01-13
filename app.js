let btn=document.querySelector("button");
let inp=document.querySelector("input");
let p=document.querySelector("p");
let list=document.querySelector("ul");
btn.addEventListener("click",async () =>{
    let place =document.querySelector("input").value;
    if(place===""){
        p.innerText="";
        list.innerText="";
        document.body.style.backgroundColor="";
    }
    else{
        const bgUrl = `https://loremflickr.com/1600/900/${place}`;
        document.body.style.backgroundImage = `url('${bgUrl}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        p.innerText="Loading...";
        let res= await getWeather(place);
        inp.value="";
    }
});
async function getWeather(place) {
    list.innerText="";
    // 🌍 Geocoding API
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${place}&count=1`;
    const geoRes = await fetch(geoURL);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
        p.innerHTML="<b><span>Location not found</span></b>";
        document.body.style.backgroundColor="rgba(0,0,0,0.5)";
        setTimeout(() => {
            document.body.style.backgroundColor = "";
            p.innerHTML="<b><span>Enter a Valid Place Name.</span></b>";
        }, 3000);
        document.body.style.backgroundImage="url(https://w0.peakpx.com/wallpaper/159/982/HD-wallpaper-weather-colors-art-fantasy-3d-colors-rainbow-abstract-weather.jpg)"
        return;
    }

    const { latitude, longitude } = geoData.results[0];

    // 🌦️ Weather API (ONLY current)
    const weatherURL = `https://api.open-meteo.com/v1/forecast?
    latitude=${latitude}&longitude=${longitude}
    &current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,
    wind_speed_10m,wind_direction_10m,wind_gusts_10m,
    precipitation,rain,showers,snowfall,
    weather_code,cloud_cover,pressure_msl,surface_pressure
    &timezone=auto`.replace(/\s+/g, "");

    const res = await fetch(weatherURL);
    const data = await res.json();
    document.body.style.backgroundColor="rgba(0,0,0,0.5)";
    p.innerHTML=`<b><span>🔹 CURRENT WEATHER of ${place}.</span></b>`;
    // 🌡 Temperature values
    let Ctemp = "Temperature: " + data.current.temperature_2m + " °C";
    let li=document.createElement("li");
    li.innerHTML = `<span><b>${Ctemp}</b></span>`;
    list.appendChild(li);
    let Flike = "Feels Like: " + data.current.apparent_temperature + " °C";
    li=document.createElement("li");
    li.innerHTML = `<span><b>${Flike}</b></span>`;
    list.appendChild(li);
    // 💧 Humidity & Day/Night
    let Humidity = "Humidity: " + data.current.relative_humidity_2m + " %";
    li=document.createElement("li");
    li.innerHTML = `<span><b>${Humidity}</b></span>`;
    list.appendChild(li);
    let IsDay = "Day Time: " + (data.current.is_day ? "Yes" : "No");
    li=document.createElement("li");
    li.innerHTML = `<span><b>${IsDay}</b></span>`;
    list.appendChild(li);

    // 🌬 Wind details
    let WindSpeed = "Wind Speed: " + data.current.wind_speed_10m + " km/h";
    li=document.createElement("li");
    li.innerHTML = `<span><b>${WindSpeed}</b></span>`;
    list.appendChild(li);
    let WindDirection = "Wind Direction: " + data.current.wind_direction_10m + " °";
    li=document.createElement("li");
    li.innerHTML = `<span><b>${WindDirection}</b></span>`;
    list.appendChild(li);
    let WindGusts = "Wind Gusts: " + data.current.wind_gusts_10m + " km/h";
    li=document.createElement("li");
    li.innerHTML = `<span><b>${WindGusts}</b></span>`;
    list.appendChild(li);

    // 🌧 Precipitation
    let Precipitation = "Precipitation: " + data.current.precipitation + " mm";
    li=document.createElement("li");
    li.innerHTML = `<span><b>${Precipitation}</b></span>`;
    list.appendChild(li);
    let Rain = "Rain: " + data.current.rain + " mm";
    li=document.createElement("li");
    li.innerHTML = `<span><b>${Rain}</b></span>`;
    list.appendChild(li);
    let Showers = "Showers: " + data.current.showers + " mm";
    li=document.createElement("li");
    li.innerHTML = `<span><b>${Showers}</b></span>`;
    list.appendChild(li);
    let Snowfall = "Snowfall: " + data.current.snowfall + " cm";
    li=document.createElement("li");
    li.innerHTML = `<span><b>${Snowfall}</b></span>`;
    list.appendChild(li);

    // ☁ Weather conditions
    let WeatherCode = "Weather Code: " + data.current.weather_code;
    li=document.createElement("li");
    li.innerHTML = `<span><b>${WeatherCode}</b></span>`;
    list.appendChild(li);
    let CloudCover = "Cloud Cover: " + data.current.cloud_cover + " %";
    li=document.createElement("li");
    li.innerHTML = `<span><b>${CloudCover}</b></span>`;
    list.appendChild(li);

    // 🔽 Pressure
    let PressureMSL = "Pressure (MSL): " + data.current.pressure_msl + " hPa";
    li=document.createElement("li");
    li.innerHTML = `<span><b>${PressureMSL}</b></span>`;
    list.appendChild(li);
    let SurfacePressure = "Surface Pressure: " + data.current.surface_pressure + " hPa";
    li=document.createElement("li");
    li.innerHTML = `<span><b>${SurfacePressure}</b></span>`;
    list.appendChild(li);
}