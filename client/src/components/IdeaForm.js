import IdeasAPI from '../services/ideasAPI';
import IdeaList from './IdeaList';

class IdeaForm {
	constructor() {
		this._formModal = document.querySelector('#form-modal');
		this._ideaList = new IdeaList();

		// IdeasAPI.deleteAllIdeas();
	}

	async _handleSubmit(event) {
		event.preventDefault();

		// Entry Validation
		if (!this._form.elements.text.value || !this._form.elements.tag.value || !this._form.elements.username.value) {
			alert('Please fill in all required fields');
			return; // STOP FUNCTION EXECUTION IF ANY FIELDS ARE EMPTY
		}

		// Save user to local storage
		localStorage.setItem('username', this._form.elements.username.value);

		// ASSEMBLE THE OBJECT FOR SUBMISSION
		const idea = {
			// NOTE: .text property is accessible because input fields bear name property name="text" etc.
			text: this._form.elements.text.value,
			tag: this._form.elements.tag.value,
			username: this._form.elements.username.value,
		};

		// CREATED A POST REQ TO BACKEND API TO ADD THE NEW IDEA TO SERVER
		const newIdea = await IdeasAPI.createIdea(idea);

		// FORCE IDEALIST TO RE-RENDER NEW ARRAY OF IDEAS
		this._ideaList.addIdeaToList(newIdea.data.data);

		// CLEAR FIELDS
		this._form.reset();
		// TRIGGER EVENT INTENTIONALLY TO FORCE CLOSE MODAL UPON SUBMISSION
		// NOTE: WE CREATED A CUSTOM EVENT AND DISPATCHED IMMEDIATELY FOR WHOM ? FOR THE MODAL. SO WE ADD EVENTLISTENER DOCUMENTWIDE @ MODAL CLASS LISTENING FOR THIS EVENT TYPE WHICH WOULD TRIGGER THE MODAL CLOSE FUNCTION
		document.dispatchEvent(new Event('closemodal'));
	}

	addEventListeners() {
		this._form.addEventListener('submit', this._handleSubmit.bind(this));
	}

	render() {
		this._formModal.innerHTML = `
         <form id="idea-form">
            <div class="form-control">
               <label for="idea-text">Enter a Username</label>
               <input type="text" name="username" id="username" value="${
						localStorage.getItem('username') ? localStorage.getItem('username') : ''
					}"/>
            </div>
            <div class="form-control">
               <label for="idea-text">What's Your Idea?</label>
               <textarea name="text" id="idea-text"></textarea>
            </div>
            <div class="form-control">
               <label for="tag">Tag</label>
               <input type="text" name="tag" id="tag" />
            </div>
            <button class="btn" type="submit" id="submit">Submit</button>
         </form>
      `;

		// IMPORTANT! THESE CAN'T BE PROVIDED WITHIN THE CONSTRUCTOR, AS FIRST WE GOT TO PROVIDE THE INNER HTML AND THEN QUERY THOSE DOM ELEMENTS - FOR NON-EXISTING DOM ELEMENTS, WE CANT THROW EVENT LISTENERS!!!
		this._form = document.querySelector('#idea-form');
		this.addEventListeners();
	}
}

export default IdeaForm;
