const sessionStorageAuth = {
  login: (token: string, userId: string) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId', userId);
  },

  logout: () => {
    sessionStorage.clear();
  },
};

export default sessionStorageAuth;
