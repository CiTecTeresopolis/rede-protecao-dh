import { useState, useMemo, useCallback } from "react";
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
  imagem: string;
  coordenadas: string;
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

const Modal = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;

  return (
    // Overlay de fundo
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Container do Modal */}
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto transform transition-all duration-300 scale-100 opacity-100"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-[#f3d7b3] rounded-t-xl">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-white"
            aria-label="Fechar Modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* Corpo do Modal (em branco, como solicitado) */}
        <div className="h-160 flex">{children}</div>
      </div>
    </div>
  );
};

export default function InstitutionTable({
  institutions,
}: InstitutionTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProtection, setFilterProtection] = useState<string>("all");
  const [filterDistrict, setFilterDistrict] = useState<string>("all");

  // Novo estado para o Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] =
    useState<Institution | null>(null);

  // Função para abrir o modal
  const openLocationModal = useCallback((inst: Institution) => {
    setSelectedInstitution(inst);
    setIsModalOpen(true);
  }, []);

  // Função para fechar o modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedInstitution(null);
  }, []);

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
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs text-center font-medium ${getProtectionColor(
                          inst.nivelProtecao
                        )}`}
                      >
                        {inst.nivelProtecao == "Proteção Social"
                          ? "Básico"
                          : "Especial"}
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
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className="cursor-help"
                            onClick={() => openLocationModal(inst)}
                          >
                            {inst.bairro}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-xs">
                          <p className="font-semibold mb-1">Endereço:</p>
                          <p>
                            {inst.enderecoCompleto} - {inst.bairro}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={`${selectedInstitution?.instituicao || ""}`}
        >
          <div>
            {selectedInstitution && (
              <img
                className="imagem"
                width={550}
                height={200}
                src={selectedInstitution.imagem}
                style={{ height: 300 }}
              />
            )}
            <div className="p-6 gap-5 flex flex-col">
              <p className="text-gray-600 text-sm font-medium">
                {selectedInstitution &&
                  `Endereço: ${selectedInstitution.enderecoCompleto} - ${selectedInstitution.bairro}`}
              </p>

              <h3>Localização</h3>
              <div className="map-embed">
                <iframe
                  title="Google Map"
                  src={selectedInstitution?.coordenadas}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </TooltipProvider>
  );
}
