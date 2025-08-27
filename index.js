const API_URL = "https://jsonplaceholder.typicode.com/users?_limit=5";

document.addEventListener("DOMContentLoaded", () => {
  // Seleciona o parágrafo e o botão pelos seus IDs
  const textToChange = document.getElementById("text-to-change");
  const changeTextBtn = document.getElementById("change-text-btn");

  changeText(changeTextBtn, textToChange);
  changeStyle(textToChange);
  getMouseAndKeyboardEvents();
  fetchData();
});

function changeText(changeTextBtn, textToChange) {
  // Adiciona um "ouvinte" que espera por um clique no botão
  changeTextBtn.addEventListener("click", () => {
    // Quando o botão for clicado, altera o conteúdo do texto
    textToChange.textContent = "Texto alterado com sucesso pelo JavaScript!";
  });
}

function changeStyle(textToChange) {
  document.getElementById("change-style-btn").addEventListener("click", () => {
    textToChange.classList.toggle("bg-teal-100");
    textToChange.classList.toggle("text-teal-800");
    textToChange.classList.toggle("font-bold");
  });
}

function getMouseAndKeyboardEvents() {
  const mouseBox = document.getElementById("mouse-box");
  mouseBox.addEventListener("mouseover", () => {
    mouseBox.textContent = "O rato entrou!";
    mouseBox.classList.add("bg-blue-500", "text-white");
  });
  mouseBox.addEventListener("mouseout", () => {
    mouseBox.textContent = "Passe o rato aqui";
    mouseBox.classList.remove("bg-blue-500", "text-white");
  });
  document.addEventListener("keydown", (event) => {
    document.getElementById("key-pressed-output").textContent = event.code;
  });
}

async function fetchData() {
  const fetchDataBtn = document.getElementById("fetch-data-btn");
  const apiDataDiv = document.getElementById("api-data");

  fetchDataBtn.addEventListener("click", async () => {
    apiDataDiv.innerHTML = "<p>A carregar dados...</p>";
    // Busca dados na api
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Erro na rede: ${response.status}`);
      const users = await response.json();
      const userList = users
        .map(
          (user) => `
                    <div class="p-2 border-b last:border-b-0">
                    <p class="font-semibold">${user.name}</p>
                    <p class="text-sm text-gray-500">${user.email}</p>
                    </div>
                `
        )
        .join("");
      apiDataDiv.innerHTML = userList;
    } catch (error) {
      apiDataDiv.innerHTML = `<p class="text-red-500">Falha ao buscar dados: ${error.message}</p>`;
    }
  });
}
