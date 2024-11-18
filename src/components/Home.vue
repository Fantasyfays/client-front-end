<template>
  <div class="home-container">
    <h1>Welkom bij NRFA Boekhouden</h1>
    <p>
      Beheer uw boekhouding eenvoudig en efficiënt met onze professionele
      oplossingen.
    </p>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
.home-container {
  max-width: 800px;
  margin: 50px auto;
  text-align: center;
  background: linear-gradient(135deg, #001f3f, #001a35);
  padding: 30px;
  border-radius: 10px;
  color: #fcbf49;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: slideIn 1s ease-out;
}

h1 {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
  line-height: 1.6;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
