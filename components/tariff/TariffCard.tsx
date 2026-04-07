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
        : "border-[#484D4E] bg-[#1a1a1a] hover:border-[#444]";

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
            className={`relative overflow-hidden bg-[#313637] rounded-[2.2rem] border-2 transition-all duration-300 cursor-pointer shadow-lg ${borderClass(isSelected)}
                w-full h-[190px] min-[1244px]:w-[240px] min-[1244px]:h-[335px]
                ${tariff.is_best ? "min-[1244px]:!w-[748px] min-[1244px]:!h-[190px]" : ""}
            `}
            style={{ flexShrink: 0 }}
        >
            {/* Top-left discount badge (Desktop) or Top-right (Mobile) */}
            <div className={`absolute z-10 transition-all duration-500 top-0 
                ${tariff.is_best ? "left-0" : "left-0 max-[1244px]:left-auto max-[1244px]:right-0"}
                ${discountActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
                <TariffBadge type="discount" value={discount} />
            </div>

            {/* Content Container */}
            <div className={`flex h-full w-full 
                ${tariff.is_best
                    ? "flex-row items-center justify-between pl-32 max-[1244px]:pl-10 py-5 pr-10"
                    : "flex-col max-[1244px]:flex-row items-center max-[1244px]:justify-between pt-20 max-[1244px]:pt-5 pb-8 max-[1244px]:pb-5 px-6 max-[1244px]:px-10"}
            `}>

                {/* Section A: Title + Price */}
                <div className={`flex flex-col shrink-0
                    ${tariff.is_best ? "items-start gap-1" : "items-center max-[1244px]:items-start gap-1 mb-10 max-[1244px]:mb-0"}
                `}>
                    <p className={`text-white text-[26px] font-medium leading-tight mb-2 ${!tariff.is_best ? "text-center max-[1244px]:text-left" : ""}`}>
                        {tariff.period}
                    </p>
                    <TariffPrice
                        price={tariff.price}
                        fullPrice={tariff.full_price}
                        discountActive={discountActive}
                        size="lg"
                        orange={tariff.is_best}
                        alignClasses={tariff.is_best ? "items-start text-left" : "min-[1244px]:items-center min-[1244px]:text-center items-start text-left"}
                    />
                </div>

                {/* Section B: Description */}
                <div className={`
                    ${tariff.is_best
                        ? "max-w-[340px] max-[1244px]:max-w-[200px] text-left"
                        : "mt-auto max-[1244px]:mt-0 text-left w-full max-[1244px]:max-w-[200px]"}
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
