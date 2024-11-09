<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { loginClient } from '../services/clientService';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await loginClient({
          username: this.username,
          password: this.password
        });

        document.cookie = `username=${response.data.username}; path=/`;
        this.$router.push('/home');
      } catch (error) {
        this.errorMessage = "Login failed. Check your username and password.";
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  text-align: center;
  margin-top: 20px;
}
</style>
