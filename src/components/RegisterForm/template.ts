export const template = `
  <h1 class="sign-form__heading sign-up-form__heading">Регистрация</h1>

  <div class="form-fields-wrapper sign-up-form-fields-wrapper">
    <div class="form-field">
      <div class="form-field__control">
        <input id="email" name="email" type="email" class="form-field__input" placeholder=" " required />
        <label for="email" class="form-field__label">Почта</label>
        <div class="form-field__bar"></div>
      </div>
    </div>

    <div class="form-field">
      <div class="form-field__control">
        <input id="login" name="login" type="text" class="form-field__input" placeholder=" " required />
        <label for="login" class="form-field__label">Логин</label>
        <div class="form-field__bar"></div>
      </div>
    </div>

    <div class="form-field">
      <div class="form-field__control">
        <input id="first_name" name="first_name" type="text" class="form-field__input" placeholder=" " required />
        <label for="first_name" class="form-field__label">Имя</label>
        <div class="form-field__bar"></div>
      </div>
    </div>

    <div class="form-field">
      <div class="form-field__control">
        <input id="second_name" name="second_name" type="text" class="form-field__input" placeholder=" " required />
        <label for="second_name" class="form-field__label">Фамилия</label>
        <div class="form-field__bar"></div>
      </div>
    </div>

    <div class="form-field">
      <div class="form-field__control">
        <input id="phone" name="phone" type="tel" class="form-field__input" placeholder=" " required />
        <label for="phone" class="form-field__label">Телефон</label>
        <div class="form-field__bar"></div>
      </div>
    </div>

    <div class="form-field">
      <div class="form-field__control">
        <input id="password" name="password" type="password" class="form-field__input" placeholder=" " required />
        <label for="password" class="form-field__label">Пароль</label>
        <div class="form-field__bar"></div>
      </div>
    </div>

    <div class="form-field">
      <div class="form-field__control">
        <input id="password_repeat" name="password_repeat" type="password" class="form-field__input" placeholder=" " required />
        <label for="password_repeat" class="form-field__label">Пароль (ещё раз)</label>
        <div class="form-field__bar"></div>
      </div>
    </div>
  </div>
`;
