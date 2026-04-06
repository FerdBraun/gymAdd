import React from "react";

interface TariffPriceProps {
    price: number;
    fullPrice: number;
    discountActive: boolean;
    size?: "sm" | "md" | "lg";
    orange?: boolean;
}

export const TariffPrice: React.FC<TariffPriceProps> = ({
    price,
    fullPrice,
    discountActive,
    size = "md",
    orange = false,
}) => {
    const priceSize =
        size === "lg" ? "text-5xl" : size === "sm" ? "text-2xl" : "text-4xl";
    const oldSize =
        size === "lg" ? "text-lg" : size === "sm" ? "text-xs" : "text-sm";
    const color = orange ? "text-orange-400" : "text-white";

    return (
        <div className="flex flex-col items-start text-left">
            {/* Current price */}
            <div className={`relative overflow-hidden ${priceSize} ${color} font-black tabular-nums leading-none tracking-tight h-[1.1em] text-left`}>
                <span
                    className={`block transition-all duration-700 ease-in-out text-left ${discountActive
                            ? "translate-y-0 opacity-100"
                            : "-translate-y-full opacity-0 absolute"
                        }`}
                >
                    {price}&nbsp;₽
                </span>
                <span
                    className={`block transition-all duration-700 ease-in-out text-left ${!discountActive
                            ? "translate-y-0 opacity-100"
                            : "translate-y-full opacity-0 absolute"
                        }`}
                >
                    {fullPrice}&nbsp;₽
                </span>
            </div>
            {/* Old (full) price */}
            {discountActive && (
                <span
                    className={`${oldSize} text-gray-500 line-through tabular-nums leading-tight mt-1 transition-all duration-500 opacity-60 text-left`}
                >
                    {fullPrice}&nbsp;₽
                </span>
            )}
        </div>
    );
};
