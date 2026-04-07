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
    return <div className="min-h-screen bg-[#232829] flex items-center justify-center text-white">Загрузка…</div>;
  }

  const bestTariff =
    tariffs.find((t) => t.is_best) ??
    tariffs.find((t) => t.period.toLowerCase().includes("навсегда"));

  const otherTariffs = tariffs
    .filter((t) => t !== bestTariff)
    .sort((a, b) => b.full_price - a.full_price);

  return (
    <div className="min-h-screen bg-[#232829] flex flex-col items-center pt-[115px] pb-[100px]">
      <TariffHeader timeLeft={logic.timeLeft} formatTime={logic.formatTime} />

      {/* Main Content Title */}
      <h1 className="text-[40px] font-extrabold text-white mb-27.5 mr-90 text-center">
        Выбери подходящий для себя <span className="text-[#f8a04b]">тариф</span>
      </h1>

      {/* Blue Box Container (Image + Tariffs) */}
      <div className="w-[1216px] h-[867px] relative flex flex-row items-start">

        {/* Bodybuilder Image */}
        <div className="mt-[52px] shrink-0">
          <Image
            src="/freepik-export.svg"
            alt="Fitness coach"
            width={380}
            height={767}
            priority
            className="object-contain"
            style={{ width: '380px', height: '767px' }}
          />
        </div>

        {/* Right Tariffs Block */}
        <div className="ml-[87px] flex-1 flex flex-col gap-[14px]">
          {/* Forever wide card */}
          {bestTariff && (
            <TariffCard
              tariff={bestTariff}
              isSelected={selectedId === bestTariff.id}
              onSelect={() => setSelectedId(bestTariff.id)}
              discountActive={discountActive}
            />
          )}

          {/* Regular cards grid */}
          <div className="flex flex-row gap-[14px]">
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

          {/* Form and Buy Button */}
          <FooterForm
            consent={logic.consent}
            setConsent={logic.setConsent}
            showError={logic.showError}
            setShowError={logic.setShowError}
            handleBuy={logic.handleBuy}
          />
        </div>
      </div>

      {/* Footer / Guarantee Block */}
      <div className="mt-[66px]">
        <GuaranteeBlock />
      </div>
    </div>
  );
}
