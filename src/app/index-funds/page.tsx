import { RiskDashboard } from "@/components/RiskDashboard";

export default function IndexFundsPage() {
  return (
    <RiskDashboard
      title="Broad Market Index Funds"
      description="Diversified exposure to the overall stock market."
      riskLevel="Medium-High"
      volatility="Medium"
      expectedAnnualReturn={9.0}
      baseAmount={10000}
    />
  );
}
