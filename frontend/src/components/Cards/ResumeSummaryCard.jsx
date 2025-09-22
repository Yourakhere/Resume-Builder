import React, { useEffect, useState } from 'react';
import { FileText, User, Briefcase } from 'lucide-react';
import { getLightColorFromImage } from '../../utils/helper';

const ResumeSummaryCard = ({ imgUrl, title, lastUpdated, onSelect }) => {
  const [bgColor, setBgColor] = useState("#8B5CF6");  
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    if (imgUrl) {
      getLightColorFromImage(imgUrl)
        .then((color) => {
          setBgColor(color);
        })
        .catch(() => {
          setBgColor("#8B5CF6");
        });
    }
  }, [imgUrl]);

  // Icon placeholder component
  const IconPlaceholder = () => (
    <div className="w-full h-[200px]   flex items-center justify-center rounded">
      <FileText size={48} className="text-purple-400" />
    </div>
  );

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className="h-[300px] flex flex-col items-center justify-between bg-white rounded-lg border border-gray-200 hover:border-purple-300 cursor-pointer"
      onClick={onSelect}
    >
      <div className="p-4">
        {imgUrl && !imageError ? (
          <img
            src={imgUrl}
            alt={title || "Resume thumbnail"}
            className="w-full h-[200px] object-cover rounded"
            onError={handleImageError}
          />
        ) : (
          <IconPlaceholder />
        )}
      </div>
      <div className="w-full bg-white px-4 py-3">
        <h5 className="text-sm font-medium truncate">{title}</h5>
        <p className="text-xs font-medium text-gray-500 mt-0.5">
          Last Updated: {lastUpdated}
        </p>
      </div>
    </div>
  );
};

export default ResumeSummaryCard;
