/**
 * Генерация HTML списка чатов
 * @param {Chat[]} chats
 * @return {HTMLUListElement}
 */
function makeChatsList(chats) {
  const fragment = document.createDocumentFragment();
  const list = document.createElement('ul');

  chats.forEach((item) => {
    const {
      title,
      lastMessageTime,
      lastMessageText,
      unreadMessagesCount = 0,
      isLastMessageFromUser = false,
    } = item;

    const listItem = document.createElement('li');

    listItem.innerHTML = `
      <div class="chat-list-item__avatar"></div>
      <div class="chat-list-item__info">
        <div class="chat-list-item__name-container">
          <h4 class="chat-list-item__name">${title}</h4>
          <p class="chat-list-item__last-message-time">${lastMessageTime}</p>
        </div>

        <div class="chat-list-item__last-message-container">
          <p class="chat-list-item__last-message-text">
            <span class="last-message-from-user-label">Вы:&nbsp;</span>
            ${lastMessageText}
          </p>
          <div class="chat-list-item__unread-message-count">
            <span class="chat-list-item__unread-message-count-number">${unreadMessagesCount}<span>
          </div>
        </div>
      </div>
    `;

    listItem.classList.add("chat-list-item");

    if (!isLastMessageFromUser) {
      listItem.querySelector(".last-message-from-user-label").hidden = true;
    }

    if (unreadMessagesCount < 1) {
      listItem.querySelector(".chat-list-item__unread-message-count").hidden = true;
    }

    list.appendChild(listItem);
  });

  list.classList.add("chats-container__list");

  fragment.appendChild(list);
  return fragment;
}
