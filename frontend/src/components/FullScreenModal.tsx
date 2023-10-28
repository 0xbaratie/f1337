import React, { FC } from 'react';

interface FullScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const FullScreenModal: FC<FullScreenModalProps> = ({ isOpen, onClose, children }) => {
  const modalClasses = isOpen ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden';

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div className={modalClasses} onClick={onClose}>
      <div className="fixed inset-0 bg-black opacity-70 -z-10"></div>
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl" onClick={handleModalClick}>
        {children}
      </div>
    </div>
  );
};

export default FullScreenModal;
