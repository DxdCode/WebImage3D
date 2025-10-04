import Model3DViewer from './Model3DViewer';
import { ImageIcon } from 'lucide-react';

function CenterViewer({ selectedImage, isGenerating, modelGenerated }) {
  return (
    <div className="flex-1 relative bg-green-900 dark:bg-neutral-900">
      <Model3DViewer isGenerating={isGenerating} />

      {modelGenerated && (
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur border border-border rounded-lg p-3 max-w-xs">
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Modelo generado. Click + arrastrar para rotar
          </p>
        </div>
      )}

      {!modelGenerated && !isGenerating && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-muted-foreground">
            <ImageIcon className="w-16 h-16 mx-auto mb-3 opacity-30" />
            <p className="text-sm">El modelo 3D aparecerá aquí</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default CenterViewer