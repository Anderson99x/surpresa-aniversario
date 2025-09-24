document.addEventListener('DOMContentLoaded', () => {
    // ===================================================================
    // == IMPORTANTE: DEFINA A DATA E HORA DA SURPRESA AQUI ==
    // ===================================================================
    // Formato: "Mês Dia, Ano HH:MM:SS" (em inglês)
   const dataAlvo = new Date("September 25, 2024 00:00:00").getTime();
    // ===================================================================

    // Pega os elementos da página
    const lockScreen = document.getElementById('lock-screen');
    const mainContent = document.getElementById('main-content');
    const diasEl = document.getElementById('dias');
    const horasEl = document.getElementById('horas');
    const minutosEl = document.getElementById('minutos');
    const segundosEl = document.getElementById('segundos');

    // Função que atualiza o contador a cada segundo
    const atualizarContador = setInterval(() => {
        const agora = new Date().getTime();
        const diferenca = dataAlvo - agora;

        // Se a data já passou
        if (diferenca < 0) {
            clearInterval(atualizarContador);
            lockScreen.style.display = 'none'; 
            mainContent.classList.remove('hidden'); 
            return;
        }

        // Cálculos de tempo
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

        // Atualiza os números na tela
        diasEl.innerHTML = dias;
        horasEl.innerHTML = horas < 10 ? '0' + horas : horas;
        minutosEl.innerHTML = minutos < 10 ? '0' + minutos : minutos;
        segundosEl.innerHTML = segundos < 10 ? '0' + segundos : segundos;

    }, 1000);
});