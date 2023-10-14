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

class MachineService {
    getMachines() {
        return axios.get(`${baseURL}/machines`, httpOptions);
    }

    getMachineById(machineId) {
        return axios.get(`${baseURL}/machines/${machineId}`, httpOptions);
    }

    createMachine(formData) {
        return axios.post(`${baseURL}/machines`, formData, fileHttpOptions);
    }

    updateMachine(machineId, formData) {
        return axios.put(`${baseURL}/machines/${machineId}/`, formData, fileHttpOptions);
    }

    deleteMachine(machineId) {
        return axios.delete(`${baseURL}/machines/${machineId}`, httpOptions);
    }
}

export default new MachineService();
