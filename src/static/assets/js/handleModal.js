/**
 * Управление модальным окном
 * @param {string} modalId
 */
function handleModal(modalId) {
  const modal = document.getElementById(modalId);

  modal.style.display = 'flex';

  const modalBody = document.querySelector(`#${modalId} .modal-body`);

  const listener = (event) => {
    const isClickInside = modalBody.contains(event.target);

    if (!isClickInside) {
      modal.style.display = 'none';
      document.removeEventListener('click', listener);
    }
  }

  setTimeout(() => {
    document.addEventListener('click', listener);
  }, 200);
}
