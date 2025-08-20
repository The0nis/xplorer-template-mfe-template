import React from 'react';

interface FullPageLoaderProps {
  type?: 'full' | 'default';
  loadingText?: string;
}

const FullPageLoader: React.FC<FullPageLoaderProps> = ({ 
  type = 'default', 
  loadingText 
}) => {
  const LoaderIcon = () => (
    <div className="relative">
      <div className="w-12 h-12 border-4 border-whitesmoke border-t-4 border-t-gray-300 rounded-full animate-spin"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-4 border-whitesmoke border-t-4 border-t-gray-200 rounded-full animate-spin-slow"></div>
    </div>
  );

  if (type === 'full') {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/20 backdrop-blur-[2px]">
        <div className="flex flex-col items-center">
          <LoaderIcon />
          {loadingText && (
            <p className="mt-4 text-center text-gray-600">
              {loadingText}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center">
      <LoaderIcon />
      {loadingText && (
        <p className="mt-4 text-center text-gray-600">
          {loadingText}
        </p>
      )}
    </div>
  );
};

export default FullPageLoader;