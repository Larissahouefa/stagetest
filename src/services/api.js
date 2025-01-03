// api.js
import axios from 'axios';

const apiClient=axios.create({
    baseURL: 'https://api.github.com/',  // URL de base de l'API GitHub
    headers: { 'Content-Type': 'application/json' },
});

export default {
    // Requête pour récupérer les dépôts selon un mot-clé et un langage
    fetchRepositories(query='', language='', page=1, per_page=10) {
        let url=`search/repositories?q=`;

        if (!query.trim()) {
            url+='stars:>1000'; // Retourne tout, sans filtre
        } else {
            url+=query;
        }

        if (language) {
            url+=`+language:${language}`;
        }

        // Ajouter les paramètres de pagination
        url+=`&page=${page}&per_page=${per_page}`;

        return apiClient.get(url);
    },


    // Optionnel : Requête pour obtenir la liste des langages (si vous avez une API dédiée pour ça)
    fetchLanguages() {
        // Vous devrez peut-être un autre service pour obtenir les langages disponibles ou les filtrer
        return apiClient.get('/languages'); // Cette URL est un exemple, GitHub ne fournit pas directement une telle API
    },
};
