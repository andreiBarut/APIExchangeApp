//^ INDEX FUNCTIONALITY - TODAY'S RATE

//^CURRENCY CONTAINER (this is after the convert functionality)

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


  //!DOES NOT WORK - TRIED TO TRIGGER CONVERSION ON PRESSING ENTER KEY
  // let toCurrencyForTriggerButton = document.getElementById("to-currency");
  // toCurrencyForTriggerButton.addEventListener("keypress", function(e) {
  //   if (e.key == "Enter") {
  //     document.getElementById("convert-img").click();
  //   }
  // })

  // if (toCurrency.value == "enter"){
  //   console.log('asfdjha')
  // }
  
  const requestURL2 = `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;
  const request = new XMLHttpRequest();
  request.open('GET', requestURL2);
  request.responseType = 'json';
  request.send();
  converted = true;
  request.onload = function() {
    const response = request.response;
    const amountFrom = document.getElementById("amount-from").innerText = `${amount} ${fromCurrency}`;
    const conversionResult = document.getElementById("conversion-result").innerText = `${response.result} ${toCurrency}`;
    console.log(conversionResult);
    //! MAKE AN IF STATEMENT, IF THE INPUT FIELDS ARE EMPTY, LET THE USER KNOW. MAYBE MAKE A SEPARATE FUNCTION TO BE CALLED HERE
    if (converted == true) {
      if (hiddenArrow.style.display = "hidden") {
        hiddenArrow.style.display = "block";
      }
    }
  }  
}














