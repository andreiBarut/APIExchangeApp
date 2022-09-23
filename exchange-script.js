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
	const fromCurrency = document.getElementById("from-currency").value;
	console.log(fromCurrency);
	const toCurrency = document.getElementById("to-currency").value;
	console.log(toCurrency);
	const startDate = document.getElementById("start-date").value;
	console.log(startDate);
	const endDate = document.getElementById("end-date").value;
	console.log(endDate);
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

//! 1. Make historical dates look better

//! 1.1.

//! 2. AFTER THIS, make sepparate scripts and learn how to import them into different html pages. So index would have this exchange script up until the time series / historical dates js code. And the historicalDates.html would have a different script

//! 3. ALSO, change the name from historical dates to something else, because historical dates resembles another API call. Make sure the new name is something easy to understand.

//! 4. MAYBE, there is a need for async programming. Look into that. For example, we might need to import the hamburger menu script into each one, run that one first, and only after that run the request functions, and after them, we run the functionality per say, so three stages??
