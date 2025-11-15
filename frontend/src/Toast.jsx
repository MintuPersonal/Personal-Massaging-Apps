import { useState, useEffect } from 'react';
import './Toast.css'; // Create this CSS file

// Toast Hook
export const useToast = () => {
  const [toast, setToast] = useState({ message: '', visible: false });

  const showToast = (message, duration = 3000) => {
    setToast({ message, visible: true });
    
    setTimeout(() => {
      setToast({ message: '', visible: false });
    }, duration);
  };

  return { toast, showToast };
};

// Toast Component
export const Toast = ({ toast }) => {
  if (!toast.visible) return null;

  return (
    <div className="custom-toast">
      {toast.message}
    </div>
  );
};