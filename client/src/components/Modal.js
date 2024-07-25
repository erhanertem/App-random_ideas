class Modal {
	constructor() {
		this._modal = document.querySelector('#modal');
		this._modalBtn = document.querySelector('#modal-btn');

		this.addEventListeners();
	}

	addEventListeners() {
		this._modalBtn.addEventListener('click', this.openModal.bind(this));
		window.addEventListener('click', this.outsideClick.bind(this));
		document.addEventListener('closemodal', () => this.closeModal());
	}

	openModal() {
		this._modal.style.display = 'block';
	}
	closeModal() {
		this._modal.style.display = 'none';
	}
	resetForm() {
		document.getElementById('idea-form').reset();
	}
	outsideClick(event) {
		// console.log(event.target);
		if (event.target === this._modal) {
			this.resetForm();
			this.closeModal();
		}
	}
}

export default Modal;
