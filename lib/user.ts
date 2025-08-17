import { pricingPlans } from '@/utils/constants';
import { getDbConnection } from './db';
import { getUploadCounts } from './summaries';
import { User } from '@clerk/nextjs/server';

// Get priceId by email
export async function getPriceId(email: string) {
  const sql = await getDbConnection();
  const query = await sql`SELECT price_id FROM users WHERE email=${email} AND status='active'`;
  return query?.[0]?.price_id || 'basicplan';
}

// Check if user has an active plan
export async function hasActivePlan(email: string) {
  const sql = await getDbConnection();
  const query =
    await sql`SELECT price_id, status FROM users WHERE email=${email} AND status='active' AND price_id IS NOT NULL`;
  return query && query.length > 0;
}

// Check if user reached upload limit
export async function hasReachedUploadLimit(userId: string, email: string) {
  const uploadCount = await getUploadCounts(userId); // use userId to count
  const priceId = await getPriceId(email); // use email to get plan
  const isPro = pricingPlans.find((plan) => plan.priceId === priceId)?.id === 'pro';
  const uploadLimit: number = isPro ? 10000 : 5;
  return { hasReachedLimit: uploadCount >= uploadLimit, uploadLimit };
}

// Get subscription status
export async function getSubscriptionStatus(user: User) {
  const hasSubscription = await hasActivePlan(user.emailAddresses[0].emailAddress);
  return hasSubscription;
}

// Get user plan
export async function getUserPlan(email: string) {
  const priceId = await getPriceId(email);
  const isPro = pricingPlans.find((plan) => plan.priceId === priceId)?.id === 'pro';
  return { isPro };
}
