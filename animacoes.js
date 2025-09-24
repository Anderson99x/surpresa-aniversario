document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos principais da nossa história
    const storyImage = document.getElementById('story-image');
    const textTriggers = document.querySelectorAll('.text-trigger');

    // Garante que o script só rode se os elementos da história existirem
    if (!storyImage || textTriggers.length === 0) {
        return;
    }

    // Remove a classe 'active' de todos os blocos de texto
    const deactivateAllTriggers = () => {
        textTriggers.forEach(trigger => {
            trigger.classList.remove('active');
        });
    };

    // Configura o observador de interseção
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Verifica se o bloco de texto está visível na tela
            if (entry.isIntersecting) {
                // Pega o caminho da nova imagem do atributo 'data-image'
                const newImage = entry.target.dataset.image;

                // Remove o 'active' de todos para destacar só o atual
                deactivateAllTriggers();
                // Adiciona a classe 'active' ao bloco de texto visível
                entry.target.classList.add('active');

                // Suavemente troca a imagem
                storyImage.style.opacity = 0; // Deixa a imagem atual transparente
                setTimeout(() => {
                    storyImage.src = newImage; // Troca a imagem
                    storyImage.style.opacity = 1; // Revela a nova imagem
                }, 300); // Espera 0.3s para a transição
            }
        });
    }, {
        // A mágica acontece quando 60% do bloco de texto está na tela
        threshold: 0.6
    });

    // Manda o observador vigiar cada bloco de texto
    textTriggers.forEach(trigger => {
        observer.observe(trigger);
    });
});