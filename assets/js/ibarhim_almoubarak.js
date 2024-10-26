document.addEventListener('alpine:init', () => {
    Alpine.data('itemsData', () => ({
        title: "Ecommerce platfrom For wholesalers linked wit odoo",
        info_banner: {
            color: "yellow",
            title: "Important information!",
            message: "The work will be divided into three payment installments, and the estimated duration of the project is one month.",
        },
        billing: {
            pricing: false,
            quantity: false,
            date: new Date().toLocaleDateString(),
            matricule: "KUDINO36834513",
            location: "Agadir, Morocco",
            logo: "./assets/images/kudino-white-bg.svg",
            footer: {
                title: "Thank you!",
                description: "If you have any questions concerning this document, use the following contact information:"
            },
            contact: [
                "06 16 88 31 78",
                "06 36 61 42 16",
            ],
            copyright: "© 2024 KUDINO",
            reduce_price: 0,
            advance_paiment: 500,
            HT: 0,            // Total before tax
            TVA: 0,          // Tax rate (20%)
            TVA_amount: 0,    // Amount of tax
            TTC: 0,           // Total including tax
            total_price_amount: 0, // Total after reduction and including tax
            currency: "$",
        },
        client: {
            name: "Ibrahim Almubarak",
            adresse: "Riyadh , Saudi Arabia",
        },
        items: [
            {
                title: "User and Client Management with Odoo",
                description: "Manage all users and clients, including permissions and authentication.",
                options: [
                    "Login and authentication management",
                    "Register new users and clients",
                    "Secure authentication processes",
                ],
                price: 1000,
                quantity: 1,
            },
            {
                title: "Product Management Using Odoo",
                description: "Full control over product visibility, allowing you to show or hide items as needed in the store.",
                options: [
                    "Retrieve product list from Odoo",
                    "Store and manage product information",
                    "Edit product details",
                    "Perform product testing",
                ],
                price: 1000,
                quantity: 1,
            },
            {
                title: "Order Management",
                description: "Enable clients to manage their orders and view detailed statistics.",
                options: [
                    "View order list and current status",
                    "Generate transaction and order reports",
                ],
                price: 500,
                quantity: 1,
            },
        ],
        payment: {
            holder: "AYOUB LAAOUAOUCHA",
            RIB: "230 022 2909683211031600 69",
            IBAN: "MA64 2300 2229 0968 3211 0316 0069",
            Code_SWIFT: "CIHMMAMC",
            Bank: "CIH bank",
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