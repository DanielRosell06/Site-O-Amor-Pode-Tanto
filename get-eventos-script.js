const imagem01 = document.getElementById('events-image-01');
const titulo01 = document.getElementById('events-title-01');
const descricao01 = document.getElementById('events-description-01');
const data01 = document.getElementById('events-data-01');

const imagem02 = document.getElementById('events-image-02');
const titulo02 = document.getElementById('events-title-02');
const descricao02 = document.getElementById('events-description-02');
const data02 = document.getElementById('events-data-02');

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
        if (data[0] && data[1]) {
            const formatarData = (dataString) => {
                const data = new Date(dataString);
                const dia = String(data.getDate()).padStart(2, '0');
                const mes = String(data.getMonth() + 1).padStart(2, '0');
                const ano = data.getFullYear();
                return `${dia}/${mes}/${ano}`;
            };

            imagem01.src = data[1].URLImagemEvento;
            titulo01.innerText = data[1].TituloSiteEvento;
            descricao01.innerText = data[1].DescricaoSiteEvento;
            data01.innerText = formatarData(data[1].DataEvento);

            imagem02.src = data[0].URLImagemEvento;
            titulo02.innerText = data[0].TituloSiteEvento;
            descricao02.innerText = data[0].DescricaoSiteEvento;
            data02.innerText = formatarData(data[0].DataEvento);
        } else {
            console.warn('URL da imagem não encontrada.');
        }

        return data;
    } catch (error) {
        console.error('Erro ao buscar eventos:', error.message);
    }
}

fetchEventos();