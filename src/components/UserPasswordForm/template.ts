export const template = `
  <div class="profile-data__form-item">
    <label for="oldPassword" class="profile-data-form-field__label">Старый пароль</label>
    <div>
      <input id="oldPassword" name="oldPassword" type="password" class="profile-data-form-field__input" placeholder="пароль"  />
    </div>
  </div>

  <div class="divider"></div>

  <div class="profile-data__form-item">
    <label for="newPassword" class="profile-data-form-field__label">Новый пароль</label>
    <div>
      <input id="newPassword" name="newPassword" type="password" class="profile-data-form-field__input" placeholder="пароль"  />
    </div>
  </div>

  <div class="divider"></div>

  <div class="profile-data__form-item">
    <label for="newPasswordRepeat" class="profile-data-form-field__label">Повторите новый пароль</label>
    <div>
      <input id="newPasswordRepeat" name="password_repeat" type="password" class="profile-data-form-field__input" placeholder="пароль"  />
    </div>
  </div>
`;
