document.addEventListener('DOMContentLoaded', () => {
    // Aqui você coloca todo o código que depende dos elementos do DOM

    // Função para carregar os dados salvos localmente
    function carregarDadosLocais() {
        const dadosSalvos = localStorage.getItem('urls');
        if (dadosSalvos) {
            data = JSON.parse(dadosSalvos);
            // Adiciona as URLs salvas localmente ao DOM
            data.forEach(url => adicionarDivUrlStatus(url));
        }
    }

    // Função para salvar os dados localmente
    function salvarDadosLocais() {
        localStorage.setItem('urls', JSON.stringify(data));
    }

    // Função para adicionar um novo objeto ao array
    function adicionarDados(url) {
        
        if (typeof url === 'string') {
            data.push({ url: url});
            salvarDadosLocais(); // Salva os dados localmente após adicionar uma URL
            return true;
        } else {
            return false;
        }
    }

    // Selecionando elementos do DOM
    const btnAdd = document.querySelector("main button");
    const overlay = document.querySelector("#overlay");
    const urlInput = document.querySelector("#url");

    // Array acumulativo
    let data = [];

    // Carrega os dados salvos localmente ao carregar a página
    carregarDadosLocais();

    // Evento de clique no botão para mostrar o overlay
    btnAdd.addEventListener("click", () => {
        overlay.style.display = "block";
    });

    // Evento de clique no botão de adicionar na variável a ser monitorada
    document.querySelector("#to_monitor").addEventListener("click", () => {
        event.preventDefault();
        const url = urlInput.value;
        overlay.style.display = "none";

        if (adicionarDados(url)) {
            console.log(data);
            urlInput.value = ""; // Limpa o campo de entrada após adicionar uma URL
        } else {
            console.error("Erro ao adicionar dados. Verifique os valores inseridos.");
        }
        window.location.reload();
    });

    // Função para adicionar o elemento div para exibir o status da URL
    function adicionarDivUrlStatus(url) {
        const divUrlStatus = document.createElement("div");
        divUrlStatus.classList.add("urlStatus");
        const primeiroFilho = document.querySelector("main").firstElementChild;
        document.querySelector("main").insertBefore(divUrlStatus, primeiroFilho);
        adicionarParagrafos(divUrlStatus, "UP", url);
    }

    // Função para adicionar os parágrafos de status e URL ao elemento divUrlStatus
    function adicionarParagrafos(elementoPai, status, url) {
        const up = document.createElement("p");
        const pUrl = document.createElement("p");
        up.textContent = status;
        pUrl.textContent = url;
        elementoPai.appendChild(up);
        elementoPai.appendChild(pUrl);
    }

    // Função para testar uma única URL
    async function testarUrl(url, divUrlStatus) {
        try {

    
            // Verifica se a URL começa com 'http://' ou 'https://'
            if (!url.startsWith("http://") && !url.startsWith("https://")) {
                url = "http://" + url; // Adiciona 'http://' por padrão
            }
    
            const response = await fetch(`https://api-web-health.onrender.com/?url=${encodeURIComponent(url)}`);
            const statusUrl = response.ok ? "UP" : "DOWN";
            const pStatus = divUrlStatus.querySelector("p:first-child");
            const pUrl = divUrlStatus.querySelector("p:last-child");
            pStatus.textContent = statusUrl;
            pUrl.textContent = url;
    
            // Adiciona ou remove a classe 'down' com base no status
            if (statusUrl === "DOWN") {
                divUrlStatus.classList.add("down");
            } else {
                divUrlStatus.classList.remove("down");
            }
        }catch (error) {
            console.error(`Erro ao testar o site ${url}:`, error);
            const pStatus = divUrlStatus.querySelector("p:first-child");
            pStatus.innerHTML = "DOWN";

            // Adiciona a classe 'down' quando ocorre um erro
            divUrlStatus.classList.add("down");
        }
    }

    // Função para testar todas as URLs do array data
    async function testarTodasAsUrls() {
        for (const item of data) {
            const { url } = item;
            const divUrlStatus = document.querySelectorAll(".urlStatus")[data.indexOf(item)];
            await testarUrl(url, divUrlStatus);
            await new Promise(resolve => setTimeout(resolve));
        }
    }

    // Inicialização do monitoramento das URLs
    function iniciarMonitoramento() {
        testarTodasAsUrls();
        setInterval(testarTodasAsUrls, 5000); // Testa todas as URLs a cada 5 segundos
    }

    // Chamada inicial para iniciar o monitoramento
    iniciarMonitoramento();
});

// Função para limpar todos os dados do localStorage
function limparLocalStorage() {
    localStorage.clear();
}


// Adicionando evento de clique para limpar o localStorage quando o texto "Reset" for clicado
document.getElementById("resetLocalStorage").addEventListener("click", () => {
    limparLocalStorage();
    location.reload(); // Recarrega a página para refletir a remoção dos dados do localStorage
});