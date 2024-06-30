let intentos = 6;
let palabra = "";

const diccionario = [
  "GATO",
  "PERRO",
  "MESA",
  "TREN",
  "AZUL",
  "PLAYA",
  "CASA",
  "NARANJA",
  "AUTO",
  "DERROTA",
  "AMOR",
  "PUERTA",
];

function init() {
  palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
  const button = document.getElementById("guess-button");
  button.addEventListener("click", intentar);
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  intentos = 6;

  const input = document.getElementById("guess-input");
  input.value = "";
  input.disabled = false;
  button.disabled = false;

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      intentar();
    }
  });

  const guesses = document.getElementById("guesses");
  guesses.innerHTML = "";

  document.getElementById("sugerencias").innerText = ""; // Reiniciar sugerencias

  const sugerenciaButton = document.getElementById("sugerencia-button");
  sugerenciaButton.addEventListener("click", obtenerSugerencias);
}

function intentar() {
  const input = document.getElementById("guess-input");
  const INTENTO = leerIntento();

  if (INTENTO === palabra) {
    terminar("<h1>FELICIDADES!!:DDD</h1>");
    return;
  }

  const grid = document.getElementById("grid");
  const row = document.createElement("div");
  row.className = "row";

  for (let i = 0; i < INTENTO.length; i++) {
    const span = document.createElement("span");
    span.className = "letter";
    span.style.borderRadius = "5px";
    span.style.border = "none";
    span.style.padding = "10px";

    if (INTENTO[i] === palabra[i]) {
      span.innerHTML = INTENTO[i];
      span.style.backgroundColor = "#79b851";
      span.style.color = "#344e41";
    } else if (palabra.includes(INTENTO[i])) {
      span.innerHTML = INTENTO[i];
      span.style.backgroundColor = "#f3c237";
      span.style.color = "#fb8500";
    } else {
      span.innerHTML = INTENTO[i];
      span.style.backgroundColor = "#edede9";
      span.style.color = "#d6ccc2";
    }

    row.appendChild(span);
  }

  grid.appendChild(row);

  intentos--;

  if (intentos === 0) {
    terminar("<h1>Intentalo de nuevo!</h1>");
  }

  input.value = "";
}

function leerIntento() {
  const input = document.getElementById("guess-input");
  let intento = input.value;
  intento = intento.toUpperCase();
  return intento;
}

function terminar(mensaje) {
  const popup = document.getElementById("derruta");
  const popupMessage = document.getElementById("chau");
  const reloadButton = document.getElementById("reinicio");
  const answer = document.getElementById("tabien");

  answer.innerHTML = `LA PALABRA DE HOY ES: ${palabra}`;
  popupMessage.innerHTML = mensaje;
  popupMessage.style.fontSize = "20px";
  popup.style.display = "flex";

  reloadButton.addEventListener("click", function () {
    location.reload();
  });
}

async function obtenerSugerencias() {
  const url = `https://api.datamuse.com/words?ml=${palabra}&max=5`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const sugerencias = data.map((item) => item.word.toUpperCase()).join(", ");
    document.getElementById(
      "sugerencias"
    ).innerText = `Sugerencias: ${sugerencias}`;
  } catch (error) {
    console.error("Error al obtener sugerencias:", error);
    document.getElementById("sugerencias").innerText =
      "Error al obtener sugerencias.";
  }
}

window.addEventListener("load", init);
