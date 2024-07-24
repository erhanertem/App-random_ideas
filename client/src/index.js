// import axios from 'axios';

import './css/style.css';

const modal = document.querySelector('#modal');
const modalBtn = document.querySelector('#modal-btn');

function openModal() {
	modal.style.display = 'block';
}
function closeModal() {
	modal.style.display = 'none';
}
function outsideClick(event) {
	// console.log(event.target);
	if (event.target === modal) {
		closeModal();
	}
}
modalBtn.addEventListener('click', openModal);
window.addEventListener('click', outsideClick);
