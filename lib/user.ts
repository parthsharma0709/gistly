import { pricingPlans } from "@/utils/constants";
import { getDbConnection } from "./db";
import { getUploadCounts } from "./summaries";

export async function getPriceId(email:string) {
    const sql =await getDbConnection();
    const query=  await sql`SELECT price_id FROM users where email=${email} AND status='active'`;
        return query?.[0]?.price_id || 'basicplan';
    
}

export async function hasReachedUploadLimit(userId:string) {
    
    const uploadCount= await getUploadCounts(userId);
    const priceId= await getPriceId(userId);
    const isPro= pricingPlans.find((plan)=>plan.priceId===priceId)?.id==='pro';
    const uoloadLimit:number= isPro? 10000:5;
    return {hasReachedLimit:uploadCount>=uoloadLimit}
}