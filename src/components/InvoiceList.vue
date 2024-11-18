<template>
  <div class="invoice-list">
    <h1>Mijn Facturen</h1>
    <table class="invoice-table">
      <thead>
      <tr>
        <th>Factuurnummer</th>
        <th>Omschrijving</th>
        <th>Datum</th>
        <th>Vervaldatum</th>
        <th>Bedrag</th>
        <th>Acties</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="invoice in invoices" :key="invoice.id">
        <td>{{ invoice.invoiceNumber }}</td>
        <td>{{ invoice.description }}</td>
        <td>{{ formatDate(invoice.invoiceDate) }}</td>
        <td>{{ formatDate(invoice.dueDate) }}</td>
        <td>€ {{ invoice.totalAmount.toFixed(2) }}</td>
        <td>
          <button @click="downloadInvoice(invoice.id)">Download PDF</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'InvoiceList',
  data() {
    return {
      invoices: [],
    };
  },
  methods: {
    async fetchInvoices() {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const response = await axios.get(`http://localhost:8080/api/v1/invoices/client/${loggedInUser.id}`);
        this.invoices = response.data;
      } catch (error) {
        console.error('Error fetching invoices:', error);
        alert('Er is iets misgegaan bij het ophalen van uw facturen.');
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('nl-NL', options);
    },
    async downloadInvoice(invoiceId) {
      try {
        const response = await axios.get(
            `http://localhost:8080/api/v1/invoices/generate-pdf/${invoiceId}`,
            { responseType: 'blob' }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `invoice_${invoiceId}.pdf`);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error('Error downloading invoice:', error);
        alert('Er is iets misgegaan bij het downloaden van de factuur.');
      }
    },
  },
  mounted() {
    this.fetchInvoices();
  },
};
</script>

<style scoped>
.invoice-list {
  max-width: 800px;
  margin: 50px auto;
}

.invoice-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.invoice-table th,
.invoice-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.invoice-table th {
  background-color: #001f3f;
  color: white;
}

.invoice-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.invoice-table tr:hover {
  background-color: #f1f1f1;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}
</style>
