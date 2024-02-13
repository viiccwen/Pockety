import { AssetRecordType, CostRecordType, IncomeRecordType } from "./type";

export const GetMonthlyTotal = (
    yaer: number = -1,
    month: number = -1,
    costs: CostRecordType[],
    incomes: IncomeRecordType[]
) => {
    const curMonthlyCostTotal = GetMonthlyCost(yaer, month, costs);
    const curMonthlyIncomeTotal = GetMonthlyIncome(yaer, month, incomes);

    return curMonthlyIncomeTotal - curMonthlyCostTotal;
}

export const GetMonthlyCost = (
    yaer: number = -1,
    month: number = -1,
    costs: CostRecordType[]
) => {
    let CurMonthlyCostArray: CostRecordType[] = [];

    if(yaer !== -1 && month !== -1) {
        CurMonthlyCostArray = costs.filter((cost) => {
            const isCurYear: boolean = (new Date(cost.createdAt)).getFullYear() === yaer;
            const isCurMonth: boolean = (new Date(cost.createdAt)).getMonth() + 1 === month;
            return isCurYear && isCurMonth;
        });
    } else {
        CurMonthlyCostArray = costs;
    }

    const curMonthlyCostTotal: number = CurMonthlyCostArray.reduce((acc, cur) => {
        return acc + cur.value;
    }, 0);

    return curMonthlyCostTotal;
};

export const GetMonthlyIncome = (
    yaer: number = -1,
    month: number = -1,
    incomes: IncomeRecordType[]
) => {
    let CurMonthlyIncomeArray: IncomeRecordType[] = [];

    if(yaer !== -1 && month !== -1) {
        CurMonthlyIncomeArray = incomes.filter((cost) => {
            const isCurYear: boolean = (new Date(cost.createdAt)).getFullYear() === yaer;
            const isCurMonth: boolean = (new Date(cost.createdAt)).getMonth() + 1 === month;
            return isCurYear && isCurMonth;
        });
    } else {
        CurMonthlyIncomeArray = incomes;
    }

    const curMonthlyIncomeTotal: number = CurMonthlyIncomeArray.reduce((acc, cur) => {
        return acc + cur.value;
    }, 0);

    return curMonthlyIncomeTotal;
};

export const GetAssetsValue = (
    assets: AssetRecordType[]
) => {
    return assets.reduce((acc, cur) => {
        return acc + cur.value;
    }, 0);
}; 

export const GetDebitValue = (
    assets: AssetRecordType[]
) => {
    return assets.reduce((acc, cur) => {
        if(cur.value < 0) return acc + cur.value;
        return acc;
    }, 0);
}