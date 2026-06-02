import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
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
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h1 className="font-display font-bold text-2xl text-slate-900 mb-2">
          Payment Successful!
        </h1>
        <p className="font-sans text-slate-500 mb-8">
          Thank you for your purchase. Your order has been placed successfully and is being processed.
          {sessionId && <span className="block mt-2 text-xs text-slate-400">Transaction ID: {sessionId}</span>}
        </p>
        <Link
          to="/"
          className="inline-block w-full py-3 px-4 bg-[#3b82f6] hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/30"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
