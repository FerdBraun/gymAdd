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
            className={`relative overflow-hidden bg-[#313637] rounded-[2.2rem] border-2 transition-all duration-300 cursor-pointer shadow-lg ${borderClass(isSelected)}`}
            style={{
                width: tariff.is_best ? '748px' : '240px',
                height: tariff.is_best ? '190px' : '335px',
                flexShrink: 0
            }}
        >
            {/* Top-left discount badge */}
            <div className={`absolute top-0 left-0 z-10 transition-all duration-500 ${discountActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <TariffBadge type="discount" value={discount} />
            </div>

            {/* Content Container */}
            <div className={`flex h-full w-full 
                ${tariff.is_best
                    ? "flex-row items-center justify-between pl-32 py-5"
                    : "flex-col items-center pt-20 pb-8 px-6"}
            `}>

                {/* Section A: Title + Price */}
                <div className={`flex flex-col shrink-0
                    ${tariff.is_best ? "items-start gap-1" : "items-center gap-1 mb-10"}
                `}>
                    <p className={`text-white text-[26px] font-medium leading-tight mb-2 ${!tariff.is_best ? "text-center" : ""}`}>
                        {tariff.period}
                    </p>
                    <TariffPrice
                        price={tariff.price}
                        fullPrice={tariff.full_price}
                        discountActive={discountActive}
                        size={tariff.is_best ? "lg" : "lg"}
                        orange={tariff.is_best}
                        centered={!tariff.is_best}
                    />
                </div>

                {/* Section B: Description */}
                <div className={`
                    ${tariff.is_best
                        ? "max-w-[340px] text-left"
                        : "mt-auto text-left w-full"}
                `}>
                    <p className={`text-gray-300 text-[16px] leading-[1.3] text-left whitespace-pre-line`}>
                        {tariff.text}
                    </p>
                </div>
            </div>

            {/* Top-right "хит!" for wide card only */}
            {tariff.is_best && (
                <div className="absolute top-5 right-8 z-10">
                    <TariffBadge type="hit" />
                </div>
            )}
        </div>
    );
};
