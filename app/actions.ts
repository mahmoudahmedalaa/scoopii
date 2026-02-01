"use server";

import fs from 'fs';
import path from 'path';

export async function savePreOrder(formData: FormData) {
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;

    if (!firstName || !lastName || !email) {
        return { success: false, message: 'All fields are required.' };
    }

    const payload = {
        timestamp: new Date().toISOString(),
        firstName,
        lastName,
        email
    };

    // 1. Try to save to Google Sheets (if configured)
    const scriptUrl = process.env.GOOGLE_SHEET_URL;
    if (scriptUrl) {
        try {
            const response = await fetch(scriptUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log('✅ Saved to Google Sheets');
                return { success: true, message: 'Successfully pre-ordered!' };
            } else {
                console.error('❌ Google Sheet Error:', await response.text());
            }
        } catch (error) {
            console.error('❌ Failed to save to Google Sheet:', error);
        }
    }

    // 2. Fallback: Log to Vercel Console (Always do this as backup)
    console.log('📝 PRE-ORDER LOG (Backup):', JSON.stringify(payload, null, 2));

    // Simulate delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));

    return { success: true, message: 'Successfully pre-ordered!' };
}
