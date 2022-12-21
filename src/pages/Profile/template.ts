export default `
  <div class="profile-view">

  <div class="go-back-section">
    {{{ goBackButton }}}
  </div>

  <main>
    <div class="profile-data-wrapper">
      <div class="profile-data">
        <div
          class="profile-data__avatar"
        >
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

  <div id="uploadAvatarModal" class="modal-wrapper">
    <div class="modal-body">
      <h4 class="modal-body__name">Upload a picture</h4>

      <form id="avatarForm" class="form">
        <div class="file-container">
          <div class="upload-control">
            <label for="avatar" class="avatar-upload-label">Choose file</label>
            <input id="avatar" class="avatar-upload-input" name="avatar" type="file" accept=".jpg, .jpeg, .png">
          </div>
          <p class="file-name"></p>
        </div>

        <button type="submit" class="button button_main">
          Confirm
        </button>
      </form>

      <p class="modal-body__error-msg">Need to select a file</p>
    </div>
  </div>

  </div>
`;
