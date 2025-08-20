import UpgradeRequired from '@/components/common/upgrade-required';
import { hasActivePlan, getSubscriptionStatus, getPriceId } from '@/lib/user';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }
   const priceId = await getPriceId(user.emailAddresses[0].emailAddress);
    const hasActiveSubscription = priceId !== null;

 
  if (!hasActiveSubscription && priceId !== null) {
    return <UpgradeRequired />; // only show for actual inactive subscriptions
  }
  return <>{children}</>;
}
