import React from "react";

// Discount badge (-70%) or "хит!" label
interface BadgeProps {
    type: "discount" | "hit";
    value?: number;
}

export const TariffBadge: React.FC<BadgeProps> = ({ type, value }) => {
    if (type === "hit") {
        return (
            <span className="text-orange-400 font-bold uppercase tracking-widest text-[11px]">
                хит!
            </span>
        );
    }
    return (
        <span className="bg-red-500 text-white font-black text-[11px] px-3 py-1.5 rounded-br-2xl rounded-tl-[inherit] shadow">
            -{value}%
        </span>
    );
};
