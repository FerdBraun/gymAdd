import React from "react";

// Discount badge (-70%) or "хит!" label
interface BadgeProps {
    type: "discount" | "hit";
    value?: number;
}

export const TariffBadge: React.FC<BadgeProps> = ({ type, value }) => {
    if (type === "hit") {
        return (
            <span className="text-orange-400 font-medium uppercase tracking-tight text-[15px]">
                хит!
            </span>
        );
    }
    return (
        <span className="bg-[#fd4d4d] text-white font-bold text-[18px] px-4 py-1.5 rounded-bl-[14px] rounded-br-[14px] shadow-sm">
            -{value}%
        </span>
    );
};
