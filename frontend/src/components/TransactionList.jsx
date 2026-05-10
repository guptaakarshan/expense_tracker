import React, { useState } from "react";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import ConfirmModal from "./ConfirmModal";

const TransactionList = ({ transactions, onDelete, onEdit, type }) => {
  const [itemToDelete, setItemToDelete] = useState(null);

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white border border-stone-200 rounded-xl p-12 text-center">
        <p className="text-stone-400 text-sm">No transactions yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-stone-100 bg-stone-50">
            <th className="text-left text-[11px] font-medium text-stone-400 uppercase tracking-wider px-5 py-3">
              Description
            </th>
            <th className="text-left text-[11px] font-medium text-stone-400 uppercase tracking-wider px-5 py-3">
              Category
            </th>
            <th className="text-left text-[11px] font-medium text-stone-400 uppercase tracking-wider px-5 py-3">
              Date
            </th>
            <th className="text-right text-[11px] font-medium text-stone-400 uppercase tracking-wider px-5 py-3">
              Amount
            </th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-50">
          {transactions.map((item) => (
            <tr
              key={item._id}
              className="hover:bg-stone-50/60 transition-colors group"
            >
              <td className="px-5 py-3.5 text-sm text-zinc-800 font-medium">
                {item.description}
              </td>
              <td className="px-5 py-3.5">
                <span className="text-[11px] font-medium bg-stone-100 text-stone-500 px-2.5 py-1 rounded-full">
                  {item.category}
                </span>
              </td>
              <td className="px-5 py-3.5 text-sm text-stone-400 font-mono">
                {new Date(item.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td
                className={`px-5 py-3.5 text-sm font-semibold font-mono text-right ${
                  type === "income" ? "text-emerald-700" : "text-red-600"
                }`}
              >
                {type === "income" ? "+" : "−"}₹
                {item.amount?.toLocaleString("en-IN")}
              </td>
              <td className="px-5 py-3.5">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="p-1.5 rounded-md text-stone-400 hover:text-zinc-700 hover:bg-stone-100 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <HiOutlinePencil className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => setItemToDelete(item._id)}
                      className="p-1.5 rounded-md text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <HiOutlineTrash className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      <ConfirmModal
        isOpen={!!itemToDelete}
        title="Delete transaction"
        message="Are you sure you want to delete this transaction? This action cannot be undone."
        confirmText="Delete"
        onConfirm={() => {
          onDelete(itemToDelete);
          setItemToDelete(null);
        }}
        onCancel={() => setItemToDelete(null)}
      />
    </>
  );
};

export default TransactionList;
