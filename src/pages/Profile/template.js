export const template = `
  <div class="profile-view">

  <div class="go-back-section">
    {{{ goBackButton }}}
  </div>

  <main>
    <div class="profile-data-wrapper">
      <div class="profile-data">
        <div class="profile-data__avatar">
          {{{ changeAvatarButton }}}
        </div>

        {{{ changeDataForm }}}
        {{{ changePasswordForm }}}

        <div class="profile-data__control-buttons">
          {{{ changeDataButton }}}

          <div class="divider"></div>

          {{{ changePasswordButton }}}

          <div class="divider"></div>

          {{{ logoutButton }}}
        </div>

      </div>
    </div>
  </main>

  </div>
`;
