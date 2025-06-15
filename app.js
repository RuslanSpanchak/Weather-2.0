const apiKey = "ab3d6372fb200cbbd79971edcd62ddbe"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchInput = document.querySelector(".weather_input")
const searchBtn = document.querySelector(".weather_search")
const adviceBtn = document.querySelector(".advice_btn")

async function checkWeather(city) {
	const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
	const data = await response.json()

	if (!response.ok) {
		showError()
		return
	} else {
		document.querySelector(".weather_city").innerHTML = data.name
		document.querySelector(".weather_temperature").innerHTML = Math.round(data.main.temp) + "°c"
		document.querySelector(".weather-feels-like").innerHTML = data.main.feels_like + "°c"
		document.querySelector(".weather-wind-speed").innerHTML = data.wind.speed + "km/h"
		document.querySelector(".weather-humidity").innerHTML = data.main.humidity + "%"
		document.querySelector(".weather-pressure").innerHTML = data.main.pressure + "mm"
		document.querySelector(".weather_error").style.display = "none"

		if (data.weather[0].main === "Clear") {
			document.querySelector(".weather_icon").src = "sun.png"
			document.querySelector(".weather_icon").style.width = "175px"
			document.querySelector(".weather_icon").style.height = "175px"
			document.querySelector(".weather").style.background = "linear-gradient(to top right, #f9d423, #ff4e50)"
		} else if (data.weather[0].main === "Clouds") {
			document.querySelector(".weather_icon").src = "cloudy.png"
			document.querySelector(".weather_icon").style.width = "128px"
			document.querySelector(".weather_icon").style.height = "128px"
			document.querySelector(".weather").style.background = "linear-gradient(to bottom, #789ec7, #c9d6e3)"
		} else if (data.weather[0].main === "Rain") {
			document.querySelector(".weather_icon").src = "rainy.png"
			document.querySelector(".weather_icon").style.width = "128px"
			document.querySelector(".weather_icon").style.height = "128px"
			document.querySelector(".weather").style.background = "linear-gradient(to bottom, #2c3e50, #4ca1af)"
		} else if (data.weather[0].main === "Drizzle") {
			document.querySelector(".weather_icon").src = "drizzle.png"
			document.querySelector(".weather_icon").style.width = "128px"
			document.querySelector(".weather_icon").style.height = "128px"
			document.querySelector(".weather").style.background = "linear-gradient(to bottom, #cfd9df, #e2ebf0)"
		} else if (data.weather[0].main === "Mist") {
			document.querySelector(".weather_icon").src = "mist.png"
			document.querySelector(".weather_icon").style.width = "128px"
			document.querySelector(".weather_icon").style.height = "128px"
			document.querySelector(".weather").style.background = "linear-gradient(to top, #aeb5bd, #d4d9df, #f0f3f7)"
		}

		const weatherAdviceTimeout = setTimeout(() => {
			weatherAdvice(data.main.temp)
		}, 1500)

		searchInput.value = ""
	}
}

searchBtn.addEventListener("click", () => {
	if (searchInput.value.length === 0 || searchInput.value.trim().length === 0) {
		return
	} else {
		checkWeather(searchInput.value)
		showWeatherLayout()
	}
})

document.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		if (searchInput.value.length === 0 || searchInput.value.trim().length === 0) {
			return
		} else {
			checkWeather(searchInput.value)
			showWeatherLayout()
		}
	}
})

adviceBtn.addEventListener("click", () => {
	document.querySelector(".advice").style.display = "none"
	document.querySelector(".advice").classList.remove("show")
})

function showWeatherLayout() {
	document.querySelector(".weather").style.height = "550px"

	const icon = document.querySelector(".weather_icon")
	const temp = document.querySelector(".weather_temperature_inner")
	const footer = document.querySelector(".weather_footer")

	icon.style.display = "block"
	temp.style.display = "flex"
	footer.style.display = "flex"

	setTimeout(() => {
		icon.classList.add("show")
		temp.classList.add("show")
		footer.classList.add("show")
	}, 50)
}

function showError() {
	document.querySelector(".weather_error").style.display = "block"
	document.querySelector(".weather_icon").style.display = "none"
	document.querySelector(".weather_temperature_inner").style.display = "none"
	document.querySelector(".weather_footer").style.display = "none"
	document.querySelector(".weather").style.height = "auto"
	document.querySelector(".weather").style.background = "linear-gradient(135deg, #89f7fe, #66a6ff)"
	document.querySelector(".advice").style.display = "none"
	document.querySelector(".advice").classList.remove("show")
}

function weatherAdvice(temp) {
	if (temp <= -10) {
		document.querySelector(".advice_text").textContent = "🥶 Дуже холодно! Одягай кілька шарів курток, шапку та рукавиці. Краще залишитися вдома."
		document.querySelector(".advice").style.height = "300px"
	} else if (temp <= 0) {
		document.querySelector(".advice_text").textContent = "❄️ Морозець. Одягни теплу куртку, шапку і шарф."
		document.querySelector(".advice").style.height = "250px"
	} else if (temp <= 10) {
		document.querySelector(".advice_text").textContent = "🧥 Прохолодно. Легка куртка або светр буде саме те."
		document.querySelector(".advice").style.height = "250px"
	} else if (temp <= 18) {
		document.querySelector(".advice_text").textContent = "🌤️ Помірна погода. Можна прогулятись у парку в худі або легкій курточці."
		document.querySelector(".advice").style.height = "275px"
	} else if (temp <= 25) {
		document.querySelector(".advice_text").textContent = "😎 Тепло. Чудова погода для прогулянки або відвідування тераси кафе."
		document.querySelector(".advice").style.height = "275px"
	} else if (temp <= 30) {
		document.querySelector(".advice_text").textContent = "☀️ Спекотно. Одягай легкий одяг і не забудь про воду та сонцезахисні окуляри."
		document.querySelector(".advice").style.height = "275px"
	} else {
		document.querySelector(".advice_text").textContent = "🔥 Дуже спекотно! Уникай активностей на сонці, пий більше води, шукай тінь."
		document.querySelector(".advice").style.height = "275px"
	}

	document.querySelector(".advice").style.display = "flex"
	setTimeout(() => {
		document.querySelector(".advice").classList.add("show")
	}, 50)
}

window.addEventListener("load", () => {
	const weatherBlock = document.querySelector(".weather")

	setTimeout(() => {
		weatherBlock.classList.add("loaded")
	}, 50)
})