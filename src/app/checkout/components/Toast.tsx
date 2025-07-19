"use client";

import { useState, useEffect } from "react";

interface ToastProps {
  message: string;
}

export default function Toast({ message }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 rounded-md bg-green-500 px-4 py-2 text-white shadow-lg">
      {message}
    </div>
  );
}
