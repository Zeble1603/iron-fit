const axios = require('axios');

class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://exercisedb.p.rapidapi.com/exercises',
            headers: {
                'X-Rapidapi-Key': process.env.API_KEY,
                'X-Rapidapi-Host': process.env.API_HOST, 
            }
          });
    }

    getAllExercices = () => {
        return this.api.get('/');
      };
    
    getAllBodyParts = () => {
        return this.api.get('/bodyPartList');
    }

    getExercicesByBodyPart = (bodyPart) => {
        return this.api.get(`/bodyPart/${bodyPart}`);
    }
    
    getExerciceById = (id) => {
        return this.api.get(`/exercise/${id}`);
    }

    getExerciceByName = (name) => {
        return this.api.get(`/name/${name}`);
    }

    getTargetMuscles = () => {
        return this.api.get(`/targetList`);
    }

    getExercicebyTarget = (target) => {
        return this.api.get(`/target/${target}`);
    }

    getExerciceByEquipment = (equipment) => {
        return this.api.get(`/equipment/${equipment}`);
    }

    getEquipment = () => {
        return this.api.get(`/equipmentList`);
    }
}

module.exports = ApiService