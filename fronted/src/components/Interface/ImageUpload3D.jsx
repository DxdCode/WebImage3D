import { useState, useRef } from 'react';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import CenterViewer from './CenterViewer';
import RightSidebar from './RightSidebar';

function ImageUpload3D() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [modelGenerated, setModelGenerated] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target.result);
      setModelGenerated(false);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateModel = () => {
    if (!selectedImage) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setModelGenerated(true);
    }, 3000);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setModelGenerated(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-green-900 dark:bg-neutral-900 text-white">
      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar
          selectedImage={selectedImage}
          fileInputRef={fileInputRef}
          handleImageSelect={handleImageSelect}
          handleClearImage={handleClearImage}
          handleGenerateModel={handleGenerateModel}
          isGenerating={isGenerating}
        />
        <CenterViewer
          selectedImage={selectedImage}
          isGenerating={isGenerating}
          modelGenerated={modelGenerated}
        />
        <RightSidebar selectedImage={selectedImage} modelGenerated={modelGenerated} />
      </div>
    </div>
  );
}
export default ImageUpload3D