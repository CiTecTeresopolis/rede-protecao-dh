import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Users, Building2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

interface InstitutionTableProps {
  institutions: Institution[];
}

const getProtectionColor = (nivel: string) => {
  if (nivel === "Proteção Social Especial") {
    return "bg-[#C85A54] text-white";
  }
  return "bg-[#6B9F7F] text-white";
};

const getComplexityColor = (complexidade: string) => {
  switch (complexidade) {
    case "Alta":
      return "bg-[#C85A54] text-white";
    case "Média":
      return "bg-[#D4A574] text-[#4A4A4A]";
    default:
      return "bg-[#E8DCC8] text-[#4A4A4A]";
  }
};

export default function InstitutionTable({
  institutions,
}: InstitutionTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProtection, setFilterProtection] = useState<string>("all");
  const [filterDistrict, setFilterDistrict] = useState<string>("all");

  const filteredInstitutions = useMemo(() => {
    return institutions.filter(inst => {
      const matchesSearch =
        inst.instituicao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.bairro.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.servicosPrestados.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesProtection =
        filterProtection === "all" || inst.nivelProtecao === filterProtection;

      const matchesDistrict =
        filterDistrict === "all" || inst.distrito === filterDistrict;

      return matchesSearch && matchesProtection && matchesDistrict;
    });
  }, [searchTerm, filterProtection, filterDistrict, institutions]);

  const districts = Array.from(
    new Set(institutions.map(inst => inst.distrito))
  ).sort();

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Table */}
        <div className="bg-white rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F5E6D3] border-b border-border">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Instituição
                  </th>
                  {/* <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Serviço
                </th> */}
                  <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                    Nível
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                    Complexidade
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                    Capacidade
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                    Localização
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredInstitutions.map((inst, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border hover:bg-[#F9F6F1] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="cursor-help">
                            <div className="font-semibold text-foreground text-sm">
                              {inst.instituicao}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {inst.tipoAtendimento}
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-xs">
                          <p className="font-semibold mb-1">
                            Serviços Prestados:
                          </p>
                          <p>{inst.servicosPrestados}</p>
                        </TooltipContent>
                      </Tooltip>
                    </td>
                    {/* <td className="px-6 py-4 text-sm text-foreground">
                    {inst.servicosPrestados}
                  </td> */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs text-center font-medium ${getProtectionColor(
                          inst.nivelProtecao
                        )}`}
                      >
                        {inst.nivelProtecao == "Proteção Social"
                          ? "Proteção Social"
                          : "Proteção Social Especial"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getComplexityColor(
                          inst.complexidade
                        )}`}
                      >
                        {inst.complexidade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground text-center">
                      {inst.capacidadeAtendimento.toLocaleString("pt-BR")}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground bg-red text-center">
                      {inst.bairro}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredInstitutions.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-muted-foreground">
                Nenhuma instituição encontrada com os filtros selecionados.
              </p>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
