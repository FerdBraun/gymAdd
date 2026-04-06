import React from "react";
import { Tariff } from "@/hooks/useTariffLogic";
import { TariffBadge } from "./TariffBadge";
import { TariffPrice } from "./TariffPrice";

interface TariffCardProps {
    tariff: Tariff;
    isSelected: boolean;
    onSelect: () => void;
    discountActive: boolean;
}

const borderClass = (selected: boolean) =>
    selected
        ? "border-orange-500 bg-[#2d2d2d]"
        : "border-[#333] bg-[#1a1a1a] hover:border-[#444]";

export const TariffCard: React.FC<TariffCardProps> = ({
    tariff,
    isSelected,
    onSelect,
    discountActive,
}) => {
    const discount = Math.round((1 - tariff.price / tariff.full_price) * 100);

    // ─── Shared Layout ──────────────────────────────────────────
    // On Mobile: Both Featured and Regular are horizontal (Price L, Text R)
    // On Desktop (lg): Featured is horizontal, Regular is vertical (Price top, Text bottom)

    return (
        <div
            onClick={onSelect}
            className={`relative overflow-hidden rounded-[2.2rem] border-2 transition-all duration-300 cursor-pointer w-full shadow-lg ${borderClass(isSelected)}
                ${tariff.is_best ? "min-h-[160px]" : "min-h-[140px] lg:min-h-[240px]"}
            `}
        >
            {/* Top-left discount badge */}
            <div className={`absolute top-0 left-0 z-10 transition-all duration-500 ${discountActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <TariffBadge type="discount" value={discount} />
            </div>

            {/* Top-right "хит!" */}
            {tariff.is_best && (
                <div className="absolute top-4 right-6 lg:top-5 lg:right-8 z-10">
                    <TariffBadge type="hit" />
                </div>
            )}

            {/* Content Container */}
            <div className={`flex gap-4 h-full
                ${tariff.is_best
                    ? "flex-row items-center justify-between px-6 py-8 lg:px-10 lg:py-10"
                    : "flex-row items-center lg:flex-col lg:items-start lg:justify-between px-6 py-6 lg:px-8 lg:pt-12 lg:pb-9"}
            `}>

                {/* Section A: Title + Price */}
                <div className={`flex flex-col items-start gap-1 shrink-0
                    ${!tariff.is_best ? "lg:mb-4" : ""}
                `}>
                    <p className="text-white/60 text-[15px] lg:text-[17px] font-medium leading-none mb-1">
                        {tariff.period}
                    </p>
                    <TariffPrice
                        price={tariff.price}
                        fullPrice={tariff.full_price}
                        discountActive={discountActive}
                        size={tariff.is_best ? "lg" : "md"}
                        orange={tariff.is_best}
                    />
                </div>

                {/* Section B: Description */}
                <div className={`
                    ${tariff.is_best
                        ? "flex-1 max-w-[180px] lg:max-w-[240px]"
                        : "flex-1 lg:mt-auto lg:max-w-[140px]"}
                `}>
                    <p className="text-gray-400 text-[11px] lg:text-[12px] leading-snug text-left">
                        {tariff.text}
                    </p>
                </div>
            </div>
        </div>
    );
};
