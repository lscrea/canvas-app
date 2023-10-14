// uploadService.js

import axios from 'axios'; // Assurez-vous d'avoir installé axios

const baseURL = 'https://localhost:5001/api';


const httpOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
};

const fileHttpOptions = {
    headers: {
      'Content-Disposition': 'multipart/form-data'
    }
};


const uploadService = {
    // Fonction pour télécharger une image à Azure Blob Storage et retourner l'URL
    uploadImage: async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(`${baseURL}/emplacements`, formData, { // Remplacez '/upload' par l'endpoint approprié de votre API
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;
        } catch (error) {
            console.error("Erreur lors de l'upload de l'image:", error);
            throw error;
        }
    },

    // Fonction pour mettre à jour un emplacement avec l'URL de l'image et d'autres données
    updateEmplacement: async (emplacementUpdateDto) => {
        try {
            const response = await axios.put(`${baseURL}/emplacements/${emplacementUpdateDto.id}`, emplacementUpdateDto);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'emplacement:", error);
            throw error;
        }
    }
};

export default uploadService;
