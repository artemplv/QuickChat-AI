import Handlebars from 'handlebars';
import formatDateTime from '../../utils/formatDateTime';

type UserId = number | string | undefined;

Handlebars.registerHelper('ifLessThanOne', (value: number | undefined): string => {
  if (!value || value < 1) {
    return 'hidden';
  }
  return '';
});

Handlebars.registerHelper('formatDatetime', (value: string | undefined): string => {
  if (!value) {
    return '';
  }

  return formatDateTime(value);
});

Handlebars.registerHelper('messageFromCurrentUserVisibility', (loggedUserId: UserId, messageFromUserId: UserId): string => {
  if (loggedUserId === messageFromUserId) {
    return '';
  }
  return 'hidden';
});

Handlebars.registerHelper('isChatSelected', (chatId: string, selectedChatId: string | null | undefined) => {
  return chatId === selectedChatId;
});

export default `
  <div class="chats">
    <div class="chats_header">
      {{{ profileButton }}}

      <form id="searchForm" class="search-form">
        <input name="search" type="text" class="search__input" placeholder="Search" />
      </form>
    </div>

    <nav class="chats-container">

      <div style="text-align: center; margin-bottom: 10px;">
        {{{ createChatButton }}}
      </div>

      <ul class="chats-container__list">
        {{#each chatsList}}
          <li class="chat-list-item {{#if (isChatSelected this.id ../selectedChatId)}}selected{{/if}}"
            key={{ this.id }}
            onclick="navigate('/chats/{{ this.id }}')"
          >
            <div
              class="avatar"
              {{#if this.avatar}}
                style="background-image: url({{ this.avatar }}); background-size: cover;"
              {{/if}}
            ></div>
            <div class="chat-list-item__info">
              <div class="chat-list-item__name-container">
                <h4 class="chat-list-item__name">{{ this.name }}</h4>
                <p class="chat-list-item__last-message-time">
                  {{#formatDatetime this.lastMessage.createdAt}}{{/formatDatetime}}
                </p>
              </div>

              <div class="chat-list-item__last-message-container">
                <p class="chat-list-item__last-message-text">
                  <span
                    class="last-message-from-user-label"
                    {{#messageFromCurrentUserVisibility ../loggedUserId this.lastMessage.userId}}
                    {{/messageFromCurrentUserVisibility}}
                  >
                    You:&nbsp;
                  </span>
                  {{ this.lastMessage.content }}
                </p>
                <div
                  class="chat-list-item__unread-message-count"
                  {{#ifLessThanOne this.unreadMessagesCount}}
                  {{/ifLessThanOne}}
                >
                  <span class="chat-list-item__unread-message-count-number">{{ this.unreadMessagesCount }}</span>
                </div>
              </div>
            </div>
          </li>
        {{/each}}
      </ul>
    </nav>

    <div id="create-chat-modal" class="modal-wrapper">
      <form id="newChat" class="modal-body">
        <h4 class="modal-body__name">Create new chat</h4>

        <div class="form-field">
          <div class="form-field__control">
            <input id="chat-add-title" name="name" type="text" class="form-field__input" placeholder=" "  />
            <label for="chat-add-title" class="form-field__label">Chat name</label>
            <div class="form-field__bar"></div>
          </div>
        </div>

        <button type="submit" class="button button_main">
          Create
        </button>
      </form>
    </div>
  </div>
`;
