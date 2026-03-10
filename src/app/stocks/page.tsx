import { RiskDashboard } from "@/components/RiskDashboard";

export default function StocksPage() {
  return (
    <RiskDashboard
      title="Individual Growth Stocks"
      description="High potential returns with significant market fluctuations."
      riskLevel="High"
      volatility="High"
      expectedAnnualReturn={12.5}
      baseAmount={10000}
    />
  );
}
