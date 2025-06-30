
import Stripe from 'stripe'
import { readRawBody, defineEventHandler, getHeader, setResponseStatus } from 'h3'
import getRawBody from 'raw-body'
import type { IncomingMessage } from 'http'
import { buffer } from 'micro'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const stripe = new Stripe( process.env.STRIPE_SK, {
    apiVersion: '2024-04-10'
  })
  const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_Admin!
);

const sig = getHeader(event, 'stripe-signature');
const req = event.node.req;
const rawBody = await buffer(req);
const jsonString = JSON.stringify(rawBody);

const body = Buffer.from(jsonString, 'utf-8');

console.log('📦 Raw body received from Stripe:',)
// console.log(body,"___",rawBody);

  let webhookEvent;
  try {
    webhookEvent = stripe.webhooks.constructEvent(
    rawBody! ,
      sig!,
      process.env.STRIPE_WB
    )
   
    // Handle the event
    console.log(webhookEvent.type);
    if (webhookEvent.type === 'checkout.session.completed') {
      const session = webhookEvent.data.object as Stripe.Checkout.Session;
      const clientId = session.metadata?.clientId;
      const amount = session.amount_total;
      let planup;
      if(amount==200)
      {
        planup='premium';
      }else if(amount==400){
        planup='king';
      }

      const supabaseedit = async ()=>{
         const {data,error} = await supabaseAdmin.from('user_main').update({ plan: planup }).eq('client_id',clientId);

         if(error)
         {
            console.log('error in upgrading supabase profile');
         }else{
            console.log('supabase success');
         }
      }
      await supabaseedit();
      
      console.log('✅ Payment successful',clientId);

    }

    return { received: true }
  } catch (err: any) {
    console.error('❌ Webhook Error:', err.message)
    return { error: 'Invalid webhook signature' }
  }
})