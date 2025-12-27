const BASE_URL =
 "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";
const dropdrown = document.querySelectorAll(".dropdown select");
 const fromCurr = document.querySelector(".from select") //"usd"; // your base currency
const toCurr = document.querySelector(".to select"); //"inr";   // your target currency

const btn=document.querySelector("form button");
for(let select of dropdrown){
    for( let currecnyCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currecnyCode;
        newOption.value=currecnyCode;
        if(select.name === "from" && currecnyCode === "USD"){
            newOption.selected="selected";
        }else if(select.name === "to" && currecnyCode === "INR"){
            newOption.selected= "selected";

        }
        select.append(newOption);
}
select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
});
}

const updateFlag = (element)=>{
    let currencyCode = element.value;
    // console.log(currCode);
    let countryCode = countryList[currencyCode];
    // console.log(countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
    
}
btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountVal=amount.value;
   if(amountVal === "" || amount < 1){
    amountVal=1;
    amount.value='1';
   }
   let fromCurrency=fromCurr.value.toLowerCase();
   let toCurrency=toCurr.value.toLowerCase();
   let url = `${BASE_URL}/currencies/${fromCurrency}.json`;   
//    console.log(fromCurr.value); 
   let response = await fetch(url)
  let data= await response.json()
    let rate = data[fromCurrency][toCurrency]; 
    finalAmount=rate*amountVal;
    // amount.value=finalAmount;
   const msg = document.querySelector(".msg");
    msg.innerText= `${amountVal} ${fromCurrency.toUpperCase()} = ${finalAmount} ${toCurrency.toUpperCase()}`;
   
})
