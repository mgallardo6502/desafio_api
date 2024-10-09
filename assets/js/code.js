// https://mindicador.cl/api/{tipo_indicador}
// uf, ivp, dolar, dolar_intercambio, euro, ipc, utm, imacec, tpm, libra_cobre, tasa_desempleo, bitcoin

const clpValue = document.getElementById("clpInput").value
const currencySelect = document.getElementById("currency").value
const btnConvert = document.getElementById("convert")
const resultSpan = document.getElementById("result")
const apiURL = "https://mindicador.cl/api/"

async function getCurrency() {
  try {
    const res = await fetch(apiURL)
    const currencyData = await res.json()
  } catch(err) {
    alert("Bruh")
  }
}

getCurrency()