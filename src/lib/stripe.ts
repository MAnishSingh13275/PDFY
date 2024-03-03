// Importing Stripe using the `import` syntax
import Stripe from 'stripe';

const stripeAPIKey = process.env.STRIPE_API_KEY as string;

console.log("Stripe API Key:", stripeAPIKey);

// Creating a new instance of Stripe
export const stripe = new Stripe(stripeAPIKey, {
  apiVersion: "2023-10-16",
  typescript: true,
});
