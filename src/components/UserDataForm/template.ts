export const template = `
  <h1 class="profile-data__name">{{ first_name }}</h1>
  <div class="profile-data__form-item">
    <label for="email" class="profile-data-form-field__label">Почта</label>
    <div>
      <input id="email" name="email" type="email" class="profile-data-form-field__input" placeholder=" "  value="{{ email }}" disabled />
    </div>
  </div>

  <div class="divider"></div>

  <div class="profile-data__form-item">
    <label for="login" class="profile-data-form-field__label">Логин</label>
    <div>
      <input id="login" name="login" type="text" class="profile-data-form-field__input" placeholder=" "  value="{{ login }}" disabled />
    </div>
  </div>

  <div class="divider"></div>

  <div class="profile-data__form-item">
    <label for="first_name" class="profile-data-form-field__label">Имя</label>
    <div>
      <input id="first_name" name="first_name" type="text" class="profile-data-form-field__input" placeholder=" "  value="{{ first_name }}" disabled />
    </div>
  </div>

  <div class="divider"></div>

  <div class="profile-data__form-item">
    <label for="second_name" class="profile-data-form-field__label">Фамилия</label>
    <div>
      <input id="second_name" name="second_name" type="text" class="profile-data-form-field__input" placeholder=" "  value="{{ second_name }}" disabled />
    </div>
  </div>

  <div class="divider"></div>

  <div class="profile-data__form-item">
    <label for="display_name" class="profile-data-form-field__label">Имя в чате</label>
    <div>
      <input id="display_name" name="display_name" type="text" class="profile-data-form-field__input" placeholder=" "  value="{{ display_name }}" disabled />
    </div>
  </div>

  <div class="divider"></div>

  <div class="profile-data__form-item">
    <label for="phone" class="profile-data-form-field__label">Телефон</label>
    <div>
      <input id="phone" name="phone" type="tel" class="profile-data-form-field__input" placeholder=" "  value="{{ phone }}" disabled />
    </div>
  </div>
`;
