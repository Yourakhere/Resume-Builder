import TEMPLATE_ONE_IMG from '../assets/template-one.png';
import TEMPLATE_TWO_IMG from '../assets/template-two.png';
import TEMPLATE_THREE_IMG from '../assets/template-three.png';
export const resumeTemplates = [
    {
    id: '01',
    thumbnailImg: TEMPLATE_TWO_IMG,
    colorPaletteCode: 'themeOne'
  },
  {
    id: '02',
    thumbnailImg: TEMPLATE_THREE_IMG,
    colorPaletteCode: 'themeOne'
  }
];

export const themeColorPalette = {
  themeOne: [
    ['#EBFDFF', '#A1F4FD', '#CEFAFE', '#00B8DB', '#4A5565'],
    ['#F3FBFF', '#E4FBFF', '#93E2DA', '#2AC9AB', '#304C5A'],
    ['#F5F7FF', '#D6EDFF', '#9CD2F4', '#3889DD', '#3B445C'],
    ['#FFF9F7', '#FFE6DE', '#F9C8B4', '#EF9370', '#5C4A4A'],
    ['#FFF5FF', '#F4E4F6', '#DFB6E0', '#C782CB', '#4E3358'],
    ['#FFF5F5', '#FEE7E7', '#FECBCB', '#F77979', '#3D1A1A'],
    ['#F5FFF7', '#E1F4E2', '#BDE5C0', '#5CC97B', '#2A3D2E'],
    ['#F3F9F9', '#D5F0F0', '#A0E1E1', '#00B7B7', '#204747'],
    ['#FFF9F5', '#FFE9D9', '#F9C8A9', '#E77926', '#3A2F22'],
    ['#FFF7F7', '#EEDFE1', '#E0B5BC', '#C56F7A', '#423437'],
    ['#FFF7FF', '#F3EDF9', '#D9C9EF', '#9C82DD', '#352D4A'],
    ['#FFF7F7', '#F0E4E4', '#CFC2C2', '#A48484', '#333333'],
    ['#F7F7F7', '#E4E4E4', '#CFCFCF', '#999999', '#222222'],
    ['#F7F7FF', '#E9E4F9', '#CFCBFF', '#8D82F4', '#2A2471'],
    ['#F5F7FF', '#90CAF9', '#8D82F4', '#01BEB5', '#00427A']
  ]
};

export const DUMMY_RESUME_DATA = {
  profileInfo: {
    fullName: "Your Name",
    designation: "Full Stack Developer",
    summary: "Passionate software developer with 4+ years of experience building web applications using modern technologies like React, Node.js, and MongoDB."
  },
  thumbnailLink: "http://localhost:8000/uploads/1753178075176-template-one.png",
  contactInfo: {
    phone: "+91-9876543210",
    email: "demo@example.com",
    location: "Bangalore, India",
    linkedin: "https://linkedin.com/in/demo",
    github: "https://github.com/demo",
    website: "https://demo.vercel.app"
  },
  _id: "6878d407c4f726e298c9d4e3",
  userId: "6877762e7da5a9498611ff7e",
  title: "Software Developer Resume",
  colorPalette: ["#1f2937", "#facc15", "#f3f4f6"],
  workExperience: [
    {
      company: "TechNova Solutions",
      role: "Software Engineer",
      startDate: "2021-06",
      endDate: "2024-07",
      description: "Developed scalable RESTful APIs, integrated third-party services, and collaborated with cross-functional teams to enhance application performance.",
      _id: "6878d407c4f726e298c9d4e4"
    }
  ],
  education: [
    {
      institution: "National Institute of Technology, Trichy",
      degree: "B.Tech in Computer Science",
      startDate: "2016-08",
      endDate: "2020-05",
      _id: "6878d407c4f726e298c9d4e5"
    }
  ],
  skills: [
    {
      name: "JavaScript",
      progress: 90,
      _id: "6878d407c4f726e298c9d4e6"
    }
  ],
  projects: [
    {
      title: "TaskMate - Task Management App",
      description: "A full-stack task management app built with MERN stack allowing users to create, assign, and track tasks with real-time updates.",
      github: "https://github.com/abhishek/taskmate",
      liveDemo: "https://taskmate.live",
      _id: "6878d407c4f726e298c9d4e7"
    }
  ],
  certifications: [
    {
      title: "Full Stack Web Development",
      issuer: "Coursera",
      year: "2023",
      _id: "6878d407c4f726e298c9d4e8"
    }
  ],
  languages: [
    {
      name: "English",
      progress: 95,
      _id: "6878d407c4f726e298c9d4e9"
    }
  ],
  interests: ["Open Source", "UI/UX Design", "Chess"],
  createdAt: "2025-07-17T10:44:23.110Z",
  updatedAt: "2025-07-17T10:44:23.110Z",
  __v: 0
};
