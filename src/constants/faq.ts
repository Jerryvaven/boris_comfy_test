import {
  FaRobot,
  FaPalette,
  FaTheaterMasks,
  FaDollarSign,
  FaStar,
  FaCoins,
  FaUsers,
  FaFileExport,
} from "react-icons/fa";

export const FAQ_DATA = [
  {
    question: "How does AI comic creation work?",
    answer:
      "Our AI analyzes your script and character descriptions to generate professional-quality comic panels. You write the story in a screenplay format, and our AI handles the visual storytelling, creating consistent characters and dynamic scenes.",
    Icon: FaRobot,
    category: "AI Technology",
  },
  {
    question: "Do I need drawing skills to create comics?",
    answer:
      "Not at all! That's the beauty of Inktron Comics. You just need to be able to tell a story. Our AI handles all the visual aspects, from character design to panel composition.",
    Icon: FaPalette,
    category: "Getting Started",
  },
  {
    question: "How many art styles are available?",
    answer:
      "We offer 18 unique art styles ranging from Sunday Morning cartoons to photorealistic renders. Free users have access to 8 styles, while Pro subscribers get access to all 18 styles.",
    Icon: FaTheaterMasks,
    category: "Features",
  },
  {
    question: "Can I sell my comics?",
    answer:
      "Yes! You retain full ownership of your creations and can sell them through our marketplace or export them for external distribution.",
    Icon: FaDollarSign,
    category: "Monetization",
  },
  {
    question: "What's the difference between free and Pro accounts?",
    answer:
      "Free accounts include 100 monthly credits, access to 8 art styles, and basic features. Pro accounts offer unlimited credits, all 18 art styles, priority processing, and advanced editing tools.",
    Icon: FaStar,
    category: "Pricing",
  },
  {
    question: "How does the credit system work?",
    answer:
      "Credits are used for AI generation tasks like creating character images and illustrating panels. Free users get 100 credits monthly, which is enough for about 2-3 complete comics.",
    Icon: FaCoins,
    category: "Pricing",
  },
  {
    question: "Can I collaborate with other creators?",
    answer:
      "Yes! Pro accounts include collaboration features that let you share projects and work together with other creators in real-time.",
    Icon: FaUsers,
    category: "Features",
  },
  {
    question: "What formats can I export my comics in?",
    answer:
      "You can export your comics as high-resolution PDFs, individual PNG images, or print-ready files. Pro users also get access to web-optimized formats for online publishing.",
    Icon: FaFileExport,
    category: "Export",
  },
];

export const FAQ_CATEGORIES = [
  "All",
  "Getting Started",
  "AI Technology",
  "Features",
  "Pricing",
  "Monetization",
  "Export",
];
