import axios from 'axios';

class IdeasAPI {
	constructor() {
		this._apiURL = 'http://localhost:5000/api/ideas';
	}

	async getAllIdeas() {
		return axios.get(this._apiURL);
	}
	async getIdea(id) {
		return axios.get(`${this._apiURL}/${id}`);
	}
	async createIdea(data) {
		return axios.post(this._apiURL, data);
	}
	async updateIdea(id, data) {
		return axios.put(`${this._apiURL}/${id}`, data);
	}
	async deleteIdea(id) {
		return axios.delete(`${this._apiURL}/${id}`);
	}
	async deleteAllIdeas() {
		return axios.delete(`${this._apiURL}`);
	}
}

export default new IdeasAPI();
