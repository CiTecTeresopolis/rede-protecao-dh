import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: "terracota" | "green" | "beige" | "gray";
  description?: string;
}

const colorClasses = {
  terracota: "bg-[#C85A54] text-white",
  green: "bg-[#6B9F7F] text-white",
  beige: "bg-[#F5E6D3] text-[#4A4A4A]",
  gray: "bg-[#E8DCC8] text-[#4A4A4A]",
};

const iconBgClasses = {
  terracota: "bg-[#c85a54b7]",
  green: "bg-[#6b9f7fae]",
  beige: "bg-[#f5e6d3c1]",
  gray: "bg-[#e8dcc8e6]",
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  description,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {title}
          </p>
          <p className="text-3xl md:text-4xl font-bold font-display text-foreground">
            {value}
          </p>
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconBgClasses[color]}`}>
          <Icon className={`w-6 h-6 ${colorClasses[color].split(" ")[1]}`} />
        </div>
      </div>
    </div>
  );
}
