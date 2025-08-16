import { isDev } from "./helper";

export const pricingPlans=[
    {
        id:'basic',
        name:'Basic',
        price:0,
        items:[
            '5 PDF summaries per month',
            'Standard processing speed',
            'Email support'
        ],
        description:'Perfect for occasional use',
        paymentLink:'/upload',
        priceId:'basicplan'
    },
    {
        id:'pro',
        name:'Pro',
        price:99,
        description:'For professionals and team',
        items:[
            'Unlimited PDF summaries',
            'Priority processing',
            '24/7 priority support',
            'Markdown export'
        ],
        paymentLink: isDev ? 'https://buy.stripe.com/test_bJecN5gtE3xC5W528TabK00':'',
        priceId: isDev ? 'price_1RwdooFBJX9v996V7Eq1u1E6':''
    },
];