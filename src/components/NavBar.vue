<template>
  <nav class="navbar">
    <div class="navbar-logo">
      <router-link to="/">NRFA Boekhouden</router-link>
    </div>
    <ul class="navbar-links">
      <li v-if="!loggedInUser">
        <router-link to="/login">Inloggen</router-link>
      </li>
      <li v-if="loggedInUser">
        <router-link to="/">Home</router-link>
      </li>
      <li v-if="loggedInUser">
        <router-link to="/create-invoice">Nieuwe Factuur</router-link>
      </li>
      <li v-if="loggedInUser">
        <router-link to="/invoices">Mijn Facturen</router-link>
      </li>
      <li v-if="loggedInUser">
        <button @click="logout">Uitloggen</button>
      </li>
    </ul>
  </nav>
</template>


<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'NavBar',
  setup() {
    const loggedInUser = ref(null);

    const checkLoginStatus = () => {
      const user = localStorage.getItem('loggedInUser');
      loggedInUser.value = user ? JSON.parse(user) : null;
    };

    const logout = () => {
      localStorage.removeItem('loggedInUser');
      loggedInUser.value = null;
      location.reload();
    };

    onMounted(() => {
      checkLoginStatus();
    });

    return {
      loggedInUser,
      logout,
    };
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Zorgt ervoor dat alle items op dezelfde lijn staan */
  background-color: #001f3f; /* Donkerblauw */
  padding: 15px 30px;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-logo a {
  font-size: 24px;
  font-weight: bold;
  color: #fcbf49; /* Goud */
  text-decoration: none;
  transition: transform 0.3s ease;
}

.navbar-logo a:hover {
  transform: scale(1.1);
  text-shadow: 0px 4px 6px rgba(252, 191, 73, 0.8);
}

.navbar-links {
  display: flex;
  gap: 20px; /* Zorgt voor gelijke ruimte tussen items */
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar-links li {
  display: flex;
  align-items: center; /* Zorgt dat de inhoud gecentreerd is */
}

.navbar-links a,
.navbar-links button {
  color: #fcbf49;
  text-decoration: none;
  background: none;
  border: none;
  padding: 10px 15px; /* Gelijke padding voor alle knoppen */
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.navbar-links a:hover,
.navbar-links button:hover {
  background-color: #fcbf49;
  color: #001f3f;
  box-shadow: 0 4px 8px rgba(252, 191, 73, 0.5);
  text-decoration: none;
}

.navbar-links button {
  font-family: inherit;
  text-transform: uppercase;
}
</style>
