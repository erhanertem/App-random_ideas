import IdeasAPI from '../services/ideasAPI';

class IdeaList {
	constructor() {
		this._ideaListEl = document.querySelector('#idea-list');
		this._ideas = [];

		this.getIdeas(); //IdeaList's own getIdeas Implementation called when Idealist initialized to fill in _ideas array

		this._tags = ['technology', 'software', 'business', 'education', 'health', 'inventions'];
		this._validTags = new Set(this._tags);

		// IMPORTANT!! we havent created the html blocks for the ideas INSIDE THE IDEASLIST PARENT ELEMENT so we can't use this inside the constructor
		// this._addEventListeners();
	}

	_addEventListeners() {
		this._ideaListEl.addEventListener('click', (e) => {
			if (e.target.classList.contains('fa-times')) {
				e.stopImmediatePropagation();

				const ideaId = e.target.closest('.card').dataset.id;
				this.deleteIdea(ideaId);
			}
		});
	}

	async deleteIdea(id) {
		try {
			// Delete from server
			const response = await IdeasAPI.deleteIdea(id);
			// Remove from the DOM
			// this._ideas = this._ideas.filter((idea) => idea._id !== id);
			this.getIdeas();
			this.render();
		} catch (error) {
			alert("You can't delete this resource");
			console.error(error);
		}
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
		this._ideaListEl.innerHTML = this._ideas
			.map((el) => {
				const tagClass = this._getTagClass(el.tag);
				return `<div class="card" data-id="${el._id}">
            <button class="delete"><i class="fas fa-times"></i></button>
            <h3>${el.text}</h3>
            <p class="tag ${tagClass}">${el.tag}</p>
            <p>
            Posted on <span class="date">${el.date.split('T')[0]}</span> by
            <span class="author">${el.username}</span>
            </p>
         </div>`;
			})
			.join('');

		this._addEventListeners(); //we assign the event listner after cards are rendered into the PARENT LIST ELEMENT
	}
}

export default IdeaList;
