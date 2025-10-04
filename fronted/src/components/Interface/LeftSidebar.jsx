import { Upload, X } from 'lucide-react';

function LeftSidebar({
    selectedImage,
    fileInputRef,
    handleImageSelect,
    handleClearImage,
    handleGenerateModel,
    isGenerating
}) {
    return (
        <div className="w-72 bg-card border-r border-border overflow-y-auto p-4 space-y-6">
            {/* Upload Section */}
            <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
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
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-muted/50 transition-all group"
                >
                    <Upload className="w-8 h-8 mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
                    <p className="text-xs text-muted-foreground text-center px-2">Click para subir imagen</p>
                </label>

                {selectedImage && (
                    <div className="relative rounded-lg overflow-hidden border border-border bg-muted/30 group mt-2">
                        <img src={selectedImage} alt="Preview" className="w-full h-40 object-cover" />
                        <button
                            onClick={handleClearImage}
                            className="absolute top-2 right-2 bg-destructive hover:bg-destructive/80 text-destructive-foreground p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
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
                className="w-full h-12 bg-yellow-500 hover:bg-yellow-600 text-black font-bold gap-2 flex items-center justify-center"
            >
                {isGenerating ? 'Generando...' : 'Generar'}
            </button>
        </div>
    );
}


export default LeftSidebar