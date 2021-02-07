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
      <ul class="chats-container__list">
        {{#each chatsList}}
          <li class="chat-list-item">
            <div class="chat-list-item__avatar"></div>
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
  </div>
`;
