"use client";

import { useState, useEffect, useCallback } from "react";

export interface Tariff {
    id: string;
    period: string;
    price: number;
    full_price: number;
    is_best: boolean;
    text: string;
}

export function useTariffLogic() {
    const [tariffs, setTariffs] = useState<Tariff[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState(5); // 2 minutes
    const [discountActive, setDiscountActive] = useState(true);
    const [consent, setConsent] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        fetch("https://t-core.fit-hub.pro/Test/GetTariffs")
            .then((r) => r.json())
            .then((data: Tariff[]) => {
                console.log("[Tariffs]", data);
                setTariffs(data);
                // Prefer is_best, fallback to period name containing "навсегда"
                const best =
                    data.find((t) => t.is_best) ??
                    data.find((t) => t.period.toLowerCase().includes("навсегда"));
                if (best) setSelectedId(best.id);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) {
            setDiscountActive(false);
            return;
        }
        const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        return () => clearInterval(id);
    }, [timeLeft]);

    const formatTime = useCallback((s: number) => {
        const m = Math.floor(s / 60).toString().padStart(2, "0");
        const sec = (s % 60).toString().padStart(2, "0");
        return `${m}:${sec}`;
    }, []);

    const handleBuy = useCallback(() => {
        if (!consent) {
            setShowError(true);
            return;
        }
        alert(`Покупка тарифа: ${selectedId}`);
    }, [consent, selectedId]);

    return {
        tariffs,
        loading,
        selectedId,
        setSelectedId,
        timeLeft,
        discountActive,
        consent,
        setConsent,
        showError,
        setShowError,
        formatTime,
        handleBuy,
    };
}
