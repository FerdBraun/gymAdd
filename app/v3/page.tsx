"use client";

import React from "react";
import Image from "next/image";
import { useTariffLogic } from "@/hooks/useTariffLogic";
import { TariffHeader } from "@/components/tariff/TariffHeader";
import { TariffCard } from "@/components/tariff/TariffCard";
import { FooterForm, GuaranteeBlock } from "@/components/tariff/FooterForm";

export default function V3Page() {
    const logic = useTariffLogic();
    const { tariffs, loading, selectedId, setSelectedId, discountActive } = logic;

    if (loading) {
        return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white text-sm">Загрузка…</div>;
    }

    const bestTariff =
        tariffs.find((t) => t.is_best) ??
        tariffs.find((t) => t.period.toLowerCase().includes("навсегда"));

    const otherTariffs = tariffs
        .filter((t) => t !== bestTariff)
        .sort((a, b) => b.full_price - a.full_price);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <TariffHeader timeLeft={logic.timeLeft} formatTime={logic.formatTime} />

            <div className="pt-[72px] mx-auto max-w-[340px]">
                <main className="bg-[#222] rounded-[2rem] px-4 pt-6 pb-10 mx-1">
                    <h1 className="text-xl font-extrabold text-center mb-6 tracking-tight">
                        Выбери подходящий для себя <span className="text-orange-400">тариф</span>
                    </h1>

                    <div className="flex justify-center mb-8">
                        <Image
                            src="/freepik-export.svg"
                            alt="Fitness coach"
                            width={180}
                            height={270}
                            priority
                            className="object-contain"
                        />
                    </div>

                    <div className="flex flex-col gap-3.5">
                        {bestTariff && (
                            <TariffCard
                                tariff={bestTariff}
                                isSelected={selectedId === bestTariff.id}
                                onSelect={() => setSelectedId(bestTariff.id)}
                                discountActive={discountActive}
                                variant="horizontal"
                            />
                        )}

                        {otherTariffs.map((t, idx) => (
                            <TariffCard
                                key={`${t.id}-${idx}`}
                                tariff={t}
                                isSelected={selectedId === t.id}
                                onSelect={() => setSelectedId(t.id)}
                                discountActive={discountActive}
                                variant="horizontal"
                            />
                        ))}
                    </div>

                    <FooterForm
                        consent={logic.consent}
                        setConsent={logic.setConsent}
                        showError={logic.showError}
                        setShowError={logic.setShowError}
                        handleBuy={logic.handleBuy}
                    />

                    <GuaranteeBlock />
                </main>
            </div>
        </div>
    );
}
