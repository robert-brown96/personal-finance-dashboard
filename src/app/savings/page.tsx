import { RiskDashboard } from "@/components/RiskDashboard";

export default function SavingsPage() {
  return (
    <RiskDashboard
      title="High-Yield Savings"
      description="A secure place for your cash with guaranteed returns."
      riskLevel="Low"
      volatility="Minimal"
      expectedAnnualReturn={4.5}
      baseAmount={10000}
    />
  );
}
