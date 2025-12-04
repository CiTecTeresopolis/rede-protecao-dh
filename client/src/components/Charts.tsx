import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Institution {
  instituicao: string;
  servicosPrestados: string;
  nivelProtecao: string;
  complexidade: string;
  tipificacao: string;
  enderecoCompleto: string;
  cep: number;
  bairro: string;
  distrito: string;
  tipoAtendimento: string;
  capacidadeAtendimento: number;
  publico: string;
}

interface ChartsProps {
  institutions: Institution[];
}

export default function Charts({ institutions }: ChartsProps) {
  // Data for Protection Level Distribution
  const protectionData = [
    {
      name: "Proteção Social",
      value: institutions.filter(i => i.nivelProtecao === "Proteção Social")
        .length,
    },
    {
      name: "Proteção Social Especial",
      value: institutions.filter(
        i => i.nivelProtecao === "Proteção Social Especial"
      ).length,
    },
  ];

  // Data for Complexity Distribution
  const complexityData = [
    {
      name: "Básica",
      value: institutions.filter(i => i.complexidade === "Básica").length,
    },
    {
      name: "Média",
      value: institutions.filter(i => i.complexidade === "Média").length,
    },
    {
      name: "Alta",
      value: institutions.filter(i => i.complexidade === "Alta").length,
    },
  ];

  // Data for Public Type Distribution
  const publicData = [
    {
      name: "Indivíduo",
      value: institutions.filter(i => i.publico === "Indivíduo").length,
    },
    {
      name: "Famílias",
      value: institutions.filter(i => i.publico === "Famílias").length,
    },
  ];

  // Data for Capacity by District
  const districtCapacity = institutions.reduce(
    (acc, inst) => {
      const existing = acc.find(d => d.distrito === inst.distrito);
      if (existing) {
        existing.capacidade += inst.capacidadeAtendimento;
        existing.instituicoes += 1;
      } else {
        acc.push({
          distrito: inst.distrito,
          capacidade: inst.capacidadeAtendimento,
          instituicoes: 1,
        });
      }
      return acc;
    },
    [] as Array<{ distrito: string; capacidade: number; instituicoes: number }>
  );

  const COLORS = {
    primary: "#6B9F7F", // Verde
    secondary: "#C85A54", // Terracota
    accent: "#D4A574", // Bege
    muted: "#E8DCC8", // Bege médio
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Protection Level Distribution */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-6">
          Distribuição por Nível de Proteção
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={protectionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              <Cell fill={COLORS.primary} />
              <Cell fill={COLORS.secondary} />
            </Pie>
            <Tooltip
              formatter={value => `${value} instituições`}
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: `1px solid ${COLORS.muted}`,
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Complexity Distribution */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-6">
          Distribuição por Complexidade
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={complexityData}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.muted} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: `1px solid ${COLORS.muted}`,
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="value" fill={COLORS.primary} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Public Type Distribution */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-6">
          Público Atendido
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={publicData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              <Cell fill={COLORS.secondary} />
              <Cell fill={COLORS.accent} />
            </Pie>
            <Tooltip
              formatter={value => `${value} instituições`}
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: `1px solid ${COLORS.muted}`,
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Capacity by District */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-6">
          Capacidade de Atendimento por Distrito
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={districtCapacity}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.muted} />
            <XAxis dataKey="distrito" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: `1px solid ${COLORS.muted}`,
                borderRadius: "8px",
              }}
              formatter={value => [
                `${(value as number).toLocaleString("pt-BR")}`,
                "Capacidade",
              ]}
            />
            <Bar
              dataKey="capacidade"
              fill={COLORS.primary}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
