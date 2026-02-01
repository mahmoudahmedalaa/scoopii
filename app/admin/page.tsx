import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const secret = searchParams?.secret;

    // Simple basic security (better than nothing for a quick dashboard)
    if (secret !== 'scoopii2026') {
        return (
            <div className="flex items-center justify-center h-screen bg-zinc-950 text-zinc-400">
                <div className="text-center">
                    <h1 className="text-4xl mb-4">🔒 Access Denied</h1>
                    <p>Please provide the correct secret key.</p>
                </div>
            </div>
        );
    }

    let rows = [];
    try {
        if (!process.env.POSTGRES_URL) {
            throw new Error("Database not connected.");
        }
        const result = await sql`SELECT * FROM preorders ORDER BY created_at DESC`;
        rows = result.rows;
    } catch (e: any) {
        if (e.message?.includes('does not exist')) {
            rows = []; // Table not created yet
        } else {
            return <div className="p-12 text-red-500">Database Error: {e.message}</div>;
        }
    }

    return (
        <div className="min-h-screen bg-zinc-50 p-8 md:p-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl font-bold text-zinc-900">scoopii <span className="text-zinc-400 font-normal">/ Admin</span></h1>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm text-zinc-500">
                        Total Orders: <span className="font-bold text-black">{rows.length}</span>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-zinc-50 border-b border-zinc-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-zinc-900">ID</th>
                                    <th className="px-6 py-4 font-semibold text-zinc-900">Date</th>
                                    <th className="px-6 py-4 font-semibold text-zinc-900">Name</th>
                                    <th className="px-6 py-4 font-semibold text-zinc-900">Email</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                                {rows.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-zinc-400 italic">
                                            No orders found (or database empty).
                                        </td>
                                    </tr>
                                ) : (
                                    rows.map((row) => (
                                        <tr key={row.id} className="hover:bg-zinc-50 transition-colors">
                                            <td className="px-6 py-4 text-zinc-400 font-mono">#{row.id}</td>
                                            <td className="px-6 py-4 text-zinc-500">
                                                {new Date(row.created_at).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-zinc-900 font-medium">{row.first_name}</td>
                                            <td className="px-6 py-4 text-zinc-600">{row.email}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
