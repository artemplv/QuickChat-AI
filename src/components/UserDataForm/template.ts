export default `
  <h1 class="profile-data__name">{{ firstName }}</h1>
  <div class="profile-data__form-item">
    <label for="email" class="profile-data-form-field__label">Почта</label>
    <div>
      <input id="email" name="email" type="email" class="profile-data-form-field__input" placeholder=" "  value="{{ email }}" disabled />
    </div>
  </div>

  <div class="divider"></div>

  <div class="profile-data__form-item">
    <label for="username" class="profile-data-form-field__label">Логин</label>
    <div>
      <input id="username" name="username" type="text" class="profile-data-form-field__input" placeholder=" "  value="{{ username }}" disabled />
    </div>
  </div>

  <div class="divider"></div>

  <div class="profile-data__form-item">
    <label for="firstName" class="profile-data-form-field__label">Имя</label>
    <div>
      <input id="firstName" name="firstName" type="text" class="profile-data-form-field__input" placeholder=" "  value="{{ firstName }}" disabled />
    </div>
  </div>

  <div class="divider"></div>

  <div class="profile-data__form-item">
    <label for="lastName" class="profile-data-form-field__label">Фамилия</label>
    <div>
      <input id="lastName" name="lastName" type="text" class="profile-data-form-field__input" placeholder=" "  value="{{ lastName }}" disabled />
    </div>
  </div>

  <!-- <div class="divider"></div>

  <div class="profile-data__form-item">
    <label for="display_name" class="profile-data-form-field__label">Имя в чате</label>
    <div>
      <input id="display_name" name="display_name" type="text" class="profile-data-form-field__input" placeholder=" "  value="{{ display_name }}" disabled />
    </div>
  </div> -->

  <div class="divider"></div>

  <div class="profile-data__form-item">
    <label for="phone" class="profile-data-form-field__label">Телефон</label>
    <div>
      <input id="phone" name="phone" type="tel" class="profile-data-form-field__input" placeholder=" "  value="{{ phone }}" disabled />
    </div>
  </div>
`;
