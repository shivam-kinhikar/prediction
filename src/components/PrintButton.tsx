"use client";

import { Download } from "lucide-react";

export default function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="inline-flex items-center justify-center px-6 py-3 border border-indigo-200 shadow-sm text-base font-medium rounded-md text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors print:hidden"
    >
      <Download className="w-4 h-4 mr-2" />
      Save as PDF
    </button>
  );
}
