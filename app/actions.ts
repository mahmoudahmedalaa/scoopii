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

    // 1. Try to save to Google Sheets
    // HARDCODED for reliability (Bypassing Vercel Env Var issues)
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzvb1yF1hPshs8LoZLQ68kS4V0nqjwzUNd6ofSI5N7yuhnfClccaulf3EcC7p1XEMLahw/exec';
    let sheetStatus = 'missing_config';

    if (scriptUrl && scriptUrl.startsWith('http')) {
        try {
            const response = await fetch(scriptUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log('✅ Saved to Google Sheets');
                sheetStatus = 'success';
            } else {
                const text = await response.text();
                console.error('❌ Google Sheet Error:', text);
                sheetStatus = `API Error (${response.status})`;
            }
        } catch (error) {
            console.error('❌ Failed to save to Google Sheet:', error);
            sheetStatus = 'Network Error';
        }
    }

    // 2. Fallback: Log to Vercel Console (Always do this as backup)
    console.log('📝 PRE-ORDER LOG (Backup):', JSON.stringify(payload, null, 2));

    // Simulate delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));

    if (sheetStatus === 'success') {
        return { success: true, message: 'Saved to Google Sheets & Logs!' };
    } else if (sheetStatus === 'missing_config') {
        return { success: true, message: 'Saved to Vercel Logs (Google Sheet URL is invalid or missing).' };
    } else {
        return { success: true, message: `Saved to Vercel Logs. Sheet Error: ${sheetStatus}` };
    }
}
