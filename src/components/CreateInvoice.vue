<template>
  <div class="create-invoice">
    <h1>Factuur Aanmaken</h1>
    <form @submit.prevent="createInvoice" class="invoice-form">
      <fieldset>
        <legend>Factuur Details</legend>
        <div class="form-group">
          <label for="description">Omschrijving</label>
          <input
              type="text"
              id="description"
              v-model="invoice.description"
              placeholder="Omschrijving van de factuur"
              required
          />
        </div>
        <div class="form-group">
          <label for="quantity">Aantal</label>
          <input
              type="number"
              id="quantity"
              v-model="invoice.quantity"
              placeholder="Aantal"
              required
          />
        </div>
        <div class="form-group">
          <label for="unitPrice">Prijs per stuk</label>
          <input
              type="number"
              step="0.01"
              id="unitPrice"
              v-model="invoice.unitPrice"
              placeholder="Prijs per stuk"
              required
          />
        </div>
        <div class="form-group">
          <label for="invoiceDate">Factuurdatum</label>
          <input
              type="date"
              id="invoiceDate"
              v-model="invoice.invoiceDate"
              required
          />
        </div>
        <div class="form-group">
          <label for="dueDate">Vervaldatum</label>
          <input
              type="date"
              id="dueDate"
              v-model="invoice.dueDate"
              required
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Ontvanger Details</legend>
        <div class="form-group">
          <label for="recipientName">Naam Ontvanger</label>
          <input
              type="text"
              id="recipientName"
              v-model="invoice.recipientName"
              placeholder="Naam van de ontvanger"
              required
          />
        </div>
        <div class="form-group">
          <label for="recipientCompany">Bedrijf Ontvanger</label>
          <input
              type="text"
              id="recipientCompany"
              v-model="invoice.recipientCompany"
              placeholder="Naam van het bedrijf"
              required
          />
        </div>
        <div class="form-group">
          <label for="recipientAddress">Adres Ontvanger</label>
          <input
              type="text"
              id="recipientAddress"
              v-model="invoice.recipientAddress"
              placeholder="Adres van de ontvanger"
              required
          />
        </div>
        <div class="form-group">
          <label for="recipientEmail">Email Ontvanger</label>
          <input
              type="email"
              id="recipientEmail"
              v-model="invoice.recipientEmail"
              placeholder="Email van de ontvanger"
              required
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Betalingsgegevens</legend>
        <div class="form-group">
          <label for="paymentTerms">Betaalvoorwaarden</label>
          <input
              type="text"
              id="paymentTerms"
              v-model="invoice.paymentTerms"
              placeholder="Betaalvoorwaarden"
          />
        </div>
        <div class="form-group">
          <label for="paymentCurrency">Betaalmunt</label>
          <input
              type="text"
              id="paymentCurrency"
              v-model="invoice.paymentCurrency"
              placeholder="Betaalmunt (bijv. EUR)"
          />
        </div>
      </fieldset>

      <button type="submit" class="submit-button">Factuur Aanmaken</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateInvoice",
  data() {
    return {
      invoice: {
        description: "",
        quantity: 0,
        unitPrice: 0.0,
        invoiceDate: "",
        dueDate: "",
        taxRate: 0.0,
        recipientName: "",
        recipientCompany: "",
        recipientAddress: "",
        recipientEmail: "",
        paymentTerms: "",
        paymentCurrency: "EUR",
      },
      clientId: null,
    };
  },
  methods: {
    async fetchClientData() {
      try {
        const response = await axios.get(
            `http://localhost:8080/api/v1/clients/${this.clientId}`
        );
        const client = response.data;

        // Vul relevante velden automatisch in
        this.invoice.paymentTerms = client.defaultPaymentTerms || "";
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    },
    async createInvoice() {
      try {
        await axios.post(
            `http://localhost:8080/api/v1/invoices/create?clientId=${this.clientId}`,
            this.invoice
        );
        alert("Factuur succesvol aangemaakt!");
        this.$router.push("/");
      } catch (error) {
        console.error("Fout bij het aanmaken van de factuur:", error);
        alert("Er is iets misgegaan bij het aanmaken van de factuur.");
      }
    },
  },
  mounted() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      this.clientId = loggedInUser.id;
      this.fetchClientData();
    } else {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
.create-invoice {
  background-color: #001f3f;
  color: #fcbf49;
  padding: 20px;
  border-radius: 10px;
  max-width: 700px;
  margin: 40px auto;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.5s ease-in-out;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.invoice-form {
  display: flex;
  flex-direction: column;
}

fieldset {
  border: 1px solid #fcbf49;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 15px;
}

legend {
  font-size: 18px;
  font-weight: bold;
  padding: 0 10px;
  color: #fcbf49;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #fcbf49;
  outline: none;
}

.submit-button {
  background-color: #fcbf49;
  color: #001f3f;
  font-size: 16px;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.submit-button:hover {
  background-color: #ffc107;
  transform: scale(1.02);
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
