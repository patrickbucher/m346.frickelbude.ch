const pricing = {
  aws: {
    requestPrice: 0.22 / 1e6,
    gbSecPrice: 0.0000183334,
  },
  azure: {
    requestPrice: 0.4 / 1e6,
    gbSecPrice: 0.000026,
  },
  gcp: {
    cpuSecPrice: 0.000011244,
    gbSecPrice: 0.000001235,
  },
};

const calculateGbSecPrice = (requests, seconds, memory, gbSecPrice) => {
  return requests * seconds * (memory / 1024) * gbSecPrice;
};

const calculateAwsPricing = (requests, seconds, memory) => {
  return (
    requests * pricing.aws.requestPrice +
    calculateGbSecPrice(requests, seconds, memory, pricing.aws.gbSecPrice)
  );
};

const calculateAzurePricing = (requests, seconds, memory) => {
  return (
    requests * pricing.azure.requestPrice +
    calculateGbSecPrice(requests, seconds, memory, pricing.azure.gbSecPrice)
  );
};

const calculateGcpPricing = (requests, seconds, memory) => {
  return (
    requests * pricing.gcp.cpuSecPrice * seconds +
    calculateGbSecPrice(requests, seconds, memory, pricing.gcp.gbSecPrice)
  );
};

const calculate = (requests, seconds, memory) => {
  return new Map([
    ["AWS", calculateAwsPricing(requests, seconds, memory)],
    ["Azure", calculateAzurePricing(requests, seconds, memory)],
    ["GCP", calculateGcpPricing(requests, seconds, memory)],
  ]);
};

const block = (tag, ...children) => {
  const element = document.createElement(tag);
  children.forEach((c) => element.appendChild(c));
  return element;
};

const inline = (tag, text) => {
  const element = document.createElement(tag);
  element.appendChild(document.createTextNode(text));
  return element;
};

const flush = (node) => {
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const requestsTextBox = document.getElementsByName("requests")[0];
  const cpuTimeTextBox = document.getElementsByName("cpuTime")[0];
  const gbSecondsTextBox = document.getElementsByName("gbSeconds")[0];
  const calculateButton = document.getElementsByName("calculate")[0];
  const resultsDiv = document.getElementById("results");
  calculateButton.addEventListener("click", () => {
    const requests = Number.parseInt(requestsTextBox.value);
    const cpuTime = Number.parseFloat(cpuTimeTextBox.value);
    const gbSeconds = Number.parseInt(gbSecondsTextBox.value);
    const results = calculate(requests, cpuTime, gbSeconds);
    // TODO: price formatting for results!
    flush(resultsDiv);
    rows = [block("tr", inline("th", "Cloud"), inline("th", "Costs"))].concat(
      ...results
        .entries()
        .map(([k, v]) => block("tr", inline("td", k), inline("td", v)))
    );
    console.log(rows);
    resultsDiv.appendChild(block("table", ...rows));
  });
});
