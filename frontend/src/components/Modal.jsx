import React from 'react';

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  hideHeader,
  showActionBtn,
  actionBtnIcon = null,
  actionBtnText,
  onActionClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center bg-black/50'>
      <div className='relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden max-w-lg w-full max-h-[90vh]'>
        
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className='md:text-lg font-medium text-gray-900'>{title}</h3>
            {showActionBtn && (
              <button className='btn-small-light mr-12' onClick={onActionClick}>
                {actionBtnIcon}
                {actionBtnText}
              </button>
            )}
          </div>
        )}

        <button
          type='button'
          className='text-gray-400 hover:text-gray-900 rounded-lg w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 z-10'
          onClick={onClose}
          aria-label="Close Modal"
        >
          <svg className='w-3 h-3' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14'>
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M1 1l6 6m0 0l6 6M7 7L1 13M7 7l6-6'
            />
          </svg>
        </button>

        <div className='flex-1 overflow-y-auto custom-scrollbar p-6'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;





















/**
    111111111111111
import React from 'react';

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  hideHeader,
  showActionBtn,
  actionBtnIcon = null,
  actionBtnText,
  onActionClick,
}) => {  
  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center  bg-black/50'>
      <div className={`relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden max-w-lg w-full max-h-[90vh]`}>
 
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className='md:text-lg font-medium text-gray-900'>{title}</h3>

            {showActionBtn && (
              <button className='btn-small-light mr-12' onClick={onActionClick}>
                {actionBtnIcon}
                {actionBtnText}
              </button>
            )}
          </div>
        )}
 
        <button
          type='button'
          className='text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 z-10' // Added z-10 to ensure it's on top
          onClick={onClose}
          aria-label="Close Modal"  
        >
          <svg
            className='w-3 h-3'
            aria-hidden="true"
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M1 1l6 6m0 0l6 6M7 7L1 13M7 7l6-6'
            />
          </svg>
        </button>
 
        <div className='flex-1 overflow-y-auto custom-scrollbar p-6'>
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;


 // old 222222
  
  import React from "react";

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  showActionBtn,
  actionBtnIcon = null,
  actionBtnText,
  onActionClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/70">
 
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>

        <div className="flex items-center gap-3">
          {showActionBtn && (
            <button
              onClick={onActionClick}
              className="flex items-center gap-2 text-sm text-white bg-purple-600 hover:bg-purple-700 px-3 py-1.5 rounded-md transition"
            >
              {actionBtnIcon}
              {actionBtnText}
            </button>
          )}
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 w-9 h-9 flex justify-center items-center rounded-full hover:bg-gray-200 transition"
            aria-label="Close Modal"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1l6 6m0 0l6 6M7 7L1 13M7 7l6-6"
              />
            </svg>
          </button>
        </div>
      </div>
 
      <div className="flex-1 flex justify-center items-center bg-gray-100 p-6">
        <div className="w-full h-full max-w-5xl bg-white shadow-lg rounded-lg p-10 border border-gray-200 flex justify-center items-center">
          <div className="w-full h-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
*/}
