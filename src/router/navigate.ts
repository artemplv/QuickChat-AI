export function navigate(path: string) { // eslint-disable-line import/prefer-default-export
  if (path === window.location.pathname) {
    return;
  }

  const pushStateEvent = new CustomEvent('_pushstate', { detail: path });
  window.dispatchEvent(pushStateEvent);
}

declare global {
  interface Window {
    navigate: any;
  }
}

window.navigate = navigate;
