import { RiskDashboard } from "@/components/RiskDashboard";

export default function BondsPage() {
  return (
    <RiskDashboard
      title="Government & Corporate Bonds"
      description="Moderate reliable returns with historically low volatility."
      riskLevel="Medium-Low"
      volatility="Low"
      expectedAnnualReturn={5.5}
      baseAmount={10000}
    />
  );
}
