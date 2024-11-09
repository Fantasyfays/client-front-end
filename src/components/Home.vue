<template>
  <div class="home-container">
    <h1>Welcome, {{ username }}!</h1>
    <button @click="navigateToInvoice">Go to Invoice</button>
    <button @click="logoutUser">Logout</button>
  </div>
</template>

<script>
import { logout } from '../services/clientService';

export default {
  data() {
    return {
      username: ''
    };
  },
  created() {
    this.username = this.getUsernameFromCookie();
  },
  methods: {
    getUsernameFromCookie() {
      const name = 'username=';
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookieArray = decodedCookie.split(';');
      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
        }
      }
      return '';
    },
    navigateToInvoice() {
      this.$router.push('/invoice');
    },
    async logoutUser() {
      try {
        await logout();
        document.cookie = 'username=; Max-Age=0';
        this.$router.push('/');
      } catch (error) {
        console.error("Failed to log out:", error);
      }
    }
  }
};
</script>

<style scoped>
.home-container {
  text-align: center;
  margin-top: 20px;
}
</style>
