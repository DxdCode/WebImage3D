import { ImageIcon } from 'lucide-react';

function RightSidebar({ selectedImage, modelGenerated }) {
  return (
    <div className="w-80 bg-card border-l border-border overflow-y-auto p-4">
      {selectedImage && modelGenerated ? (
        <div className="relative group rounded-lg overflow-hidden border border-border bg-muted/30">
          <img src={selectedImage} alt="Generated Asset" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-xs text-white font-medium">Modelo Generado</p>
              <p className="text-xs text-white/70">Hace unos momentos</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 border border-dashed border-border rounded-lg">
          <div className="text-center text-muted-foreground">
            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-xs">Sin activos aún</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RightSidebar