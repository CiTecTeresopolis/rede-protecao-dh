import { Heart } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="container py-6 md:py-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Rede de Proteção
          </h1>
        </div>
        <p className="text-muted-foreground font-sans">
          Painel de Instituições de Direitos Humanos e Proteção Social
        </p>
      </div>
    </header>
  );
}
