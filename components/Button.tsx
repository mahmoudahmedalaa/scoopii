"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "outline";
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
}

export function Button({
    children,
    className,
    variant = "primary",
    onClick,
    type = "button",
    disabled
}: ButtonProps) {
    const variants = {
        primary: "bg-brand-900 text-brand-50 hover:bg-brand-800 disabled:opacity-50 disabled:cursor-not-allowed",
        secondary: "bg-brand-100 text-brand-900 hover:bg-brand-200 disabled:opacity-50 disabled:cursor-not-allowed",
        outline: "border border-brand-200 bg-transparent text-brand-900 hover:bg-brand-50 disabled:opacity-50 disabled:cursor-not-allowed"
    };

    return (
        <motion.button
            whileHover={disabled ? {} : { scale: 1.02 }}
            whileTap={disabled ? {} : { scale: 0.98 }}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "px-8 py-4 rounded-full font-medium transition-all duration-200 text-sm md:text-base",
                variants[variant],
                className
            )}
        >
            {children}
        </motion.button>
    );
}
