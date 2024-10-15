document.addEventListener('alpine:init', () => {
    Alpine.data('itemsData', () => ({
        title: "Houbara.com.qa website",
        info_banner: {
            color: "purple",
            title: "",
            message: "",
        },
        billing: {
            pricing: true,
            quantity: true,
            date: new Date().toLocaleDateString(),
            matricule: "KUDINO36834503",
            location: "Agadir, Morocco",
            logo: "./assets/images/kudino-white-bg.svg",
            footer: {
                title: "Thank you!",
                description: "If you have any questions concerning this document, use the following contact information:"
            },
            contact: [
                "06 16 88 31 78",
            ],
            copyright: "© 2024 KUDINO",
            reduce_price: 0,
            advance_paiment: 0,
            HT: 0,            // Total before tax
            TVA: 0,          // Tax rate (20%)
            TVA_amount: 0,    // Amount of tax
            TTC: 0,           // Total including tax
            total_price_amount: 0, // Total after reduction and including tax
            currency: "QAR",
        },
        client: {
            name: "Mesnad Abdul Latif Al-Mesnad",
            adresse: "Qatar",
        },
        items: [
            {
                title: "Create static website",
                description: "create a website to present the informations of association birds 'albaydaa' focusing on houbara bird",
                options: [
                    "Creating a website for Houbara birds",
                    "Transfer and install the website on houbara.com.qa hosting",
                    "Providing a website",
                    "security system",
                ],
                price: 870,
                quantity: 1,
            },
        ],
        payment: {
            // holder: "AYOUB LAAOUAOUCHA",
            // RIB: "230 022 2909683211031600 69",
            // IBAN: "MA64 2300 2229 0968 3211 0316 0069",
            // Code_SWIFT: "CIHMMAMC",
            // Bank: "CIH bank",
        },

        calculateTotals() {
            // Calculate HT (Total price before tax)
            const HT = this.items.reduce((acc, item) => {
                return acc + (item.price * item.quantity);
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

        init() {
            this.calculateTotals();
        }
    }));
});