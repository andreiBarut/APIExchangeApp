//^ INDEX FUNCTIONALITY (HOMEPAGE)- TODAY'S RATE

//^CURRENCY CONTAINER (this is after the convert functionality in the page layout)

//! here we will use the input from the user
const currencyContainer = document.getElementById("currency-container");
const requestURL1 = `https://api.exchangerate.host/latest?base=RON`;
const request = new XMLHttpRequest();
request.open("GET", requestURL1);
request.responseType = "json";
request.send();

// set the datalist options according to API
request.onload = function () {
	const response = request.response;

	for (const [key, value] of Object.entries(response.rates)) {
		let p = document.createElement("p");
		p.innerText = `${key} : ${value}`;
		currencyContainer.appendChild(p);
	}

	for (let i in request.response.rates) {
		console.log(i);
		let dataList = document.getElementById("currencyList");
		let option = document.createElement("option");
		option.setAttribute("value", i);
		dataList.appendChild(option);
	}
};

//^ CONVERT FUNCTIONALITY

function resetFields() {
	location.reload();
}

function convert() {
	const hiddenArrow = document.getElementById("hidden-arrow");
	let converted = false;
	const amount = document.getElementById("amount").value;
	const fromCurrency = document.getElementById("from-currency").value;
	const toCurrency = document.getElementById("to-currency").value;
	const requestURL2 = `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;

	const request = new XMLHttpRequest();

	request.open("GET", requestURL2);
	request.responseType = "json";
	request.send();
	converted = true;
	request.onload = function () {
		const response = request.response;
		const conversionResult = (document.getElementById(
			"conversion-result"
		).innerText = `${response.result} ${toCurrency}`);
		console.log(conversionResult);
		if (converted) {
			if ((hiddenArrow.style.display = "hidden")) {
				hiddenArrow.style.display = "block";
			}
		}
	};
}

//^ HAMBURGER NAVBAR FUNCTIONALITY
const hamburger = document.getElementById("hamburger");
const navbar1 = document.getElementById("navbar-1");
const bars = document.getElementById("bars");
let clicked = 0;

hamburger.addEventListener("click", () => {
	navbar1.classList.toggle("show");
	clicked++;
	if (clicked % 2 != 0) {
		bars.style.transform = "rotate(90deg)";
	} else {
		bars.style.transform = "rotate(0deg)";
	}
});

//^HISTORICAL DATES FUNCTIONALITY

function getDates() {
	const fromCurrency = document.getElementById("from-currency").value;
	const toCurrency = document.getElementById("to-currency").value;
	const startDate = document.getElementById("start-date").value;
	const endDate = document.getElementById("end-date").value;

	const convertImg = document.getElementById("convert-img");
	convertImg.style.visibility = "hidden";

	const requestURL3 = `https://api.exchangerate.host/timeseries?start_date=${startDate}&end_date=${endDate}&base=${fromCurrency}&symbols=${toCurrency}`;

	const request = new XMLHttpRequest();

	request.open("GET", requestURL3);
	request.responseType = "json";
	request.send();
	request.onload = function () {
		const response = request.response.rates;
		function displayData() {
			let dateArr = [];
			console.log(response);
			for (let i in response) {
				dateArr.push(response[i]);
			}
			for (let j in dateArr) {
				let table = document.getElementById("historical-table");
				let valueCol = document.getElementById("value-col");
				valueCol.innerText = `1 ${fromCurrency} =`;
				let tr = document.createElement("tr");
				let td = document.createElement("td");
				let td2 = document.createElement("td");
				td.innerText = Object.keys(response)[j];
				td2.innerText = Object.values(dateArr[j]) + " " + toCurrency;
				tr.appendChild(td);
				tr.appendChild(td2);
				table.appendChild(tr);
				table.style.visibility = "visible";
			}
		}
		displayData();
	};
}

//! 2. AFTER THIS, make sepparate scripts and learn how to import them into different html pages. So index would have this exchange script up until the time series / historical dates js code. And the historicalDates.html would have a different script

//! 3. ALSO, change the name from historical dates to something else, because historical dates resembles another API call. Make sure the new name is something easy to understand.
