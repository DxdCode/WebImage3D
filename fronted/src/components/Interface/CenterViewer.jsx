import Model3DViewer from './Model3DViewer';
import { ImageIcon } from 'lucide-react';

function CenterViewer({ selectedImage, isGenerating, modelGenerated }) {
  return (
    <div className="flex-1 relative bg-green-900 dark:bg-neutral-900 h-[calc(100vh-72px)] flex flex-col items-center justify-center p-4">
      <div className="w-full h-full rounded-md border border-border/30 shadow-md overflow-hidden bg-black">
        <Model3DViewer isGenerating={isGenerating} />
      </div>

      {modelGenerated && (
        <div className="absolute bottom-4 left-4 bg-card border border-border/50 rounded-md p-3 max-w-xs shadow-sm">
          <p className="text-xs text-muted-foreground flex items-center gap-2 font-medium select-none">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Modelo generado. Click + arrastrar para rotar
          </p>
        </div>
      )}

      {!modelGenerated && !isGenerating && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4">
          <ImageIcon className="w-16 h-16 mb-3 opacity-30" />
          <p className="text-sm text-muted-foreground text-center select-none">
            El modelo 3D aparecerá aquí
          </p>
        </div>
      )}
    </div>
  );
}

export default CenterViewer;
