"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Loader2, Download } from "lucide-react";
import { MdEmail, MdPhone, MdLocationOn, MdPerson } from "react-icons/md";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaGlobe,
  FaGraduationCap,
  FaBriefcase,
  FaProjectDiagram,
  FaTools,
  FaTrophy,
  FaCertificate,
  FaHandshake,
  FaBook,
  FaLanguage,
  FaGamepad,
  FaUserFriends,
} from "react-icons/fa";

export default function Builder() {
  const [inputText, setInputText] = useState("");
  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/ai-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      setResume(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setDownloadingPdf(true);
      const element = resumeRef.current;
      if (!element) return;

      const html2pdf = (await import("html2pdf.js")).default;
      const opt = {
        margin: [10, 10, 10, 10],
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          removeContainer: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          compress: true,
        },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setDownloadingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Professional Resume Builder
          </h1>
          <p className="text-gray-600">
            Create a stunning resume in minutes with AI assistance
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2 bg-white rounded-lg shadow-sm p-6 border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Information
            </h2>
            <textarea
              className="w-full h-64 md:h-96 border border-gray-200 rounded-lg p-4 resize-none text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Paste your resume description here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !inputText.trim()}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating Resume...</span>
                </>
              ) : (
                "Generate Resume"
              )}
            </button>
          </motion.div>

          {/* Resume Display Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2 bg-white rounded-lg shadow-sm p-6 border border-gray-100 overflow-y-auto max-h-[calc(100vh-200px)]"
          >
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                <p className="text-gray-600">
                  Generating your professional resume...
                </p>
              </div>
            ) : resume ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-md font-medium text-gray-800">
                    resume.pdf
                  </h1>
                  <button
                    onClick={handleDownloadPDF}
                    disabled={downloadingPdf}
                    className="flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] disabled:bg-[#93c5fd] text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {downloadingPdf ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download PDF
                      </>
                    )}
                  </button>
                </div>
                <div
                  ref={resumeRef}
                  className="space-y-6 rounded-lg"
                  style={{
                    maxWidth: "210mm",
                    backgroundColor: "#ffffff",
                    padding: "2rem",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                    color: "#1f2937",
                  }}
                >
                  {/* Name */}
                  <h1 className="text-[#1f2937] text-2xl font-bold">
                    {resume.name}
                  </h1>

                  {/* Contact */}
                  {resume.contact && (
                    <div className="flex flex-wrap gap-3 text-sm text-[#4b5563]">
                      {resume.contact.email && (
                        <span className="flex items-center gap-1">
                          <MdEmail className="w-4 h-4 text-[#4b5563]" />
                          {resume.contact.email}
                        </span>
                      )}
                      {resume.contact.phone && (
                        <span className="flex items-center gap-1">
                          <MdPhone className="w-4 h-4 text-[#4b5563]" />
                          {resume.contact.phone}
                        </span>
                      )}
                      {resume.contact.linkedin && (
                        <a
                          href={resume.contact.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[#4b5563] hover:text-[#1f2937]"
                        >
                          <FaLinkedin className="w-4 h-4" />
                          LinkedIn
                        </a>
                      )}
                      {resume.contact.github && (
                        <a
                          href={resume.contact.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[#4b5563] hover:text-[#1f2937]"
                        >
                          <FaGithub className="w-4 h-4" />
                          GitHub
                        </a>
                      )}
                      {resume.contact.website && (
                        <a
                          href={resume.contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[#4b5563] hover:text-[#1f2937]"
                        >
                          <FaGlobe className="w-4 h-4" />
                          Website
                        </a>
                      )}
                      {resume.contact.twitter && (
                        <a
                          href={resume.contact.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[#4b5563] hover:text-[#1f2937]"
                        >
                          <FaTwitter className="w-4 h-4" />
                          Twitter
                        </a>
                      )}
                      {resume.contact.address && (
                        <span className="flex items-center gap-1">
                          <MdLocationOn className="w-4 h-4 text-[#4b5563]" />
                          {resume.contact.address}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Summary */}
                  {resume.summary && (
                    <div>
                      <h2 className="text-lg font-semibold text-[#1f2937] border-b border-[#e5e7eb] pb-1 flex items-center gap-2">
                        <MdPerson className="w-5 h-5 text-[#4b5563]" />
                        Summary
                      </h2>
                      <p className="text-[#4b5563] mt-2">{resume.summary}</p>
                    </div>
                  )}

                  {/* Education */}
                  {resume.education && (
                    <div>
                      <h2 className="text-lg font-semibold text-[#1f2937] border-b border-[#e5e7eb] pb-1 flex items-center gap-2">
                        <FaGraduationCap className="w-5 h-5 text-[#4b5563]" />
                        Education
                      </h2>
                      <div className="space-y-2 mt-2">
                        {resume.education.map((edu: any, idx: number) => (
                          <div key={idx} className="p-4">
                            <p className="font-semibold text-[#1f2937]">
                              {edu.degree}
                            </p>
                            <p className="text-sm text-[#4b5563]">
                              {typeof edu.institution === "object"
                                ? edu.institution.name
                                : edu.institution}{" "}
                              {edu.year ? `(${edu.year})` : ""}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Experience */}
                  {resume.experience && (
                    <div>
                      <h2 className="text-lg font-semibold text-[#1f2937] border-b border-[#e5e7eb] pb-1 flex items-center gap-2">
                        <FaBriefcase className="w-5 h-5 text-[#4b5563]" />
                        Experience
                      </h2>
                      <div className="space-y-4 mt-2">
                        {resume.experience.map((exp: any, idx: number) => (
                          <div key={idx} className="p-4">
                            <p className="font-semibold text-[#1f2937]">
                              {exp.position || "Position not specified"} at{" "}
                              {exp.company || "Company not specified"}
                            </p>
                            <p className="text-sm text-[#4b5563]">
                              {exp.duration ? `${exp.duration}` : ""}{" "}
                              {exp.location ? `| ${exp.location}` : ""}
                            </p>
                            {exp.description && (
                              <p className="text-sm text-[#4b5563] mt-2">
                                {exp.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  {resume.projects && (
                    <div>
                      <h2 className="text-lg font-semibold text-[#1f2937] border-b border-[#e5e7eb] pb-1 flex items-center gap-2">
                        <FaProjectDiagram className="w-5 h-5 text-[#4b5563]" />
                        Projects
                      </h2>
                      <div className="space-y-4 mt-2">
                        {resume.projects.map((proj: any, idx: number) => (
                          <div key={idx} className="p-4">
                            <p className="font-semibold text-[#1f2937]">
                              {proj.title}
                            </p>
                            <p className="text-sm text-[#4b5563] mt-2">
                              {proj.description}
                            </p>
                            {proj.techStack && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {proj.techStack.map(
                                  (tech: string, techIdx: number) => (
                                    <span
                                      key={techIdx}
                                      className="text-xs text-[#4b5563] border border-[#e5e7eb] px-2 py-1 rounded"
                                    >
                                      {tech}
                                    </span>
                                  )
                                )}
                              </div>
                            )}
                            {proj.deployment && (
                              <a
                                href={proj.deployment}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#1f2937] hover:text-[#1e40af] text-sm mt-2 inline-flex items-center gap-1"
                              >
                                View Project
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {resume.skills && (
                    <div>
                      <h2 className="text-lg font-semibold text-[#1f2937] border-b border-[#e5e7eb] pb-1 flex items-center gap-2">
                        <FaTools className="w-5 h-5 text-[#4b5563]" />
                        Skills
                      </h2>
                      <div className="mt-2">
                        {resume.skills.technical && (
                          <div className="mb-2">
                            <p className="text-sm font-medium text-[#1f2937]">
                              Technical:
                            </p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {resume.skills.technical.map(
                                (skill: string, idx: number) => (
                                  <span
                                    key={idx}
                                    className="text-xs text-[#4b5563] border border-[#e5e7eb] px-2 py-1 rounded"
                                  >
                                    {skill}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}
                        {resume.skills.soft && (
                          <div>
                            <p className="text-sm font-medium text-[#1f2937]">
                              Soft:
                            </p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {resume.skills.soft.map(
                                (skill: string, idx: number) => (
                                  <span
                                    key={idx}
                                    className="text-xs text-[#4b5563] border border-[#e5e7eb] px-2 py-1 rounded"
                                  >
                                    {skill}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Achievements */}
                  {resume.achievements && (
                    <div>
                      <h2 className="text-lg font-semibold text-[#1f2937] border-b border-[#e5e7eb] pb-1 flex items-center gap-2">
                        <FaTrophy className="w-5 h-5 text-[#4b5563]" />
                        Achievements
                      </h2>
                      <ul className="list-disc list-inside text-sm text-[#4b5563] mt-2 space-y-1">
                        {resume.achievements.map((ach: string, idx: number) => (
                          <li key={idx}>{ach}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Certifications */}
                  {resume.certifications && (
                    <div>
                      <h2 className="text-lg font-semibold text-[#1f2937] border-b border-[#e5e7eb] pb-1 flex items-center gap-2">
                        <FaCertificate className="w-5 h-5 text-[#4b5563]" />
                        Certifications
                      </h2>
                      <div className="flex flex-wrap gap-3 mt-2">
                        {resume.certifications.map(
                          (cert: string, idx: number) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-sm text-[#4b5563] px-1 pb-2"
                            >
                              <span className="text-[#4b5563] text-lg">•</span>
                              {cert}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Volunteer Work / Extracurriculars */}
                  {resume.volunteer && (
                    <div>
                      <h2 className="text-lg font-semibold text-[#1f2937] border-b border-[#e5e7eb] pb-1 flex items-center gap-2">
                        <FaHandshake className="w-5 h-5 text-[#4b5563]" />
                        Volunteer / Extracurriculars
                      </h2>
                      <ul className="list-disc list-inside text-sm text-[#4b5563] mt-2 space-y-1">
                        {resume.volunteer.map((item: string, idx: number) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Publications */}
                  {resume.publications && (
                    <div>
                      <h2 className="text-lg font-semibold text-[#1f2937] border-b border-[#e5e7eb] pb-1 flex items-center gap-2">
                        <FaBook className="w-5 h-5 text-[#4b5563]" />
                        Publications
                      </h2>
                      <ul className="list-disc list-inside text-sm text-[#4b5563] mt-2 space-y-1">
                        {resume.publications.map((pub: string, idx: number) => (
                          <li key={idx}>{pub}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Languages */}
                  {resume.languages && (
                    <div>
                      <h2 className="text-lg font-semibold text-[#1f2937] border-b border-[#e5e7eb] pb-1 flex items-center gap-2">
                        <FaLanguage className="w-5 h-5 text-[#4b5563]" />
                        Languages
                      </h2>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {resume.languages.map((lang: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-xs text-[#4b5563] border border-[#e5e7eb] px-2 py-1 rounded"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hobbies */}
                  {resume.hobbies && (
                    <div>
                      <h2 className="text-lg font-semibold text-[#1f2937] border-b border-[#e5e7eb] pb-1 flex items-center gap-2">
                        <FaGamepad className="w-5 h-5 text-[#4b5563]" />
                        Hobbies / Interests
                      </h2>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {resume.hobbies.map((hobby: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-xs text-[#4b5563] border border-[#e5e7eb] px-2 py-1 rounded"
                          >
                            {hobby}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* References */}
                  {resume.references && (
                    <div>
                      <h2 className="text-lg font-semibold text-[#1f2937] border-b border-[#e5e7eb] pb-1 flex items-center gap-2">
                        <FaUserFriends className="w-5 h-5 text-[#4b5563]" />
                        References
                      </h2>
                      <div className="space-y-4 mt-2">
                        {resume.references.map((ref: any, idx: number) => (
                          <div key={idx} className="p-4">
                            <p className="font-semibold text-[#1f2937]">
                              {ref.name || "Name not provided"}
                            </p>
                            {ref.company && (
                              <p className="text-sm text-[#4b5563]">
                                Company: {ref.company}
                              </p>
                            )}
                            {ref.position && (
                              <p className="text-sm text-[#4b5563]">
                                Position: {ref.position}
                              </p>
                            )}
                            {ref.phone && (
                              <p className="text-sm text-[#4b5563]">
                                Phone: {ref.phone}
                              </p>
                            )}
                            {ref.email && (
                              <p className="text-sm text-[#4b5563]">
                                Email: {ref.email}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <svg
                  className="w-16 h-16 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p>Your generated resume will appear here</p>
                <p className="text-sm mt-2">
                  Enter your information on the left and click "Generate Resume"
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
