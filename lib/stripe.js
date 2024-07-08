import { loadStripe } from "@stripe/stripe-js";

const stripe_key = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

const stripePromise = loadStripe(stripe_key);

export default stripePromise;
