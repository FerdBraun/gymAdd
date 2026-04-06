import React from "react";

interface TariffHeaderProps {
    timeLeft: number;
    formatTime: (s: number) => string;
}

export const TariffHeader: React.FC<TariffHeaderProps> = ({ timeLeft, formatTime }) => {
    const isUrgent = timeLeft <= 30;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#1b3d2c] shadow-lg">
            <div className="flex flex-col items-center py-2.5">
                <p className="text-[11px] uppercase tracking-widest text-white/90 font-bold mb-0.5">
                    Успейте открыть пробную неделю
                </p>
                <p
                    className={`font-mono font-black text-2xl tabular-nums leading-none ${isUrgent ? "text-red-500 timer-blink" : "text-yellow-400"
                        }`}
                >
                    <span className="opacity-80">·</span> {formatTime(timeLeft)} <span className="opacity-80">·</span>
                </p>
            </div>
        </header>
    );
};
