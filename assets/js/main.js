document.addEventListener('alpine:init', () => {
    Alpine.data('itemsData', () => ({
        title: "Create ROBOTICA subscription using LARAVEL, VUE JS, and TAILWIND CSS with ODOO",
        info_banner: {
            color: "purple",
            title: "",
            message: "",
        },
        billing: {
            pricing: false,
            quantity: false,
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
                "06 36 61 42 16",
            ],
            copyright: "© 2024 KUDINO",
            reduce_price: 0,
            advance_paiment: 200,
            HT: 0,            // Total before tax
            TVA: 0,          // Tax rate (20%)
            TVA_amount: 0,    // Amount of tax
            TTC: 0,           // Total including tax
            total_price_amount: 0, // Total after reduction and including tax
            currency: "$",
        },
        client: {
            name: "MR Ibraheem Alhudaithi",
            adresse: "Riyadh , Saudi Arabia",
        },
        items: [
            {
                title: "Users and clients management with odoo",
                description: "Manage all your users and clients permissions and authentication.",
                options: [
                    "Login and authentication management",
                    "Register new users and clients",
                    "Manage all users and clients data",
                    "Securing the authentication",
                ],
                price: 400,
                quantity: 1,
            },
            {
                title: "Subscription management using odoo",
                description: "Recurring billing & subscriber management the easy way.",
                options: [
                    "Get the list of subscriptions for your application",
                    "Store and manage all clients billing information",
                    "Generate reports and statistics information",
                    "Testing",
                ],
                price: 400,
                quantity: 1,
            },
            {
                title: "Purchase management using odoo",
                description: "Create your addons product with variants and manage the orders and payments.",
                options: [
                    "Product or services management",
                    "Order management",
                    "Payments management",
                ],
                price: 90,
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