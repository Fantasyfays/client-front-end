<template>
  <div class="create-invoice">
    <h2>Nieuwe Factuur Aanmaken</h2>
    <form @submit.prevent="submitInvoice">
      <input type="text" v-model="invoice.invoiceNumber" placeholder="Factuurnummer" required />
      <input type="date" v-model="invoice.invoiceDate" placeholder="Factuurdatum" required />
      <input type="date" v-model="invoice.dueDate" placeholder="Vervaldatum" required />

      <input type="text" v-model="invoice.customerName" placeholder="Klantnaam" required />
      <input type="text" v-model="invoice.customerAddress" placeholder="Klantadres" required />
      <input type="email" v-model="invoice.customerEmail" placeholder="Klant e-mail" required />
      <input type="text" v-model="invoice.customerPhone" placeholder="Klant telefoonnummer" required />

      <input type="text" v-model="invoice.companyName" placeholder="Bedrijfsnaam" required />
      <input type="text" v-model="invoice.companyAddress" placeholder="Bedrijfsadres" required />
      <input type="text" v-model="invoice.companyPhone" placeholder="Bedrijf telefoonnummer" required />
      <input type="text" v-model="invoice.companyTaxId" placeholder="BTW-nummer" required />

      <input type="number" v-model="invoice.subtotal" placeholder="Subtotaal" min="0" required />
      <input type="number" v-model="invoice.tax" placeholder="Belasting" min="0" required />
      <input type="number" v-model="invoice.totalAmount" placeholder="Totaalbedrag" min="0" required />

      <input type="text" v-model="invoice.paymentTerms" placeholder="Betalingsvoorwaarden" />
      <textarea v-model="invoice.notes" placeholder="Opmerkingen"></textarea>

      <h3>Factuuritems</h3>
      <button type="button" @click="addItem">Item toevoegen</button>
      <div v-for="(item, index) in invoice.items" :key="index">
        <InvoiceItem :item="item" @remove-item="removeItem(index)" />
      </div>

      <button type="submit">Factuur Opslaan</button>
    </form>
  </div>
</template>

<script>
import InvoiceItem from '@/components/InvoiceItem.vue';
import { createInvoice } from '@/services/invoiceService';

export default {
  components: {
    InvoiceItem,
  },
  data() {
    return {
      invoice: {
        invoiceNumber: '',
        invoiceDate: '',
        dueDate: '',
        customerName: '',
        customerAddress: '',
        customerEmail: '',
        customerPhone: '',
        companyName: '',
        companyAddress: '',
        companyPhone: '',
        companyTaxId: '',
        subtotal: 0,
        tax: 0,
        totalAmount: 0,
        paymentTerms: '',
        notes: '',
        items: [],
      },
    };
  },
  methods: {
    addItem() {
      this.invoice.items.push({description: '', quantity: 1, unitPrice: 0});
    },
    removeItem(index) {
      this.invoice.items.splice(index, 1);
    },
    async submitInvoice() {
      if (this.validateForm()) {
        try {
          await createInvoice(this.invoice);
          alert('Factuur succesvol aangemaakt!');
          this.resetForm();
        } catch (error) {
          console.error(error);
          alert('Er is een fout opgetreden bij het aanmaken van de factuur.');
        }
      }
    },
    validateForm() {
      if (this.invoice.items.length === 0) {
        alert('Een factuur moet minimaal één item bevatten.');
        return false;
      }
      for (let item of this.invoice.items) {
        if (item.quantity <= 0 || item.unitPrice < 0) {
          alert('Elk item moet een positieve hoeveelheid en een niet-negatieve eenheidsprijs hebben.');
          return false;
        }
      }
      return true;
    },
    resetForm() {
      this.invoice = {
        invoiceNumber: '',
        invoiceDate: '',
        dueDate: '',
        customerName: '',
        customerAddress: '',
        customerEmail: '',
        customerPhone: '',
        companyName: '',
        companyAddress: '',
        companyPhone: '',
        companyTaxId: '',
        subtotal: 0,
        tax: 0,
        totalAmount: 0,
        paymentTerms: '',
        notes: '',
        items: [],
      };
    },
  },
};
</script>