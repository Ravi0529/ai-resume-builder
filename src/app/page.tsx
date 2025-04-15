"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText, HelpCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex flex-col items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-[#1f2937] mb-4">
          AI-Powered Resume Builder
        </h1>
        <p className="text-lg md:text-xl text-[#4b5563] mb-8 px-4">
          Create professional resumes in minutes with our intelligent resume
          builder. Let AI help you craft the perfect resume for your dream job.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/builder">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors w-full sm:w-auto"
            >
              <FileText className="w-5 h-5" />
              Create Resume
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>

          <Link href="/guide">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-[#1f2937] px-6 py-3 rounded-lg font-semibold text-lg border-2 border-[#e5e7eb] transition-colors w-full sm:w-auto"
            >
              <HelpCircle className="w-5 h-5" />
              View Guide
            </motion.button>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-[#1f2937] mb-2">
              Smart Formatting
            </h3>
            <p className="text-[#4b5563]">
              AI automatically formats your content for optimal presentation
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-[#1f2937] mb-2">
              ATS-Friendly
            </h3>
            <p className="text-[#4b5563]">
              Ensures your resume passes Applicant Tracking Systems
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-[#1f2937] mb-2">
              PDF Export
            </h3>
            <p className="text-[#4b5563]">
              Download your resume in professional PDF format
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
