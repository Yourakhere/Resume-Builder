import React from 'react';

const TemplateCard = ({ thumbnailImg, isSelected, onSelect }) => {
  return (
    <div
      className={`h-auto md:h-[300px] flex flex-col items-center justify-between bg-white rounded-md shadow-sm p-3 cursor-pointer ${
        isSelected ? "border-purple-500 border-2" : ""
      }`}
      onClick={onSelect}
    >
      {thumbnailImg ? (
        <img
          src={thumbnailImg}
          alt="template thumbnail"
          className="w-[100%] rounded"
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TemplateCard;
