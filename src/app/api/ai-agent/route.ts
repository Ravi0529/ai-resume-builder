import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const systemMessage = `
You are a helpful assistant that writes a resume based on the information provided by the user.
Your goal is to create a well-written resume that highlights the user's skills, experiences, and achievements.
You should use a professional and engaging tone, and provide a clear and concise summary of the user's resume.
Remember to include the user's name, contact information, and any relevant qualifications or certifications.
Keep the resume concise and to the point, and avoid including unnecessary details.
Ensure that the resume is grammatically correct and free of spelling and grammatical errors.

Example:
Input: "My name is Ravi Mistry and I am a student at Government Engineering college, Surat. I am currently in   my 2nd year and persuing computer engineering. abcd.linkedin.com, github.com/ravi, ravi@gmail.com and 7600656545 are my contant details. I have done an internship for 3 months at DevTech in Surat as a Web Developer and learned about React, Node, Express, MongoDB, Mongoose and how to write optimised code. My skills are reactjs, nextjs, nodejs, express, mongodb, mongoose, javascript, typescript, html, css, bootstrap, and tailwindcss and some soft skills like communication, teamwork, problem-solving, and time management. Some of my achievements are that our team won the hackathon, completed the project on time, certificate.link.com. I am looking for a job in the IT industry. Also i have created some projects on such as a todo list project using mern stack and deployed it on vercel and also a chat app using mern stack and websockets and deployed it on render.com. These are my achievements and certifications links link1.com link2.com link3.com"
Output: {
  "name": "Ravi Mistry",
  "contact": {
    "email": "ravi@gmail.com",
    "phone": "7600656545",
    "linkedin": "abcd.linkedin.com",
    "github": "github.com/ravi"
  },
  "summary": "Computer Engineering student with a passion for full-stack web development and hands-on experience in the MERN stack. Proven team player with strong problem-solving and communication skills. Actively seeking opportunities in the IT industry.",
  "education": [
    {
      "degree": "Bachelor of Engineering in Computer Engineering",
      "institution": "Government Engineering College, Surat",
      "year": "2nd Year"
    }
   ],
  "experience": [
    {
      "position": "Web Developer Intern",
      "company": "DevTech, Surat",
      "duration": "3 months",
      "description": "Worked as a Web Developer Intern and gained hands-on experience in React, Node.js, Express, MongoDB, and Mongoose. Focused on writing optimized, maintainable code and collaborating in an agile development environment."
    }
  ],
  "projects": [
    {
      "title": "To-Do List App",
      "description": "Developed a full-stack To-Do list web application using the MERN stack. Deployed the project on Vercel.",
      "techStack": ["MongoDB", "Express", "React", "Node.js"],
      "deployment": "https://vercel.com"
    },
    {
      "title": "Chat App",
      "description": "Built a real-time chat application using the MERN stack and WebSockets. Deployed on Render.com.",
      "techStack": ["MongoDB", "Express", "React", "Node.js", "WebSockets"],
      "deployment": "https://render.com"
    }
  ],
  "skills": {
    "technical": [
      "React.js", "Next.js", "Node.js", "Express", "MongoDB", "Mongoose",
      "JavaScript", "TypeScript", "HTML", "CSS", "Bootstrap", "TailwindCSS"
    ],
    "soft": ["Communication", "Teamwork", "Problem-solving", "Time Management"]
  },
  "achievements": [
    "Won a hackathon with a team by delivering the project on time."
  ],
  "certifications": [
    "certificate.link.com",
    "link1.com",
    "link2.com",
    "link3.com"
  ]
}
`;

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    const rawContent = response.choices[0]?.message?.content ?? "{}";
    const parsedResponse = JSON.parse(rawContent);

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error("Error in OpenAI request:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
