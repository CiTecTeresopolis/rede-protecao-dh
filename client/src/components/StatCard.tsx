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
  terracota: "bg-[#E8D5D0]",
  green: "bg-[#D4E8E0]",
  beige: "bg-[#FFF5E6]",
  gray: "bg-[#F5F1E8]",
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
