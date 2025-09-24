import Header from './components/Header';
import UploadSection from './components/UploadSection';
import ImageList from './components/ImageList';
import DetailSection from './components/DetailSection';
import { APIProvider } from './context/APIContext';

const App = () => {
  return (
    <APIProvider>
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
          <UploadSection />
          <ImageList />
          <DetailSection />
        </div>
      </div>
    </APIProvider>
  );
};

export default App;