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

export const containerVariants={
    hidden:{opacity:0} ,
    visible:{
        opacity:1
        , transition :{
            staggerChildren:0.2,
            delayChildren:0.1
        }
    }
}

export const itemVariants={
    hidden:{opacity:0,y:20} ,
    visible:{
        opacity:1
        , transition :{
            type:'spring',
            damping:15,
            stiffness:50,
            duration:0.8
        }
    }
}

export const buttonVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 300,
    },
  },
};

