import { SignPage } from '../Sign/index';
import { registerForm } from "../../components/RegisterForm/index";
import { render } from '../../utils/render';

const registerPage = new SignPage({
  form: registerForm,
});

// app — это id дива в корне DOM
render(".app", registerPage);
