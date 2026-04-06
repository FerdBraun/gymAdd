import React from "react";

export const ComparisonBlock: React.FC = () => {
    return (
        <div className="mt-8 mb-6 p-4 bg-[#232323] rounded-2xl flex gap-3 items-center">
            <span className="text-orange-400 text-xl font-bold">!</span>
            <p className="text-[10px] text-gray-400 leading-tight">
                Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1 месяц
            </p>
        </div>
    );
};
