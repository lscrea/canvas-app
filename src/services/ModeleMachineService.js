import axios from 'axios';

const baseURL = 'https://localhost:5001/api'; // Vous pouvez changer cette base URL si nécessaire

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

class ModeleMachineService {
    getModeleMachines() {
        return axios.get(`${baseURL}/modelesMachines`, httpOptions);
    }

    getModeleMachineById(modeleMachineId) {
        return axios.get(`${baseURL}/modelesMachines/${modeleMachineId}`, httpOptions);
    }

    createModeleMachine(formData) {
        return axios.post(`${baseURL}/modelesMachines`, formData, fileHttpOptions);
    }

    updateModeleMachine(modeleMachineId, formData) {
        return axios.put(`${baseURL}/modelesMachines/${modeleMachineId}/`, formData, fileHttpOptions);
    }

    deleteModeleMachine(modeleMachineId) {
        return axios.delete(`${baseURL}/modelesMachines/${modeleMachineId}`, httpOptions);
    }
}

export default new ModeleMachineService();
