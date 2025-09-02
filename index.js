
const id = "esp32-" + new Date().getTime();
const cliente = new Paho.MQTT.Client("broker.hivemq.com", 8884, id);

cliente.connect({
  useSSL: true,
  onSuccess: function() {
    console.log("Conectado ao broker MQTT");
    cliente.subscribe("eloa/temperatura");
    cliente.subscribe("eloa/umidade");
  },
  onFailure: function() {
    alert("Falha na conexão com o broker MQTT");
  }
});
cliente.onMessageArrived = function(message) {
  console.log("Mensagem recebida: ", message.destinationName, message.payloadString);

  if (message.destinationName === "eloa/temperatura") {
    document.getElementById("temp").innerText = "Temperatura: " + message.payloadString + " °C";
  }
  if (message.destinationName === "eloa/umidade") {
    document.getElementById("umid").innerText = "Umidade: " + message.payloadString + " %";
  }
};

function atualizar() {
  const msg = new Paho.MQTT.Message("1");
  msg.destinationName = "eloa/atualizar";
  cliente.send(msg);
}

function desligar() {
  cliente.disconnect();
  alert("Desconectado do servidor MQTT");
}
