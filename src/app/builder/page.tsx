"use client";

import { useState } from "react";

export default function Builder() {
  const [inputText, setInputText] = useState("");
  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="flex h-screen p-4 gap-4 bg-gray-100">
      {/* Left Side: Input Box */}
      <div className="w-1/2 p-4 bg-white rounded-xl shadow-md flex flex-col">
        <h2 className="text-xl font-bold mb-4">Resume Builder</h2>
        <textarea
          className="w-full h-full border rounded p-2 resize-none text-sm"
          placeholder="Paste your resume description here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Resume"}
        </button>
      </div>

      {/* Right Side: Resume Display */}
      <div className="w-1/2 bg-white rounded-xl shadow-md p-6 overflow-y-auto">
        {resume ? (
          <div className="space-y-4">
            {/* Name */}
            <h1 className="text-2xl font-bold">{resume.name}</h1>

            {/* Contact */}
            <div className="text-sm text-gray-600 space-y-1">
              {resume.contact?.email && <p>Email: {resume.contact.email}</p>}
              {resume.contact?.phone && <p>Phone: {resume.contact.phone}</p>}
              {resume.contact?.linkedin && (
                <p>LinkedIn: {resume.contact.linkedin}</p>
              )}
              {resume.contact?.github && <p>GitHub: {resume.contact.github}</p>}
            </div>

            {/* Summary */}
            {resume.summary && (
              <div>
                <h2 className="text-lg font-semibold border-b pb-1">Summary</h2>
                <p>{resume.summary}</p>
              </div>
            )}

            {/* Education */}
            {resume.education && (
              <div>
                <h2 className="text-lg font-semibold border-b pb-1">
                  Education
                </h2>
                {resume.education.map((edu: any, idx: number) => (
                  <p key={idx}>
                    <strong>{edu.degree}</strong> –{" "}
                    {typeof edu.institution === "object"
                      ? edu.institution.name
                      : edu.institution}{" "}
                    {edu.year ? `(${edu.year})` : ""}
                  </p>
                ))}
              </div>
            )}

            {/* Experience */}
            {resume.experience && (
              <div>
                <h2 className="text-lg font-semibold border-b pb-1">
                  Experience
                </h2>
                {resume.experience.map((exp: any, idx: number) => (
                  <div key={idx}>
                    <p className="font-semibold">
                      {exp.position} at {exp.company} ({exp.duration})
                    </p>
                    <p className="text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {resume.projects && (
              <div>
                <h2 className="text-lg font-semibold border-b pb-1">
                  Projects
                </h2>
                {resume.projects.map((proj: any, idx: number) => (
                  <div key={idx}>
                    <p className="font-semibold">{proj.title}</p>
                    <p className="text-sm">{proj.description}</p>
                    {proj.techStack && (
                      <p className="text-xs text-gray-500">
                        Tech Stack: {proj.techStack.join(", ")}
                      </p>
                    )}
                    {proj.deployment && (
                      <a
                        href={proj.deployment}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 text-xs underline"
                      >
                        {proj.deployment}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {resume.skills && (
              <div>
                <h2 className="text-lg font-semibold border-b pb-1">Skills</h2>
                <p className="text-sm">
                  <strong>Technical:</strong>{" "}
                  {resume.skills.technical?.join(", ")}
                </p>
                <p className="text-sm">
                  <strong>Soft:</strong> {resume.skills.soft?.join(", ")}
                </p>
              </div>
            )}

            {/* Achievements */}
            {resume.achievements && (
              <div>
                <h2 className="text-lg font-semibold border-b pb-1">
                  Achievements
                </h2>
                <ul className="list-disc list-inside text-sm">
                  {resume.achievements.map((ach: string, idx: number) => (
                    <li key={idx}>{ach}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Certifications */}
            {resume.certifications && (
              <div>
                <h2 className="text-lg font-semibold border-b pb-1">
                  Certifications
                </h2>
                <ul className="list-disc list-inside text-sm">
                  {resume.certifications.map((cert: string, idx: number) => (
                    <li key={idx}>{cert}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Generated resume will appear here.</p>
        )}
      </div>
    </div>
  );
}
