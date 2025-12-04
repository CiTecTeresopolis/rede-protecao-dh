import { useEffect, useState } from "react";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import Charts from "@/components/Charts";
import InstitutionTable from "@/components/InstitutionTable";
import { Building2, Users, Heart, TrendingUp, Loader2 } from "lucide-react";

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

export default function Home() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/rede_dh_data.json")
      .then(res => res.json())
      .then(data => {
        setInstitutions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
          <p className="text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalCapacity = institutions.reduce(
    (sum, inst) => sum + inst.capacidadeAtendimento,
    0
  );
  const specialProtectionCount = institutions.filter(
    i => i.nivelProtecao === "Proteção Social Especial"
  ).length;
  const basicProtectionCount = institutions.filter(
    i => i.nivelProtecao === "Proteção Social"
  ).length;
  const uniqueDistricts = new Set(institutions.map(i => i.distrito)).size;

  return (
    <div className="min-h-screen bg-background">
      {/* <Header /> */}

      {/* Hero Section with Background Image */}
      <section className="relative py-8 md:py-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('/images/protection-network.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container relative z-10">
          <div className="max-w-5xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mapeamento da Rede de Proteção Social - 2025
            </h2>
            <p className="text-lg text-muted-foreground font-sans">
              Visualize informações sobre instituições de proteção social,
              serviços prestados e capacidade de atendimento em toda a região.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-8 md:py-16">
        <div className="container">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
            Resumo Executivo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total de Instituições"
              value={institutions.length}
              icon={Building2}
              color="terracota"
              description="Entidades mapeadas"
            />
            <StatCard
              title="Capacidade Total"
              value={totalCapacity.toLocaleString("pt-BR")}
              icon={Users}
              color="green"
              description="Pessoas atendidas"
            />
            <StatCard
              title="Proteção Especial"
              value={specialProtectionCount}
              icon={Heart}
              color="terracota"
              description="Instituições de proteção especial"
            />
            <StatCard
              title="Distritos Cobertos"
              value={uniqueDistricts}
              icon={TrendingUp}
              color="beige"
              description="Áreas de atuação"
            />
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-12 md:py-16 bg-white border-t border-border">
        <div className="container">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
            Análise de Dados
          </h2>
          <Charts institutions={institutions} />
        </div>
      </section>

      {/* Institutions Table Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
            Instituições Cadastradas
          </h2>
          <InstitutionTable institutions={institutions} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-8 md:py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Painel de Rede de Proteção de Direitos Humanos
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Dados atualizados e mantidos pela Secretaria Municipal de
                Ciência e Tecnologia
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              © 2025 Prefeitura Municipal de Teresópolis. Todos os direitos
              reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
