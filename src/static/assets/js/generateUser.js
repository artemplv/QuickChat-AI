/**
 * Генерация HTML с данными пользователя
 * @param {object} user
 */
function generateUser(user) {
  const fragment = document.createDocumentFragment();

  const {
    email,
    login,
    first_name,
    second_name,
    display_name,
    phone,
  } = user;

  const userName = document.createElement('h1');

  userName.innerText = first_name;

  userName.classList.add("profile-data__name");

  fragment.appendChild(userName);

  const form = document.createElement('form');

  form.innerHTML = `
    <div class="profile-data__form-item">
      <label for="email" class="profile-data-form-field__label">Почта</label>
      <input id="email" name="email" type="email" class="profile-data-form-field__input" placeholder=" " required value="${email}" disabled />
    </div>

    <div class="divider"></div>

    <div class="profile-data__form-item">
      <label for="login" class="profile-data-form-field__label">Логин</label>
      <input id="login" name="login" type="text" class="profile-data-form-field__input" placeholder=" " required value="${login}" disabled />
    </div>

    <div class="divider"></div>

    <div class="profile-data__form-item">
      <label for="first_name" class="profile-data-form-field__label">Имя</label>
      <input id="first_name" name="first_name" type="text" class="profile-data-form-field__input" placeholder=" " required value="${first_name}" disabled />
    </div>

    <div class="divider"></div>

    <div class="profile-data__form-item">
      <label for="second_name" class="profile-data-form-field__label">Фамилия</label>
      <input id="second_name" name="second_name" type="text" class="profile-data-form-field__input" placeholder=" " required value="${second_name}" disabled />
    </div>

    <div class="divider"></div>

    <div class="profile-data__form-item">
      <label for="display_name" class="profile-data-form-field__label">Имя в чате</label>
      <input id="display_name" name="display_name" type="text" class="profile-data-form-field__input" placeholder=" " required value="${display_name}" disabled />
    </div>

    <div class="divider"></div>

    <div class="profile-data__form-item">
      <label for="phone" class="profile-data-form-field__label">Телефон</label>
      <input id="phone" name="phone" type="tel" class="profile-data-form-field__input" placeholder=" " required value="${phone}" disabled />
    </div>

    <div class="profile-data__form-controls" hidden>
      <button type="submit" class="form__main-button">
        Сохранить
      </button>
      <button type="button" class="profile-data__additional-button" onclick="cancelDetailsChange()">
        Отменить
      </button>
    </div>
  `;

  form.classList.add("form");
  form.classList.add("profile-data__form");
  form.setAttribute('id', 'userDetails');

  fragment.appendChild(form);

  document.querySelector('.generated-user-data-placeholder').appendChild(fragment);
};

const sampleUser = {
  email: 'pochta@yandex.ru',
  login: 'ivanivanov',
  first_name: 'Иван',
  second_name: 'Иванов',
  display_name: 'Иван',
  phone: '+7 (909) 967 30 30',
};

generateUser(sampleUser);
