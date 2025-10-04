import { Cpu } from 'lucide-react';

function Header() {
  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm px-6 py-4 flex items-center gap-3">
      <Cpu className="w-6 h-6 text-primary" />
      <h1 className="text-xl font-bold text-white">Generar Modelos 3D</h1>
    </div>
  );
}

export default Header
