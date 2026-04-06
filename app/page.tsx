"use client";

import React from "react";
import Image from "next/image";
import { useTariffLogic } from "@/hooks/useTariffLogic";
import { TariffHeader } from "@/components/tariff/TariffHeader";
import { TariffCard } from "@/components/tariff/TariffCard";
import { FooterForm, GuaranteeBlock } from "@/components/tariff/FooterForm";


export default function UnifiedPage() {
  const logic = useTariffLogic();
  const { tariffs, loading, selectedId, setSelectedId, discountActive } = logic;

  if (loading) {
    return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">Загрузка…</div>;
  }

  const bestTariff =
    tariffs.find((t) => t.is_best) ??
    tariffs.find((t) => t.period.toLowerCase().includes("навсегда"));

  const otherTariffs = tariffs
    .filter((t) => t !== bestTariff)
    .sort((a, b) => b.full_price - a.full_price);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-start lg:justify-center   overflow-x-hidden">
      <TariffHeader timeLeft={logic.timeLeft} formatTime={logic.formatTime} />

      {/* Container */}
      <div className="w-full bg-[#222]  relative">
        <main className="px-5 sm:px-10 lg:px-20 pt-10 sm:pt-12 lg:pt-16 pb-16 sm:pb-20  max-w-300 rounded-[2.5rem] justify-self-center lg:rounded-[3.5rem] overflow-hidden shadow-2xl mt-16 md:mt-20 lg:mt-24" >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-left mb-10 lg:mb-16 tracking-tight text-white px-2">
            Выбери подходящий для себя <span className="text-orange-400">тариф</span>
          </h1>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center mt-11 lg:items-start relative">

            {/* ── Man image ── */}
            <div className="block w-full max-w-50 sm:max-w-60 lg:max-w-70  h-auto relative mb-6 lg:mt-40 lg:-mb-25 lg:shrink-0 lg:sticky lg:top-50">
              <Image
                src="/freepik-export.svg"
                alt="Fitness coach"
                width={400}
                height={800}
                priority
                className="object-contain transform lg:scale-110 lg:origin-bottom"
              />
            </div>

            {/* ── Tariffs Column ── */}
            <div className="w-full flex-1 flex flex-col gap-5">
              {/* Forever card (Always wide/horizontal) */}
              {bestTariff && (
                <TariffCard
                  tariff={bestTariff}
                  isSelected={selectedId === bestTariff.id}
                  onSelect={() => setSelectedId(bestTariff.id)}
                  discountActive={discountActive}
                />
              )}

              {/* Regular cards: Grid (Desktop) or Vertical Stack (Mobile) */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-5">
                {otherTariffs.map((t, idx) => (
                  <TariffCard
                    key={`${t.id}-${idx}`}
                    tariff={t}
                    isSelected={selectedId === t.id}
                    onSelect={() => setSelectedId(t.id)}
                    discountActive={discountActive}
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
            </div>
          </div>

          <GuaranteeBlock />
        </main>
      </div>
    </div>
  );
}
