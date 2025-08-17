import { getPriceId } from '@/lib/user';
import { pricingPlans } from '@/utils/constants';
import { currentUser } from '@clerk/nextjs/server';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { Crown } from 'lucide-react';

export default async function PlanBadge() {
  const user = await currentUser();
  if (!user?.id) return null;

  const email = user?.emailAddresses?.[0]?.emailAddress;
  if (!email) return null;

  const priceId = await getPriceId(email);
  const plan = pricingPlans.find((plan) => plan.priceId === priceId);

  const planName = plan?.name || 'Buy a Plan';

  return (
    <Badge
      variant={'outline'}
      className={cn(
        'ml-2 bg-linear-to-r from-amber-100 to-amber-200 border-amber-300 hidden lg:flex flex-row items-center',
      )}
    >
      <Crown
        className={cn('w-3 h-3 mr-1 text-amber-600', priceId === 'basicplan' && 'text-rose-800')}
      />
      {planName === 'Basic' ? 'Buy a plan' : planName}
    </Badge>
  );
}
