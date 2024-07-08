import React, { useMemo } from 'react';
import { BoxProps } from '@mui/material';
import { useWalletBalances, usePrices } from './hooks'; // Assuming these hooks are implemented
import WalletRow from './WalletRow'; // Assuming WalletRow component is defined

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Assuming each balance has a blockchain property
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}


//Thay vì sử dụng switch trong getPriority, ta sử dụng một hàm getPriorityMap để ánh xạ từ blockchain.
const getPriorityMap = () => {
  return {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
  };
};


/*
Use useMemo:
priorityMap, sortedBalances, formattedBalances,rows đều được bao bọc bởi useMemo 
để đảm bảo rằng chúng chỉ tính toán lại khi các dependency thay đổi.
Sử dụng Object để Lấy Ưu Tiên: Thay vì so sánh trực tiếp trong sort, ta sử dụng priorityMap để lấy ưu tiên của từng blockchain, giúp tối ưu hóa và làm cho mã nguồn dễ hiểu hơn.
*/
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const priorityMap = useMemo(() => getPriorityMap(), []);

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => balance.amount > 0)
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = priorityMap[lhs.blockchain] || -99;
        const rightPriority = priorityMap[rhs.blockchain] || -99;
        return rightPriority - leftPriority;
      });
  }, [balances, priorityMap]);

  const formattedBalances = useMemo(() => {
    return sortedBalances.map((balance: WalletBalance) => ({
      ...balance,
      formatted: balance.amount.toFixed(),
    }));
  }, [sortedBalances]);

  const rows = useMemo(() => {
    return formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    });
  }, [formattedBalances, prices]);

  return <div {...rest}>{rows}</div>;
};

export default WalletPage;
