import { ToastContainer } from 'react-toastify';
import ImageUpload3D from './Interface/ImageUpload3D';
import Navbar from './Home/Navbar';

function ImageManger() {
    return (
        <>
            <ToastContainer />
                <Navbar />
                    <ImageUpload3D />
        </>
    );
}

export default ImageManger;
