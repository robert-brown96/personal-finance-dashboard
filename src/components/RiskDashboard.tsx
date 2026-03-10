"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Activity, Info, ShieldAlert, Zap } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

export type RiskProfile = {
  title: string;
  description: string;
  riskLevel: "Low" | "Medium-Low" | "Medium-High" | "High";
  volatility: string;
  expectedAnnualReturn: number;
  baseAmount?: number;
};

export function RiskDashboard({
  title,
  description,
  riskLevel,
  volatility,
  expectedAnnualReturn,
  baseAmount = 10000,
}: RiskProfile) {
  const [years, setYears] = useState(10);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = useMemo(() => {
    const arr = [];
    let currentBalance = baseAmount;
    for (let i = 0; i <= years; i++) {
      arr.push({
        year: i === 0 ? "Now" : `Year ${i}`,
        value: Math.round(currentBalance),
      });
      currentBalance *= 1 + expectedAnnualReturn / 100;
    }
    return arr;
  }, [years, expectedAnnualReturn, baseAmount]);

  const riskColor = {
    Low: "bg-green-500/10 text-green-500 border-green-500/20",
    "Medium-Low": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "Medium-High": "bg-orange-500/10 text-orange-500 border-orange-500/20",
    High: "bg-red-500/10 text-red-500 border-red-500/20",
  }[riskLevel];

  const Icon = {
    Low: ShieldAlert,
    "Medium-Low": Info,
    "Medium-High": Activity,
    High:Zap,
  }[riskLevel];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const finalValue = data.length > 0 ? data[data.length - 1].value : baseAmount;
  const totalReturn = finalValue - baseAmount;
  const returnPercentage = baseAmount > 0 ? ((totalReturn / baseAmount) * 100).toFixed(1) : "0.0";

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground mt-1">{description}</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className={riskColor}>
            <Icon className="w-3 h-3 mr-1" />
            Risk: {riskLevel}
          </Badge>
          <Badge variant="secondary">Volatility: {volatility}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 border-primary/10 shadow-lg shadow-primary/5 bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle>Growth Projection</CardTitle>
            <CardDescription>
              Expected return at {expectedAnnualReturn}% annual yield over {years} years
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="year" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tickFormatter={(val) => `$${val / 1000}k`}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    dx={-10}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: "8px", 
                      border: "1px solid hsl(var(--border))",
                      backgroundColor: "hsl(var(--card))",
                      color: "hsl(var(--card-foreground))"
                    }}
                    formatter={(value: number) => [formatCurrency(value), "Projected Balance"]}
                    labelStyle={{ color: "hsl(var(--muted-foreground))", marginBottom: "4px" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="var(--primary)"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 flex flex-col">
          <Card className="flex-1 border-primary/10 shadow-lg shadow-primary/5 bg-gradient-to-br from-card to-card/50">
            <CardHeader>
              <CardTitle>Investment Summary</CardTitle>
              <CardDescription>Based on $10,000 initial principal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Time Horizon</span>
                  <span className="font-medium text-foreground">{years} years</span>
                </div>
                {mounted && (
                  <Slider
                    defaultValue={[10]}
                    value={[years]}
                    min={1}
                    max={40}
                    step={1}
                    onValueChange={(vals: number | readonly number[]) => {
                      const newYear = Array.isArray(vals) ? vals[0] : (typeof vals === 'number' ? vals : 10);
                      setYears(newYear);
                    }}
                    className="py-4 cursor-pointer"
                  />
                )}
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1 yr</span>
                  <span>40 yrs</span>
                </div>
              </div>

              <div className="grid gap-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Initial Amount</span>
                  <span className="font-medium">{formatCurrency(baseAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Return</span>
                  <span className="font-medium text-green-500">+{formatCurrency(totalReturn)}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="font-semibold">Projected Value</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                    {formatCurrency(finalValue)}
                  </span>
                </div>
                <Badge variant="outline" className="justify-center py-1 mt-2 bg-primary/5">
                  +{returnPercentage}% Total Growth
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
