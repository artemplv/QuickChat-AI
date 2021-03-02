Handlebars.registerHelper('ifLessThanOne', function(value: number | undefined): string {
  if (!value || value < 1) {
    return 'hidden';
  }
  return '';
});

export const template = `
  <div class="chats">
    <div class="chats_header">
      {{{ profileButton }}}

      <form id="searchForm" class="search-form">
        <input name="search" type="text" class="search__input" placeholder="Поиск" />
      </form>
    </div>

    <nav class="chats-container">

      <div style="text-align: center; margin-bottom: 10px;">
        {{{ createChatButton }}}
      </div>

      <ul class="chats-container__list">
        {{#each chatsList}}
          <li class="chat-list-item" key={{ this.id }} onclick="navigate('/chat/{{ this.id }}')">
            <div
              class="avatar"
              style="background-image: url({{ this.avatar }}"
            ></div>
            <div class="chat-list-item__info">
              <div class="chat-list-item__name-container">
                <h4 class="chat-list-item__name">{{ this.title }}</h4>
                <p class="chat-list-item__last-message-time">{{ this.lastMessageTime }}</p>
              </div>

              <div class="chat-list-item__last-message-container">
                <p class="chat-list-item__last-message-text">
                  <span
                    class="last-message-from-user-label"
                    {{#unless this.isLastMessageFromUser}}
                      hidden
                    {{/unless}}
                  >
                    Вы:&nbsp;
                  </span>
                  {{ this.lastMessageText }}
                </p>
                <div
                  class="chat-list-item__unread-message-count"
                  {{#ifLessThanOne this.unreadMessagesCount}}
                  {{/ifLessThanOne}}
                >
                  <span class="chat-list-item__unread-message-count-number">{{ this.unreadMessagesCount }}<span>
                </div>
              </div>
            </div>
          </li>
        {{/each}}
      </ul>
    </nav>

    <div id="create-chat-modal" class="modal-wrapper">
      <form id="newChat" class="modal-body">
        <h4 class="modal-body__name">Создать новый чат</h4>

        <div class="form-field">
          <div class="form-field__control">
            <input id="chat-add-title" name="title" type="text" class="form-field__input" placeholder=" "  />
            <label for="chat-add-title" class="form-field__label">Название чата</label>
            <div class="form-field__bar"></div>
          </div>
        </div>

        <button type="submit" class="button button_main">
          Создать
        </button>
      </form>
    </div>
  </div>
`;
