import axios from 'axios';

class IdeasAPI {
	constructor() {
		this._apiURL = 'http://localhost:5000/api/ideas';
	}

	getAllIdeas() {
		return axios.get(this._apiURL);
	}
}

export default new IdeasAPI();
