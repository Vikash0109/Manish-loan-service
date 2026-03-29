import { animate, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { calculateEmiBreakdown, formatInr } from '../utils/emi';
import SectionTitle from './SectionTitle';

function AnimatedCurrency({ value }) {
  const targetValue = Number(value) || 0;
  const [displayValue, setDisplayValue] = useState(targetValue);
  const previousValueRef = useRef(targetValue);

  useEffect(() => {
    const controls = animate(previousValueRef.current, targetValue, {
      duration: 0.45,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplayValue(latest),
    });

    previousValueRef.current = targetValue;

    return () => controls.stop();
  }, [targetValue]);

  return <span>{formatInr(displayValue)}</span>;
}

function EmiCalculatorSection() {
  const [activeCalculator, setActiveCalculator] = useState('slider');

  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [tenureYears, setTenureYears] = useState(5);

  const [manualLoanAmount, setManualLoanAmount] = useState('100000');
  const [manualInterestRate, setManualInterestRate] = useState('8.25');
  const [manualTenureYears, setManualTenureYears] = useState('15');

  const parsedManualLoanAmount = Number(manualLoanAmount) || 0;
  const parsedManualInterestRate = Number(manualInterestRate) || 0;
  const parsedManualTenureYears = Number(manualTenureYears) || 0;

  const result = useMemo(
    () =>
      calculateEmiBreakdown({
        loanAmount,
        annualInterestRate: interestRate,
        tenureYears,
      }),
    [interestRate, loanAmount, tenureYears],
  );

  const principalPercent = result.totalPayment > 0 ? (loanAmount / result.totalPayment) * 100 : 0;
  const interestPercent = result.totalPayment > 0 ? (result.totalInterest / result.totalPayment) * 100 : 0;

  const manualResult = useMemo(
    () =>
      calculateEmiBreakdown({
        loanAmount: parsedManualLoanAmount,
        annualInterestRate: parsedManualInterestRate,
        tenureYears: parsedManualTenureYears,
      }),
    [parsedManualInterestRate, parsedManualLoanAmount, parsedManualTenureYears],
  );

  return (
    <section id="calculator" className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl rounded-3xl border border-(--border-color) bg-(--surface-elevated) p-8 md:p-12">
        <SectionTitle
          eyebrow="EMI Calculator"
          title="Home Loan EMI Calculator"
          description="Groww-style calculator with high variable limits so users can model larger loans and longer tenures."
        />

        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-full border border-(--border-color) bg-(--surface) p-1">
            <button
              type="button"
              onClick={() => setActiveCalculator('slider')}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                activeCalculator === 'slider' ? 'bg-(--brand) text-white' : 'text-(--text-muted)'
              }`}
            >
              Slider Calculator
            </button>
            <button
              type="button"
              onClick={() => setActiveCalculator('manual')}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                activeCalculator === 'manual' ? 'bg-(--brand) text-white' : 'text-(--text-muted)'
              }`}
            >
              Manual Calculator
            </button>
          </div>
        </div>

        {activeCalculator === 'slider' ? (
          <motion.div
            key="slider-calculator"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-(--border-color) bg-(--surface) p-6 md:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-8">
                <label className="block">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <span className="text-base font-medium text-(--heading-color)">Loan amount</span>
                    <span className="rounded-md bg-[rgba(28,199,164,0.14)] px-4 py-1.5 text-lg font-semibold text-[#12b089]">
                      {formatInr(loanAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="300000000"
                    step="50000"
                    value={loanAmount}
                    onChange={(event) => setLoanAmount(Number(event.target.value))}
                    className="slider"
                  />
                </label>

                <label className="block">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <span className="text-base font-medium text-(--heading-color)">Rate of interest (p.a)</span>
                    <span className="rounded-md bg-[rgba(28,199,164,0.14)] px-4 py-1.5 text-lg font-semibold text-[#12b089]">
                      {interestRate.toFixed(2)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.01"
                    value={interestRate}
                    onChange={(event) => setInterestRate(Number(event.target.value))}
                    className="slider"
                  />
                </label>

                <label className="block">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <span className="text-base font-medium text-(--heading-color)">Loan tenure</span>
                    <span className="rounded-md bg-[rgba(28,199,164,0.14)] px-4 py-1.5 text-lg font-semibold text-[#12b089]">
                      {tenureYears} Yr
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    step="1"
                    value={tenureYears}
                    onChange={(event) => setTenureYears(Number(event.target.value))}
                    className="slider"
                  />
                </label>

                <div className="space-y-3 pt-2 text-base">
                  <div className="flex items-center justify-between">
                    <span className="text-(--text-muted)">Monthly EMI</span>
                    <span className="font-semibold text-(--heading-color)"><AnimatedCurrency value={result.monthlyEmi} /></span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-(--text-muted)">Principal amount</span>
                    <span className="font-semibold text-(--heading-color)"><AnimatedCurrency value={loanAmount} /></span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-(--text-muted)">Total interest</span>
                    <span className="font-semibold text-(--heading-color)"><AnimatedCurrency value={result.totalInterest} /></span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-(--text-muted)">Total amount</span>
                    <span className="font-semibold text-(--heading-color)"><AnimatedCurrency value={result.totalPayment} /></span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="mb-6 flex items-center gap-6 text-sm">
                  <span className="inline-flex items-center gap-2 text-(--text-muted)">
                    <span className="h-2.5 w-5 rounded-full bg-[#d9def0]" />
                    Principal amount
                  </span>
                  <span className="inline-flex items-center gap-2 text-(--text-muted)">
                    <span className="h-2.5 w-5 rounded-full bg-[#5268f2]" />
                    Interest amount
                  </span>
                </div>

                <div
                  className="relative h-64 w-64 rounded-full"
                  style={{
                    background: `conic-gradient(#d9def0 0 ${principalPercent}%, #5268f2 ${principalPercent}% ${principalPercent + interestPercent}%)`,
                  }}
                >
                  <div className="absolute inset-[24%] rounded-full bg-(--surface)" />
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="manual-calculator"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-(--border-color) bg-(--surface) p-6 md:p-8"
          >
          <h3 className="mb-6 text-xl font-semibold text-(--heading-color)">Manual EMI Calculator</h3>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-(--heading-color)">Loan Amount</span>
                <input
                  type="number"
                  min="0"
                  step="10000"
                  value={manualLoanAmount}
                  onChange={(event) => setManualLoanAmount(event.target.value)}
                  onFocus={(event) => {
                    if (event.target.value === '0') {
                      setManualLoanAmount('');
                    }
                  }}
                  className="mt-2 w-full rounded-xl border border-(--border-color) bg-(--surface-elevated) px-4 py-3 text-base text-(--heading-color) outline-none transition focus:border-(--brand)"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-(--heading-color)">Rate of Interest (p.a)</span>
                <input
                  type="number"
                  min="0"
                  max="50"
                  step="0.01"
                  value={manualInterestRate}
                  onChange={(event) => setManualInterestRate(event.target.value)}
                  onFocus={(event) => {
                    if (event.target.value === '0') {
                      setManualInterestRate('');
                    }
                  }}
                  className="mt-2 w-full rounded-xl border border-(--border-color) bg-(--surface-elevated) px-4 py-3 text-base text-(--heading-color) outline-none transition focus:border-(--brand)"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-(--heading-color)">Loan Tenure (Years)</span>
                <input
                  type="number"
                  min="1"
                  max="50"
                  step="1"
                  value={manualTenureYears}
                  onChange={(event) => setManualTenureYears(event.target.value)}
                  onFocus={(event) => {
                    if (event.target.value === '0') {
                      setManualTenureYears('');
                    }
                  }}
                  className="mt-2 w-full rounded-xl border border-(--border-color) bg-(--surface-elevated) px-4 py-3 text-base text-(--heading-color) outline-none transition focus:border-(--brand)"
                />
              </label>
            </div>

            <div className="space-y-3 rounded-2xl border border-(--border-color) bg-(--surface-elevated) p-5 text-base">
              <div className="flex items-center justify-between">
                <span className="text-(--text-muted)">Monthly EMI</span>
                <span className="font-semibold text-(--heading-color)"><AnimatedCurrency value={manualResult.monthlyEmi} /></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-(--text-muted)">Principal amount</span>
                <span className="font-semibold text-(--heading-color)"><AnimatedCurrency value={parsedManualLoanAmount} /></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-(--text-muted)">Total interest</span>
                <span className="font-semibold text-(--heading-color)"><AnimatedCurrency value={manualResult.totalInterest} /></span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-(--text-muted)">Total amount</span>
                <span className="font-semibold text-(--heading-color)"><AnimatedCurrency value={manualResult.totalPayment} /></span>
              </div>
            </div>
          </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default EmiCalculatorSection;

