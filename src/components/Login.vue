<template>
  <div class="login-container">
    <h1>Welkom Terug</h1>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="username">Gebruikersnaam</label>
        <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Voer je gebruikersnaam in"
            required
        />
      </div>

      <div class="form-group">
        <label for="password">Wachtwoord</label>
        <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Voer je wachtwoord in"
            required
        />
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <button type="submit" class="login-button">Inloggen</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8080/users/login', {
          username: this.username,
          password: this.password,
        });

        localStorage.setItem('loggedInUser', JSON.stringify(response.data));
        this.$router.push('/');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.error = 'Onjuiste gebruikersnaam of wachtwoord.';
        } else {
          this.error = 'Er is iets misgegaan. Probeer het later opnieuw.';
        }
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 10px;
  background: linear-gradient(135deg, #001f3f, #001a35);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  color: #fcbf49;
  animation: fadeIn 1s ease-out;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #fcbf49;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #fcbf49;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f4f4f4;
}

input:focus {
  outline: none;
  border-color: #fcbf49;
  box-shadow: 0 0 5px rgba(252, 191, 73, 0.8);
}

.error-message {
  color: red;
  margin-bottom: 20px;
  text-align: center;
}

.login-button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  color: #001f3f;
  background-color: #fcbf49;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.login-button:hover {
  background-color: #e8ae3d;
  transform: scale(1.05);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
