"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function WaitlistForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus("success");
        setEmail("");
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            <AnimatePresence mode="wait">
                {status === "success" ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center justify-center p-12 bg-brand-50 rounded-5xl border border-brand-100 shadow-matte"
                    >
                        <CheckCircle2 className="w-16 h-16 text-brand-900 mb-6" />
                        <h3 className="text-2xl font-bold mb-3">You&apos;re on the list</h3>
                        <p className="text-brand-700 text-center">
                            We&apos;ll notify you the second pre-orders open.
                        </p>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="relative flex flex-col sm:flex-row items-stretch gap-3 w-full"
                    >
                        <div className="flex-1 relative">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-8 py-5 rounded-full bg-brand-100 border-2 border-transparent focus:border-brand-900 focus:bg-white outline-none text-brand-900 placeholder:text-brand-400 transition-all text-lg"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="px-10 py-5 flex items-center justify-center gap-3 whitespace-nowrap text-lg"
                            disabled={status === "loading"}
                        >
                            {status === "loading" ? (
                                <div className="w-6 h-6 border-2 border-brand-50 border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    Get Early Access
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </Button>
                    </motion.form>
                )}
            </AnimatePresence>
            <p className="mt-6 text-sm text-brand-500 text-center font-medium">
                Join 1,000+ athletes. Early supporters get priority.
            </p>
        </div>
    );
}
