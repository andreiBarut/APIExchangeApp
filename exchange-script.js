//^ INDEX FUNCTIONALITY - TODAY'S RATE

//! here we will use the input from the user 
const currencyContainer = document.getElementById("currency-container");
const requestURL1 = `https://api.exchangerate.host/latest?base=RON`;
const request = new XMLHttpRequest();
request.open('GET', requestURL1);
request.responseType = 'json';
request.send();

request.onload = function() {
  const response = request.response;
  console.log(response);
  console.log(response.rates);
  for (const [key, value] of Object.entries(response.rates)) {
    let p = document.createElement("p");
    p.innerText = `${key} : ${value}`;
    currencyContainer.appendChild(p);
    
  }
}











