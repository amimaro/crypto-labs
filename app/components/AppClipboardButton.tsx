import { useEffect, useState } from "react";

type AppClipboardButtonProps = {
  copy: any;
};

export default function AppClipboardButton({ copy }: AppClipboardButtonProps) {
  const [showNotification, setShowNotification] = useState(false);

  const copyToClipboard = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(copy);
    setShowNotification(true);
  };

  useEffect(() => {
    const timeoutHandler = setTimeout(() => setShowNotification(false), 2000);
    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [showNotification]);

  return (
    <div className="relative">
      <button
        className="active:text-slate-900 text-slate-600"
        onClick={(e: any) => copyToClipboard(e)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
          <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
        </svg>
      </button>
      {showNotification && (
        <div className="absolute top-0 left-5 text-green-800 drop-shadow-md">
          Copied!
        </div>
      )}
    </div>
  );
}
