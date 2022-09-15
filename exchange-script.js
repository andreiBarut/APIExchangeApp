//^ INDEX FUNCTIONALITY (HOMEPAGE)- TODAY'S RATE

//^CURRENCY CONTAINER (this is after the convert functionality)

//! here we will use the input from the user
const currencyContainer = document.getElementById("currency-container");
const requestURL1 = `https://api.exchangerate.host/latest?base=RON`;
const request = new XMLHttpRequest();
request.open("GET", requestURL1);
request.responseType = "json";
request.send();

request.onload = function () {
	const response = request.response;
	console.log(response);
	console.log(response.rates);
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

	for (let i in request.response.rates) {
		console.log(i);
		let dataList = document.getElementById("currencyList-2");
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
	console.log(amount);
	const fromCurrency = document.getElementById("from-currency").value;
	console.log(fromCurrency);
	const toCurrency = document.getElementById("to-currency").value;
	console.log(toCurrency);
	const requestURL2 = `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;
	const request = new XMLHttpRequest();
	request.open("GET", requestURL2);
	request.responseType = "json";
	request.send();
	converted = true;
	request.onload = function () {
		const response = request.response;
		const amountFrom = (document.getElementById(
			"amount-from"
		).innerText = `${amount} ${fromCurrency}`);
		const conversionResult = (document.getElementById(
			"conversion-result"
		).innerText = `${response.result} ${toCurrency}`);
		console.log(conversionResult);
		//! MAKE AN IF STATEMENT, IF THE INPUT FIELDS ARE EMPTY, LET THE USER KNOW. MAYBE MAKE A SEPARATE FUNCTION TO BE CALLED HERE
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
	const startDate = document.getElementById("start-date").value;
	console.log(startDate);
	const endDate = document.getElementById("end-date").value;
	console.log(endDate);
	const table = document.getElementById("historical-table");
	const requestURL3 =
		"https://api.exchangerate.host/timeseries?start_date=2020-01-01&end_date=2020-01-04&base=USD&symbols=RON";
	const request = new XMLHttpRequest();
	request.open("GET", requestURL3);
	request.responseType = "json";
	request.send();
	request.onload = function () {
		const response = request.response;
		console.log(response.rates);
		let tr = document.createElement("tr");
		for (let i = 0; i < 3; i++) {
			let td = document.createElement("td");
			td.innerText = "something";
			tr.appendChild(td);
		}
		table.appendChild(tr);
	};
	//! IN PROGRESS
}
