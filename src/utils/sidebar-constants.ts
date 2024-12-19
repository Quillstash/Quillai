import {
    SearchIcon,       // For keyword research or search functionality
    UsersIcon,        // For team collaboration
    HelpCircleIcon,   // For help and support
    MessageSquareIcon,// For feedback
    FileTextIcon,
    Pen,     // For article management
  } from "lucide-react";
  
  export const data = {
    user: {
      name: "Quillstash",
      email: "",
      avatar: "/avatars/admin.jpg", // Path to the admin's avatar image
    },
    navMain: [
      {
        title: "QuillAi",
        url: "/quillai", // Main dashboard link
        icon: Pen, // Dashboard icon
        isActive: true,
      },
      {
        title: "Article Management",
        url: "/ai-articles", // Default view-all link for articles
        icon: FileTextIcon, // Article management icon
        // items: [
        //   {
        //     title: "Create Article",
        //     url: "/articles/create", // Link to create an SEO-optimized article
        //     icon: Edit3Icon, // Icon for creating articles
        //   },
        //   {
        //     title: "View All Articles",
        //     url: "/articles/view-all", // Link to view all user-created articles
        //     icon: FileTextIcon, // Icon for viewing articles
        //   },
        // ],
      },
      {
        title: "Keyword Research",
        url: "/keywords", // Main keyword research link
        icon: SearchIcon, // Icon for keyword research
        // items: [
        //   {
        //     title: "Discover Keywords",
        //     url: "/keywords/discover", // Link to discover new SEO-friendly keywords
        //     icon: SearchIcon, // Icon for discovering keywords
        //   },
        //   {
        //     title: "Manage Keywords",
        //     url: "/keywords/manage", // Link to manage saved keywords
        //     icon: FileTextIcon, // Icon for managing keywords
        //   },
        // ],
      },
      {
        title: "Team Collaboration",
        url: "/team", // Main team collaboration link
        icon: UsersIcon, // Team collaboration icon
        // items: [
        //   {
        //     title: "Invite Team Members",
        //     url: "/team/invite", // Link to invite team members
        //     icon: UsersIcon, // Icon for inviting team members
        //   },
        //   {
        //     title: "Manage Team",
        //     url: "/team/manage", // Link to manage team settings
        //     icon: UsersIcon, // Icon for managing the team
        //   },
        // ],
      },
    ],
   
    navSecondary: [
      {
        title: "Help & Support",
        url: "/support", // Support section link
        icon: HelpCircleIcon, // Support icon
      },
      {
        title: "Feedback",
        url: "/feedback", // Link to submit user feedback
        icon: MessageSquareIcon, // Feedback icon
      },
    ],
  };
  