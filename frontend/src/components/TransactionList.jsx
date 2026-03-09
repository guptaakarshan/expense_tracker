import React from "react";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";

const TransactionList = ({ transactions, onDelete, onEdit, type }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm text-center">
        <p className="text-gray-400 text-sm">No transactions yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">
              Description
            </th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">
              Category
            </th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">
              Date
            </th>
            <th className="text-right text-xs font-medium text-gray-500 uppercase px-5 py-3">
              Amount
            </th>
            <th className="text-right text-xs font-medium text-gray-500 uppercase px-5 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item) => (
            <tr
              key={item._id}
              className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
            >
              <td className="px-5 py-3.5 text-sm text-gray-800">
                {item.description}
              </td>
              <td className="px-5 py-3.5">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                  {item.category}
                </span>
              </td>
              <td className="px-5 py-3.5 text-sm text-gray-500">
                {new Date(item.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td
                className={`px-5 py-3.5 text-sm font-medium text-right ${
                  type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {type === "income" ? "+" : "-"}₹
                {item.amount?.toLocaleString("en-IN")}
              </td>
              <td className="px-5 py-3.5 text-right">
                <div className="flex items-center justify-end gap-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <HiOutlinePencil className="w-4 h-4" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(item._id)}
                      className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
