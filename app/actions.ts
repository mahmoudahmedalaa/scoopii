"use server";

import { sql } from '@vercel/postgres';

export async function savePreOrder(formData: FormData) {
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;

    if (!firstName || !email) {
        return { success: false, message: 'Name and Email are required.' };
    }

    const payload = {
        timestamp: new Date().toISOString(),
        firstName,
        lastName,
        email
    };

    console.log('📝 Processing Order:', payload);

    // Vercel Postgres Logic
    try {
        // 1. Check if DB is configured
        if (!process.env.POSTGRES_URL) {
            console.warn('⚠️ POSTGRES_URL is missing. Saving to logs only.');
            return { success: true, message: 'Saved to Vercel Logs (DB Not Configured Local)' };
        }

        // 2. Schema Migration (Self-Healing Column)
        try {
            await sql`ALTER TABLE preorders ADD COLUMN IF NOT EXISTS last_name TEXT;`;
        } catch (e) {
            // Ignore error if table doesn't exist yet (will be created below)
        }

        // 3. Try Insertion
        try {
            await sql`
                INSERT INTO preorders (first_name, last_name, email, created_at)
                VALUES (${firstName}, ${lastName}, ${email}, NOW())
            `;
        } catch (error: any) {
            // 4. Self-Healing: If table doesn't exist (Error 42P01), create it
            if (error.code === '42P01' || error.message?.includes('does not exist')) {
                console.log('🚧 Table missing. Creating "preorders" table...');
                await sql`
                    CREATE TABLE IF NOT EXISTS preorders (
                        id SERIAL PRIMARY KEY,
                        first_name TEXT,
                        last_name TEXT,
                        email TEXT,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                    );
                `;
                // Retry Insertion
                await sql`
                    INSERT INTO preorders (first_name, last_name, email, created_at)
                    VALUES (${firstName}, ${lastName}, ${email}, NOW())
                `;
                console.log('✅ Table created & Data inserted.');
            } else {
                throw error; // Re-throw other errors
            }
        }

        return { success: true, message: "You're on the list! We'll be in touch soon. 🚀" };

    } catch (error: any) {
        console.error('❌ Database Error:', error);
        return { success: true, message: `Saved to Logs. DB Error: ${error.message}` };
    }
}
