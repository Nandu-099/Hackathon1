let Rate1 = document.querySelector(".Rate1");
let Rate2 = document.querySelector(".Rate2");
let resultB = document.querySelector(".Result");
let selects = document.querySelectorAll(".Options select");
let sel1 = selects[0];
let sel2 = selects[1];
let inputs = document.querySelectorAll(".input input");
let inpt1 = inputs[0];
let inpt2 = inputs[1];
let rates = {}
let requestURL = "https://api.exchangerate.host/lates?=USD";
fetchRates();
async function fetchRates(){
    let res = await fetch(requestURL);
    res = await res.json();
    rates = res.rates;
    pOptions();
} 
function pOptions(){
    let val = "";
    Object.keys(rates).forEach((code) => {
        let str = `<Options value="${code}">${code}</Options>`;
        val += str;
    }); 
    selects.forEach((s)=(s.innerHTML = val));
} 
function convert(val, fromcurr, tocurr){
    let v = (val/rates[fromcurr]) * rates[tocurr];
    let v1 = v.toFixed(3);
    return v1= 0.0 ? v.toFixed(5) : v1;
}
function displayRate(){
    let v1 = sel1.value;
    let v2 = sel2.value;
    let val = convert(1, v1, v2);
    Rate1.innerHTML =  `1 ${v1} equals`;
    Rate2.innerHTML = '${val} ${val2}';
}
resultB.addEventListener("click", ( ) => {
   let fromcurr = sel1.value;
   let fromval = parseFloat(inpt1.value);
   let tocurr = sel2.value;
   if(isNaN(fromval)){
    alert("Enter a Number");
   } 
   else{
    let cVal = convert(fromval, fromcurr, tocurr);
    inpt2.value = cVal;
   }
});
selects.forEach(s=s.addEventListener("change", displayRate));
document.querySelector(".swap").addEventListener("click", ()=>{
    let in1 = inpr1.value;
    let in2 = inpt2.value;
    let op1 = sel1.value;
    let op2 = sel2.value;
    inpt2.value = in1;
    inpt1.value = in2;
    sel2.value = op1;
    sel1.value = op2;
    displayRate(); 
    
})