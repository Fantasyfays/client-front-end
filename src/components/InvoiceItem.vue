<template>
  <div class="invoice-item">
    <input type="text" v-model="item.description" placeholder="Itembeschrijving" required />
    <input type="number" v-model="item.quantity" placeholder="Aantal" min="1" required />
    <input type="number" v-model="item.unitPrice" placeholder="Prijs per eenheid" min="0" required />
    <span>Totaal: {{ item.quantity * item.unitPrice }}</span>
    <button @click="$emit('remove-item')">Verwijder</button>
  </div>
</template>

<script>
export default {
  props: ['item'],
};
</script>