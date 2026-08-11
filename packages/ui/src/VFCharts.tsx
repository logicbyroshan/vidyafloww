import {
  ResponsiveContainer,
  AreaChart as RechartsAreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { cn } from './utils';

// Custom Enterprise Glassmorphic Tooltip Component
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 border border-border/80 p-3 rounded-xl shadow-2xl backdrop-blur-md text-xs space-y-1.5 min-w-[140px]">
        {label && <p className="font-bold text-foreground pb-1 border-b border-border/60 mb-1">{label}</p>}
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: entry.color || entry.fill }} />
              <span className="text-muted-foreground font-medium">{entry.name}:</span>
            </div>
            <span className="font-mono font-bold text-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

// VFAreaChart Component
export interface VFAreaChartProps {
  data: any[];
  xKey: string;
  dataKeys: { key: string; name: string; color?: string }[];
  height?: number;
  className?: string;
}

export function VFAreaChart({
  data,
  xKey,
  dataKeys,
  height = 240,
  className,
}: VFAreaChartProps) {
  const defaultColors = ['#06b6d4', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className={cn("w-full relative", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            {dataKeys.map((item, idx) => {
              const color = item.color || defaultColors[idx % defaultColors.length];
              return (
                <linearGradient key={item.key} id={`gradient-${item.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.0} />
                </linearGradient>
              );
            })}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.4)" vertical={false} />
          <XAxis
            dataKey={xKey}
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          {dataKeys.map((item, idx) => {
            const color = item.color || defaultColors[idx % defaultColors.length];
            return (
              <Area
                key={item.key}
                type="monotone"
                dataKey={item.key}
                name={item.name}
                stroke={color}
                strokeWidth={2.5}
                fillOpacity={1}
                fill={`url(#gradient-${item.key})`}
              />
            );
          })}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// VFBarChart Component
export interface VFBarChartProps {
  data: any[];
  xKey: string;
  dataKeys: { key: string; name: string; color?: string }[];
  height?: number;
  className?: string;
}

export function VFBarChart({
  data,
  xKey,
  dataKeys,
  height = 240,
  className,
}: VFBarChartProps) {
  const defaultColors = ['#06b6d4', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6'];

  return (
    <div className={cn("w-full relative", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.4)" vertical={false} />
          <XAxis
            dataKey={xKey}
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          {dataKeys.map((item, idx) => {
            const color = item.color || defaultColors[idx % defaultColors.length];
            return (
              <Bar
                key={item.key}
                dataKey={item.key}
                name={item.name}
                fill={color}
                radius={[6, 6, 0, 0]}
              />
            );
          })}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

// VFPieChart Component
export interface VFPieChartProps {
  data: { name: string; value: number; color?: string }[];
  height?: number;
  className?: string;
}

export function VFPieChart({
  data,
  height = 220,
  className,
}: VFPieChartProps) {
  const defaultColors = ['#06b6d4', '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className={cn("w-full relative flex items-center justify-center", className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Tooltip content={<CustomTooltip />} />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={75}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || defaultColors[index % defaultColors.length]}
                stroke="hsl(var(--card))"
                strokeWidth={2}
              />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
