import { Upload, X, RefreshCcw, Camera, Sun } from 'lucide-react';

function LeftSidebar({
  selectedImage,
  fileInputRef,
  handleImageSelect,
  handleClearImage,
  handleGenerateModel,
  isGenerating,
  onResetCamera,
  onToggleCameraMode,
  onToggleLighting,
  modelGenerated,
}) {
  return (
    <div className="w-full md:w-72 bg-card border-r border-border/40 shadow-sm overflow-y-auto p-4 space-y-6 flex flex-col">
      {/* Upload Section */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Imagen / Texto a 3D
        </h3>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-md cursor-pointer hover:border-primary transition-colors"
        >
          <Upload className="w-8 h-8 mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
          <p className="text-xs text-muted-foreground text-center px-2 select-none">
            Click para subir imagen
          </p>
        </label>

        {selectedImage && (
          <div className="relative rounded-md overflow-hidden border border-border/40 bg-muted/10 mt-4 shadow-sm">
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full h-40 object-contain rounded-md"
            />
            <button
              onClick={handleClearImage}
              className="absolute top-2 right-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground p-1.5 rounded-md opacity-100"
              aria-label="Clear Image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerateModel}
        disabled={!selectedImage || isGenerating}
        className="mt-auto w-full h-12 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-black font-semibold rounded-md transition-colors"
      >
        {isGenerating ? 'Generando...' : 'Generar'}
      </button>

      {/* Extra Actions */}
      {modelGenerated && (
        <div className="mt-6 flex justify-between gap-2">
          <button
            onClick={onResetCamera}
            className="flex-1 flex items-center justify-center gap-2 h-10 bg-primary/80 hover:bg-primary rounded-md text-white font-semibold transition"
            title="Resetear cámara"
          >
            <RefreshCcw className="w-5 h-5" />
            Reset Cámara
          </button>

          <button
            onClick={onToggleCameraMode}
            className="flex-1 flex items-center justify-center gap-2 h-10 bg-secondary/80 hover:bg-secondary rounded-md text-white font-semibold transition"
            title="Cambiar modo cámara"
          >
            <Camera className="w-5 h-5" />
            Cambiar Vista
          </button>

          <button
            onClick={onToggleLighting}
            className="flex-1 flex items-center justify-center gap-2 h-10 bg-accent/80 hover:bg-accent rounded-md text-white font-semibold transition"
            title="Alternar luces"
          >
            <Sun className="w-5 h-5" />
            Luz
          </button>
        </div>
      )}
    </div>
  );
}

export default LeftSidebar;
