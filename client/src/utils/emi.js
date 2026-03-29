export const calculateEmiBreakdown = ({ loanAmount, annualInterestRate, tenureYears }) => {
  const principal = Number(loanAmount) || 0;
  const ratePerMonth = (Number(annualInterestRate) || 0) / 12 / 100;
  const months = (Number(tenureYears) || 0) * 12;

  if (principal <= 0 || ratePerMonth <= 0 || months <= 0) {
    return {
      monthlyEmi: 0,
      totalInterest: 0,
      totalPayment: 0,
    };
  }

  const factor = (1 + ratePerMonth) ** months;
  const monthlyEmi = (principal * ratePerMonth * factor) / (factor - 1);
  const totalPayment = monthlyEmi * months;
  const totalInterest = totalPayment - principal;

  return {
    monthlyEmi,
    totalInterest,
    totalPayment,
  };
};

export const formatInr = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
