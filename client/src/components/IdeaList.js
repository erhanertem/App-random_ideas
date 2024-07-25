import IdeasAPI from '../services/ideasAPI';

class IdeaList {
	constructor() {
		this._ideaListEl = document.querySelector('#idea-list');
		this._ideas = [];

		this.getIdeas(); //IdeaList's own getIdeas Implementation called when Idealist initialized to fill in _ideas array

		this._tags = ['technology', 'software', 'business', 'education', 'health', 'inventions'];
		this._validTags = new Set(this._tags);
	}

	async getIdeas() {
		try {
			const response = await IdeasAPI.getAllIdeas();
			this._ideas = response.data.data;
			// Trigger render after getting data from API
			// NOTE: We were not able to render @ index.js as data was not ready then
			this.render();
		} catch (error) {
			console.error(error);
		}
	}

	addIdeaToList(data) {
		// Add new idea to the list
		this._ideas.push(data);
		// Re-render the component
		this.render();
	}

	_getTagClass(tag) {
		let tagClass = '';

		// INQUIRED TAG
		tag = tag.toLowerCase();
		// CHECK IF TAG EXISTS IN THE TAG SET, IF DOES CREATE THE TAG
		if (this._validTags.has(tag)) {
			tagClass = `tag-${tag}`;
		}

		return tagClass;
	}

	render() {
		this._ideas.forEach((el) => {
			const tagClass = this._getTagClass(el.tag);
			const innerHTML = `
         <div class="card">
            <button class="delete"><i class="fas fa-times"></i></button>
            <h3>${el.text}</h3>
            <p class="tag ${tagClass}">${el.tag}</p>
            <p>
            Posted on <span class="date">${el.date}</span> by
            <span class="author">${el.username}</span>
            </p>
         </div>
         `;
			this._ideaListEl.innerHTML += innerHTML;
		});
	}
}

export default IdeaList;
