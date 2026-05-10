import React from "react";

const ConfirmModal = ({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  confirmText = "Confirm", 
  cancelText = "Cancel", 
  confirmStyle = "danger" 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden border border-stone-200 transform scale-100 transition-all">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-zinc-900 mb-2 tracking-tight">{title}</h3>
          <p className="text-sm text-stone-500 leading-relaxed">{message}</p>
        </div>
        <div className="bg-stone-50 border-t border-stone-100 px-6 py-4 flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-zinc-700 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 hover:text-zinc-900 transition-colors cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors cursor-pointer ${
              confirmStyle === "danger"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-orange-700 hover:bg-orange-800"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
