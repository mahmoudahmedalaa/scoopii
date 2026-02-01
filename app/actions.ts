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

    const timestamp = new Date().toISOString();
    const csvLine = `${timestamp},"${firstName.replace(/"/g, '""')}","${lastName.replace(/"/g, '""')}","${email.replace(/"/g, '""')}"\n`;
    const filePath = path.join(process.cwd(), 'pre_orders.csv');

    try {
        // If file doesn't exist, create it with headers
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, 'Timestamp,FirstName,LastName,Email\n');
        }

        fs.appendFileSync(filePath, csvLine);
        return { success: true, message: 'Successfully pre-ordered!' };
    } catch (error) {
        console.error('Error saving pre-order:', error);
        return { success: false, message: 'Failed to save pre-order. Please try again later.' };
    }
}
