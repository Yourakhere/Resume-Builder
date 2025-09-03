import { React, useState, useRef } from 'react';
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);

      if (setPreview) {
        setPreview(newPreviewUrl);  
      }
    }
  };

  const handleRemoveChange = () => {
    setImage(null);
    setPreviewUrl(null);  
    if (setPreview) {
      setPreview(null);  
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className='flex justify-center mb-6'>
      <input
        type='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'  
      />
      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-purple-50 rounded-full relative cursor-pointer">
          <LuUser className="text-4xl text-purple-500" />
          <button
            type='button'
            className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-purple-500/85 to-purple-700 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="w-20 h-20 relative">  
          <img
            src={preview || previewUrl}
            alt="profile photo"
            className="w-full h-full rounded-full object-cover"  
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
            onClick={handleRemoveChange}  
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;