import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CancelPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
        <h1 className="font-display font-bold text-2xl text-slate-900 mb-2">
          Payment Cancelled
        </h1>
        <p className="font-sans text-slate-500 mb-8">
          Your payment process was interrupted or cancelled. You can try completing your purchase again.
        </p>
        <Link
          to="/"
          className="inline-block w-full py-3 px-4 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-medium transition-colors shadow-lg shadow-slate-900/20"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
};

export default CancelPage;
