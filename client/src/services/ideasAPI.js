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
		const username = localStorage.getItem('username') ? localStorage.getItem('username') : '';

		// > #1 SENDING DATA VIA HEADERS
		// const headers = {
		// 	Username: username,
		// };
		// return axios.delete(`${this._apiURL}/${id}`, { headers })
		// > #2 SENDING DATA VIA RE.BODY - BY DEFAULT AXIOS DOES THIS UNLESS STATED OTHERWISE
		return axios.delete(`${this._apiURL}/${id}`, {
			data: {
				username: username,
			},
		});
	}
	async deleteAllIdeas() {
		return axios.delete(`${this._apiURL}`);
	}
}

export default new IdeasAPI();
