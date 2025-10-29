import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import SummaryCards from './components/SummaryCards';
import DailyInput from './components/DailyInput';
import TransactionsList from './components/TransactionsList';

const STORAGE_KEY = 'fintrack/transactions';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTransactions(JSON.parse(raw));
    } catch (e) {
      // ignore parsing errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (e) {
      // ignore
    }
  }, [transactions]);

  const addTransaction = (tx) => {
    setTransactions((prev) => [{ ...tx, id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString() }, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const todayStr = new Date().toISOString().slice(0, 10);

  const { totalsToday, totalsMonth } = useMemo(() => {
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    let incomeToday = 0,
      expenseToday = 0,
      incomeMonth = 0,
      expenseMonth = 0;

    transactions.forEach((t) => {
      const d = t.date || todayStr;
      const isToday = d === todayStr;
      const isMonth = d.startsWith(monthKey);
      if (t.type === 'income') {
        if (isToday) incomeToday += t.amount;
        if (isMonth) incomeMonth += t.amount;
      } else {
        if (isToday) expenseToday += t.amount;
        if (isMonth) expenseMonth += t.amount;
      }
    });

    return {
      totalsToday: { income: incomeToday, expense: expenseToday, balance: incomeToday - expenseToday },
      totalsMonth: { income: incomeMonth, expense: expenseMonth, balance: incomeMonth - expenseMonth },
    };
  }, [transactions, todayStr]);

  const todaysTransactions = useMemo(() => transactions.filter((t) => t.date === todayStr), [transactions, todayStr]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Hero />
      <main className="relative -mt-20 z-10">
        <div className="mx-auto w-full max-w-md px-4 pb-28">
          <SummaryCards totalsToday={totalsToday} totalsMonth={totalsMonth} />

          <section className="mt-6">
            <DailyInput onAdd={addTransaction} />
          </section>

          <section className="mt-8">
            <TransactionsList items={todaysTransactions} onDelete={deleteTransaction} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
