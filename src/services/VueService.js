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

class VueService {
    getVues() {
        return axios.get(`${baseURL}/vues`, httpOptions);
    }

    getVueById(vueId) {
        return axios.get(`${baseURL}/vues/${vueId}`, httpOptions);
    }

    createVue(vueId, formData) {
        return axios.post(`${baseURL}/vues${vueId}`, formData, fileHttpOptions);
    }

    updateVue(vueId, formData) {
        return axios.put(`${baseURL}/vues/${vueId}/`, formData, fileHttpOptions);
    }

    deleteVue(vueId) {
        return axios.delete(`${baseURL}/vues/${vueId}`, httpOptions);
    }
}

export default new VueService();
