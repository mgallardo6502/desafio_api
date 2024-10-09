// https://mindicador.cl/api/{tipo_indicador}
// uf, ivp, dolar, dolar_intercambio, euro, ipc, utm, imacec, tpm, libra_cobre, tasa_desempleo, bitcoin
const btnConvert = document.getElementById("convert");
const resultSpan = document.getElementById("result");
const apiURL = "https://mindicador.cl/api/";

btnConvert.addEventListener("click", function () {
  renderCurrency();
});

async function getCurrency(currency) {
  try {
    const res = await fetch(apiURL + currency);
    const currencyData = await res.json();
    return currencyData.serie[0].valor
  } catch (err) {
    alert(err.message);
  }
}

async function renderCurrency() {
  const clpValue = document.getElementById("clpInput").value;
  const currencyOption = document.getElementById("currency").value;
  const todayValue = await getCurrency(currencyOption);
  if (clpValue <= 0) {
    resultSpan.innerHTML = "El número ingresado debe ser mayor a 0";
  } else if (clpValue > 0) {
    const exchangeRate = 1 / todayValue
    resultSpan.innerHTML = `Resultado: ${clpValue * exchangeRate}`
  } else {
    resultSpan.innerHTML = "Debes ingresar un número"
  }
}
