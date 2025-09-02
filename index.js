async function atualizar() {
  try {
    const response = await fetch("http://IP_DO_ESP32/"); // substitua pelo IP do ESP32
    const data = await response.json();

    document.getElementById("temp").innerText = "Temperatura: " + data.temperatura + " °C";
    document.getElementById("umid").innerText = "Umidade: " + data.umidade + " %";
  } catch (error) {
    console.error("Erro ao buscar dados do ESP32:", error);
  }
}

// Atualiza automaticamente a cada 5 segundos
setInterval(atualizar, 5000);
