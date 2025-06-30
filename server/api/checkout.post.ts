import Stripe from 'stripe'
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const plan = body?.plan;

  const primemap = {
    Premium: 'price_1RfU4GAcowfCPm4rYrpeluUY',
    King: 'price_1RfU5SAcowfCPm4rxWW8kAgR'
  }

  if (!primemap[plan]) {
    return { error: 'Invalid plan selected' };
  }
  const stripe = new Stripe(process.env.STRIPE_SK!, {
    apiVersion: '2024-04-10',
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: primemap[plan],
        quantity: 1,
      }
      
    ],
    metadata: {
         clientId:body.client_id,  
     },
    mode: 'payment',
    success_url: 'http://localhost:3000/profile',
    cancel_url: 'http://localhost:3000/profile',
  })
  return { url: session.url }
})