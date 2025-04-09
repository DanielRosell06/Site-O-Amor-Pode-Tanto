const imagem01 = document.getElementById('events-image-01');
const imagem02 = document.getElementById('events-image-02');

async function fetchEventos() {
    try {
        // Verifica se o elemento da imagem foi encontrado
        if (!imagem01 || !imagem02) {
            console.error('Elemento da imagem não encontrado!');
            return;
        }

        const response = await fetch('https://amor-pode-tanto-site-server.onrender.com/api/usuarios');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Verificação compatível com JavaScript tradicional
        if (data[0] && data[0].URLImagemEvento) {
            imagem01.src = data[0].URLImagemEvento;
            imagem02.src = data[1].URLImagemEvento;
        } else {
            console.warn('URL da imagem não encontrada.');
        }

        return data;
    } catch (error) {
        console.error('Erro ao buscar eventos:', error.message);
    }
}

fetchEventos();