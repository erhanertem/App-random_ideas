// import axios from 'axios';

import Modal from './components/Modal';
import IdeaForm from './components/IdeaForm';
import IdeaList from './components/IdeaList';

import './css/style.css';

const modal = new Modal();
const ideaForm = new IdeaForm();
const ideaList = new IdeaList();
ideaForm.render();
ideaList.render();
