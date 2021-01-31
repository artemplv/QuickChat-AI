import { SignPage } from '../Sign/index.js';
import { registerForm } from "../../components/RegisterForm/index.js";
import { render } from '../../utils/render.js';

const registerPage = new SignPage({
  form: registerForm,
});

// app — это id дива в корне DOM
render(".app", registerPage);
