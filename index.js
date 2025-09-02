async function atualizar() {
  try {
    const response = await fetch("https://temperatura2.onrender.com");
    const data = await response.json();

    document.getElementById("temp").innerText = "Temperatura: " + data.temperatura + " °C";
    document.getElementById("umid").innerText = "Umidade: " + data.umidade + " %";
  } catch (error) {
    console.error("Erro ao buscar dados do ESP32:", error);
  }
}

setInterval(atualizar, 5000);
