document.addEventListener('DOMContentLoaded', () => {

    // --- EFEITO 1: PARTÍCULAS INTERATIVAS (COM CORAÇÕES) ---
    if (document.getElementById('tsparticles')) {
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            particles: {
                number: {
                    value: 80,
                },
                color: {
                    value: "#e91e63"
                },
                shape: {
                    type: "images", // <<< TIPO MUDADO PARA IMAGENS
                    images: [{
                        src: "https://www.flaticon.com/svg/v2/svg/66/66827.svg", // URL de um ícone de coração
                        width: 20,
                        height: 20
                    }]
                },
                opacity: {
                    value: 0.5,
                    random: true,
                },
                size: {
                    value: 3,
                    random: { enable: true, minimumValue: 1 },
                },
                links: {
                    color: "#e91e63",
                    distance: 150,
                    enable: true,
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    out_mode: "out",
                },
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                },
                modes: {
                    repulse: {
                        distance: 100,
                    },
                    push: {
                        quantity: 4,
                    },
                },
            },
            background: {
                color: "#fce4ec"
            }
        });
    }

    // --- EFEITO 2: TÍTULO SENDO DIGITADO ---
    const titulo = document.getElementById('titulo-animado');
    if (titulo) {
        new TypeIt(titulo, {
            strings: `Feliz Aniversário, Isabella! ❤️`,
            speed: 75,
            waitUntilVisible: true,
            cursor: false,
        }).go();
    }
    
    // --- LÓGICA PARA A CARTA SECRETA ---
    const letterModal = document.getElementById('letter-modal');
    const openLetterButton = document.getElementById('open-letter-button');
    const closeLetterButton = document.getElementById('close-letter');
    if (letterModal && openLetterButton && closeLetterButton) {
        const openLetter = () => {
            letterModal.classList.remove('hidden');
            letterModal.classList.add('visible');
        };
        const closeLetter = () => {
            letterModal.classList.add('hidden');
            letterModal.classList.remove('visible');
        };
        openLetterButton.addEventListener('click', openLetter);
        closeLetterButton.addEventListener('click', closeLetter);
        letterModal.addEventListener('click', (event) => {
            if (event.target === letterModal) {
                closeLetter();
            }
        });
    }

    // --- MENSAGEM SURPRESA NA ABA ---
    let docTitle = document.title;
    window.addEventListener("blur", () => {
        document.title = "Volta aqui, meu amor! ❤️";
    });
    window.addEventListener("focus", () => {
        document.title = docTitle;
    });

    // --- NOVO CONTROLE DE MÚSICA PARA O YOUTUBE ---
    let player;
    let isMuted = true;

    // A API do YouTube irá chamar esta função quando estiver pronta
    window.onYouTubeIframeAPIReady = function() {
        if (document.getElementById('youtube-iframe')) {
            player = new YT.Player('youtube-iframe', {
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }
    }

    function onPlayerReady(event) {
        event.target.playVideo();
        event.target.mute(); 

        const youtubeMusicToggle = document.createElement('button');
        youtubeMusicToggle.id = 'youtube-music-toggle';
        youtubeMusicToggle.innerHTML = '<svg id="play-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg><svg id="pause-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="display: none;"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>';
        
        // Adiciona o botão apenas se o container principal existir (evita erros na página do jogo)
        if(document.getElementById('main-content')) {
            document.getElementById('main-content').appendChild(youtubeMusicToggle);
        }

        youtubeMusicToggle.addEventListener('click', () => {
            if (player.isMuted()) {
                player.unMute();
                player.playVideo();
                isMuted = false;
                youtubeMusicToggle.classList.add('playing');
                youtubeMusicToggle.querySelector('#play-icon').style.display = 'none';
                youtubeMusicToggle.querySelector('#pause-icon').style.display = 'block';
            } else {
                player.mute();
                isMuted = true;
                youtubeMusicToggle.classList.remove('playing');
                youtubeMusicToggle.querySelector('#play-icon').style.display = 'block';
                youtubeMusicToggle.querySelector('#pause-icon').style.display = 'none';
            }
        });
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
             player.playVideo(); // Reinicia o vídeo para o loop
        }
    }

    // Carrega a API do YouTube Player de forma assíncrona
    if (document.getElementById('youtube-iframe')) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
});