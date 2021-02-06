export const template = `
  <div class="chat-block">
    <div class="chat-block__info-row">
      <div class="avatar-with-name">
        <div class="chat-list-item__avatar"></div>
        <h4 class="chat-list-item__name">{{ chatName }}</h4>
      </div>

      <div class="dropdown">
        {{{ chatOptionsDropdownButton }}}

        <div class="dropdown-content">
          <ul class="buttons-list">
            <li>
              {{{ addUserButton }}}
            </li>
            <li>
              {{{ deleteUserButton }}}
            </li>
            <li>
              {{{ deleteChatButton }}}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="chat-block__create-message-row">
      <div class="dropdown">
        {{{ messageOptionsButton }}}

        <div class="dropdown-content-top">
          <ul class="buttons-list">
            <li>
              {{{ addMediaButton }}}
            </li>
            <li>
              {{{ addFileButton }}}
            </li>
            <li>
              {{{ addLocationButton }}}
            </li>
          </ul>
        </div>
      </div>
      {{{ newMessageForm }}}
    </div>

  </div>
`;
