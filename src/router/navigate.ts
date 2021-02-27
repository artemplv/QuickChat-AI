function navigate(path: string) {
  console.log('navigate');
  const pushStateEvent = new CustomEvent('_pushstate', { detail: path });
  window.dispatchEvent(pushStateEvent);
};
