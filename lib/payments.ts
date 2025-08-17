import Stripe from "stripe";
import { getDbConnection } from "./db";
import { use } from "react";
import { userAgent } from "next/server";
type UpdateProps={
    fullName:string;
    customerId:string;
    email:string;
    priceId:string;
    status:string
}

export async function handleCheckoutSessionCompleted({session,stripe}:{session:Stripe.Checkout.Session;stripe:Stripe}) {
    console.log("checkout session complted",session)
 const customerId= session.customer as string;
 const customer= await stripe.customers.retrieve(customerId);
 const priceId=session.line_items?.data[0]?.price?.id;
          if('email' in customer && priceId){

             const {email,name}= customer;

 await createOrUpdateUser({
    email:email as string,
    fullName:name as string,
    customerId,
    priceId:priceId as string,
    status:'active'
 });

  await createPayment({
    session,
    priceId:priceId as string,
    userEmail:email as string,
  })

          }
}

async function createOrUpdateUser({fullName, email, customerId, priceId, status}: UpdateProps) {
    try {
        const sql = await getDbConnection();
        const user = await sql`SELECT * FROM users WHERE email=${email}`;

        if(user.length === 0) {
            // Insert new user
            await sql`
                INSERT INTO users (email, full_name, customer_id, price_id, status)
                VALUES (${email}, ${fullName}, ${customerId}, ${priceId}, ${status})
            `;
        } else {
            // Update existing user
            await sql`
                UPDATE users
                SET full_name = ${fullName},
                    customer_id = ${customerId},
                    price_id = ${priceId},
                    status = ${status}
                WHERE email = ${email}
            `;
        }
    } catch(err) {
        console.error("Error while updating user", err);
    }
}


async function  createPayment({session,priceId,userEmail}:{session:Stripe.Checkout.Session;priceId:string;userEmail:string}) {
    try{
  const sql= await getDbConnection();

   const {amount_total,id,status}=session;
           await sql`
  INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email)
  VALUES (${amount_total}, ${status}, ${id}, ${priceId}, ${userEmail})
  RETURNING *;
`;

      
    }

    catch(err){
        console.error("Error while createing payment ",err);
    }
}

export async function handleSubscriptionDeleted({subscriptionId,stripe}:{subscriptionId:string;stripe:Stripe}) {
    try{
     const subscription= await stripe.subscriptions.retrieve(subscriptionId);
     const sql= await getDbConnection();
     await sql`UPDATE users SET status='cancelled' WHERE customer_id=${subscription.customer}`

     console.log("subscription deleted successfully")

    }
    catch(err){
        console.error("Error while subscription deletion",err)
        throw err
    }
    
}