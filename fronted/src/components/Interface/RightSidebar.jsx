import { ImageIcon } from 'lucide-react';

function RightSidebar({ selectedImage, modelGenerated }) {
  return (
    <div className="w-full md:w-80 bg-card border-l border-border/40 shadow-sm overflow-y-auto p-4 flex flex-col">
      {selectedImage && modelGenerated ? (
        <div className="relative group rounded-md overflow-hidden border border-border/40 bg-muted/10 shadow-sm">
          <img
            src={selectedImage}
            alt="Generated Asset"
            className="w-full h-48 object-contain rounded-md"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-end p-3 select-none">
            <div>
              <p className="text-xs text-white font-semibold">Modelo Generado</p>
              <p className="text-xs text-white/70">Hace unos momentos</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 border border-dashed border-border rounded-md shadow-sm">
          <div className="text-center text-muted-foreground">
            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-xs select-none">Sin activos aún</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RightSidebar;
