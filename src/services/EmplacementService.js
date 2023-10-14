import axios from 'axios';

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

class EmplacementService {
    getEmplacements() {
        return axios.get(`${baseURL}/emplacements`, httpOptions);
    }

    getEmplacementById(emplacementId) {
        return axios.get(`${baseURL}/emplacements/${emplacementId}`, httpOptions);
    }

    createEmplacement(formData) {
        return axios.post(`${baseURL}/emplacements`, formData, httpOptions);
    }

    updateEmplacement(emplacementId, formData) {
        return axios.put(`${baseURL}/emplacements/${emplacementId}/`, formData, fileHttpOptions);
    }

    deleteEmplacement(emplacementId) {
        return axios.delete(`${baseURL}/emplacements/${emplacementId}`, httpOptions);
    }
}

export default new EmplacementService();
