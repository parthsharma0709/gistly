import { getDbConnection } from "./db";
export type Summary = {
  id: string;
  user_id: string;
  title: string;
  summary_text: string;
  file_name: string | null;
  created_at: string;
  updated_at: string;
};


export async function getSummaries(userId:string) {
    const sql= await getDbConnection();
    const summaries= await sql`SELECT * from pdf_summaries where user_id=${userId} ORDER BY created_at DESC`;
    return summaries;

}


export async function getSummaryById(id: string) {
    try {
        const sql = await getDbConnection();
        const [summary] = await sql`
            SELECT id, user_id, title, original_file_url, summary_text, 
                   LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1 AS word_count,
                   created_at, updated_at, status, file_name
            FROM pdf_summaries
            WHERE id = ${id}
        `;
        return summary ?? null; // return null if no row found
    } catch (error) {
        console.error("Error fetching summary by id ", error);
        return null;
    }
}
