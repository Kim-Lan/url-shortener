import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')));
  const accessToken = ref(localStorage.getItem('token'));

  function saveUser() {
    localStorage.setItem('user', JSON.stringify(user.value));
  }

  function saveAccessToken() {
    localStorage.setItem('token', accessToken.value);
  }

  function setUser(newUser) {
    user.value = newUser;
    saveUser();
  }

  function setAccessToken(newToken) {
    console.log(`access token ${newToken}`)
    accessToken.value = newToken;
    saveAccessToken();
  }

  return { user, accessToken, setUser, setAccessToken }
});
