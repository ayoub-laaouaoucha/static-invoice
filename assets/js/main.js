document.addEventListener("alpine:init", () => {
  Alpine.data("itemsData", () => ({
    step: 1,
    steps: [
      {
        title: "Billing",
        description: "Enter your billing information.",
        icon: "ri-bill-line",
      },
      {
        title: "Client",
        description: "Enter your client information.",
        icon: "ri-user-3-line",
      },
      {
        title: "Items",
        description: "Add items to the invoice.",
        icon: "ri-stack-line",
      },
      {
        title: "Payment",
        description: "Enter your payment information.",
        icon: "ri-bank-card-line",
      },
      {
        title: "Notes",
        description: "Add any additional notes or instructions.",
        icon: "ri-information-2-line",
      },
    ],
    open: false,
    title: "",
    info_banner: {
      color: "purple",
      title: "",
      message: "",
    },
    billing: {
      pricing: false,
      quantity: false,
      date: null,
      payment_date: null,
      company: "",
      ice: "",
      matricule: "",
      location: "Agadir, Morocco",
      // add image url
      logo: "",
      // add image url
      signature: "",
      footer: {
        title: "",
        description: "",
      },
      // you can add multiple contact inside this array
      contact: ["", ""],
      copyright: "",
      reduce_price: 0, // discount
      advance_paiment: 200,
      HT: 0, // Total before tax
      TVA: 0, // Tax rate (20%)
      TVA_amount: 0, // Amount of tax
      TTC: 0, // Total including tax
      total_price_amount: 0, // Total after reduction and including tax
      currency: "$",
    },
    client: {
      name: "",
      adresse: "",
      email: "",
      phone: "",
    },
    // list your product
    items: [
      {
        title: "",
        description: "",
        //you can add multiple options
        options: [""],
        price: 400,
        quantity: 1,
      },
    ],
    payment: {
      holder: "",
      RIB: "",
      IBAN: "",
      Code_SWIFT: "",
      Bank: "",
    },

    calculateTotals() {
      // Calculate HT (Total price before tax)
      const HT = this.items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

      // Calculate TVA amount (Tax amount)
      if (this.billing.TVA !== 0) {
        const TVA_amount = HT * (this.billing.TVA / 100);
        // Calculate TTC (Total price including tax)
        const TTC = HT + TVA_amount;

        // Apply any reductions
        const total_price_amount = TTC - this.billing.reduce_price;

        // Update the billing properties
        this.billing.HT = HT;
        this.billing.TVA_amount = TVA_amount;
        this.billing.TTC = TTC;
        this.billing.total_price_amount = total_price_amount;
      } else {
        // Apply any reductions
        const total_price_amount = HT - this.billing.reduce_price;

        // Update the billing properties
        this.billing.HT = 0;
        this.billing.TVA_amount = 0;
        this.billing.TTC = 0;
        this.billing.total_price_amount = total_price_amount;
      }
    },
    setStep(index) {
      this.step = index + 1;
    },
    newContact: "",
    addContact() {
      if (this.newContact.trim() !== "") {
        this.billing.contact.push(this.newContact.trim());
        this.newContact = "";
      }
    },
    removeContact(index) {
      this.billing.contact.splice(index, 1);
    },
    handleImageUpload(event, target) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.billing[target] = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    init() {
      this.calculateTotals();
    },
  }));
});
