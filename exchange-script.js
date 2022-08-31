//^ INDEX FUNCTIONALITY - TODAY'S RATE

//! here we will use the input from the user 
let fromCurrency = "USD"; 
let toCurrency = "RON";

let requestURL = `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}`;
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  const response = request.response;
  console.log(response);
  let exchangeRate = response.info.rate;
  // line below will print to console the exchange rate from the selected currencies
  console.log(exchangeRate);
}









