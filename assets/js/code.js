// https://mindicador.cl/api/{tipo_indicador}
// uf, ivp, dolar, dolar_intercambio, euro, ipc, utm, imacec, tpm, libra_cobre, tasa_desempleo, bitcoin
const btnConvert = document.getElementById("convert");
const resultSpan = document.getElementById("result");
const apiURL = "https://mindicador.cl/api/";
const myChart = document.getElementById("myChart");

btnConvert.addEventListener("click", async function () {
  const clpValue = document.getElementById("clpInput");
  const currencyOption = document.getElementById("currency");
  renderCurrency(clpValue, currencyOption);
  renderChart(currencyOption);
});

async function getCurrency(currency = "") {
  try {
    const res = await fetch(apiURL + currency);
    const currencyData = await res.json();
    return currencyData;
  } catch (err) {
    alert(err.message);
  }
}

async function renderCurrency(clpAmount, currency) {
  const todayValue = await getCurrency(currency.value);

  if (clpAmount.value <= 0) {
    resultSpan.innerHTML = "El número ingresado debe ser mayor a 0";
  } else if (clpAmount.value > 0) {
    const exchangeRate = 1 / todayValue.serie[0].valor;
    resultSpan.innerHTML = `Resultado: ${(
      clpAmount.value * exchangeRate
    ).toPrecision(4)}`;
    clpAmount.value = "";
  } else {
    resultSpan.innerHTML = "Debes ingresar solo número";
  }
}

async function renderChart(currency) {
  const data = await getChart(currency);
  const config = {
    type: "line",
    data,
  };

  myChart.style.backgroundColor = "white";
  if (typeof Chart == undefined) {
  } else {
    new Chart(myChart, config);
  }
  
}

async function getChart(currency) {
  const chartData = await getCurrency(currency.value);

  const labels = [];
  const data = [];

  for (let i = 0; i < 10; i++) {
    labels.push(chartData.serie[i].fecha);
    data.push(chartData.serie[i].valor);
  }

  const datasets = [
    {
      label: "Fecha",
      borderColor: "rgb(255, 99, 132)",
      data,
    },
  ];
  return { labels, datasets };
}
