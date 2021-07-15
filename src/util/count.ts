export const exchangeK = (num: number): string => {
    const front = Math.floor(num / 1000);
    const rear = num % 1000;

    return `${front}.${rear}K`;
}