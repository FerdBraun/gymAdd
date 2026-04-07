import React from "react";

interface FooterFormProps {
    consent: boolean;
    setConsent: (v: boolean) => void;
    showError: boolean;
    setShowError: (v: boolean) => void;
    handleBuy: () => void;
}

export const FooterForm: React.FC<FooterFormProps> = ({
    consent,
    setConsent,
    showError,
    setShowError,
    handleBuy,
}) => {
    const hasError = showError && !consent;

    return (
        <div className="mt-[14px] flex flex-col items-start w-full gap-[14px]">
            {/* Comparison block - Left aligned icon and text */}
            <div className="flex items-center gap-4 bg-[#313637] border border-[#2c2c2c] rounded-[1.5rem] px-6 w-[499px] max-[1244px]:w-full h-[78px] max-[1244px]:h-auto max-[1244px]:py-4">
                <span className="text-orange-400 font-black text-[30px] leading-none shrink-0">!</span>
                <p className="text-[14px] text-gray-400  leading-tight text-left font-medium">
                    Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1 месяц
                </p>
            </div>

            {/* Consent checkbox */}
            <div className="w-full">
                <label
                    className={`flex items-start gap-4 cursor-pointer px-4 py-3 rounded-xl border transition-all duration-300 ${hasError
                        ? "border-red-500 bg-red-900/10"
                        : "border-transparent"
                        }`}
                >
                    <div className="relative shrink-0 mt-0.5">
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={consent}
                            onChange={(e) => {
                                setConsent(e.target.checked);
                                if (e.target.checked) setShowError(false);
                            }}
                        />
                        <div
                            className={`w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${consent
                                ? "bg-orange-400 border-orange-400 font-bold"
                                : hasError
                                    ? "border-red-500 bg-red-500/20"
                                    : "border-gray-500 bg-transparent"
                                }`}
                        >
                            {consent && (
                                <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={4}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                                </svg>
                            )}
                        </div>
                    </div>
                    <span className="text-[14px] text-gray-400 leading-snug text-left select-none">
                        Я согласен с{" "}
                        <a href="#" className="underline text-gray-300 hover:text-orange-400 transition-colors">
                            офертой рекуррентных платежей
                        </a>{" "}
                        и{" "}
                        <a href="#" className="underline text-gray-300 hover:text-orange-400 transition-colors">
                            Политикой конфиденциальности
                        </a>
                    </span>
                </label>
            </div>

            {/* Buy button - Large orange with responsive dimensions */}
            <button
                onClick={handleBuy}
                className="btn-shine bg-[#f8a04b] hover:bg-[#ffae5d] active:scale-[0.98] text-[#191E1F] font-extrabold text-[20px] tracking-wider rounded-[30px] transition-all duration-200 shadow-[0_8px_30px_rgb(0,0,0,0.5)] w-[352px] max-[1244px]:w-full h-[66px]"
            >
                Купить
            </button>

            {/* Legal text */}
            <p className="text-[14px] text-[#9B9B9B] leading-relaxed text-left opacity-60 px-1">
                Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.
            </p>
        </div>
    );
};

export const GuaranteeBlock: React.FC = () => (
    <div className="border border-[#484D4E] rounded-[2.2rem] flex flex-col items-start justify-center gap-6 w-[1216px] max-[1244px]:w-full h-[231px] max-[1244px]:h-auto px-[50px] max-[1244px]:px-6 max-[1244px]:py-8">
        <div className="border border-[#22c55e]/50 text-[#22c55e] text-[18px] font-medium px-8 py-3 rounded-full">
            гарантия возврата 30 дней
        </div>
        <p className="text-gray-300 text-[20px] leading-relaxed text-left max-w-275 max-[1244px]:max-w-full">
            Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели! Мы даже готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не получишь видимых результатов.
        </p>
    </div>
);
