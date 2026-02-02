import { useState } from "react";
import ForumHeader from "@/components/ForumHeader";
import ForumCategory from "@/components/ForumCategory";
import ForumSidebar from "@/components/ForumSidebar";
import ForumFooter from "@/components/ForumFooter";
import LoginModal from "@/components/LoginModal";

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const generalItems = [
    {
      id: "1",
      name: "Instructions and Schedule",
      threads: 5,
      messages: 6,
      lastPost: {
        title: "Early Development Build Privacy",
        author: "Yoshi",
        avatar: "",
        time: "Aug 23, 2024"
      }
    },
    {
      id: "2",
      name: "Changelog",
      threads: 57,
      messages: 101,
      lastPost: {
        title: "01-30-2024 Update",
        author: "Yoshi",
        avatar: "",
        time: "Saturday at 3:07 PM"
      }
    },
    {
      id: "3",
      name: "Bug Reports",
      threads: 31400,
      messages: 78000,
      lastPost: {
        title: "Debug profiles ALL HIS ABILITIES S...",
        author: "Habanero",
        avatar: "",
        time: "1 minute ago"
      }
    },
    {
      id: "4",
      name: "Localization Bugs",
      subForums: [{ name: "Sub-forums", href: "#" }],
      threads: 302,
      messages: 1400,
      lastPost: {
        title: "Last spanish dubbing",
        author: "van Treod",
        avatar: "",
        time: "Yesterday at 2:44 AM"
      }
    },
    {
      id: "5",
      name: "Community Clips",
      threads: 918,
      messages: 3300,
      lastPost: {
        title: "Why does the stacks work like this",
        author: "Aylue",
        avatar: "",
        time: "Yesterday at 11:44 PM"
      }
    },
    {
      id: "6",
      name: "Community Hero Ideas",
      threads: 3200,
      messages: 10900,
      lastPost: {
        title: "Visual rework idea for Sinclair's Rob...",
        author: "Maria CouldBeBetter",
        avatar: "",
        time: "8 minutes ago"
      }
    },
    {
      id: "7",
      name: "Community Item Ideas",
      threads: 2100,
      messages: 8600,
      lastPost: {
        title: "Execution, Healthbar Upgrade",
        author: "Phadthai_1001",
        avatar: "",
        time: "Yesterday at 8:45 PM"
      }
    },
  ];

  const gameplayFeedbackItems = [
    {
      id: "8",
      name: "Changelog Feedback",
      isPrivate: true,
    },
    {
      id: "9",
      name: "General Gameplay",
      isPrivate: true,
    },
    {
      id: "10",
      name: "Hero Gameplay",
      subForums: [{ name: "Sub-forums", href: "#" }],
      threads: 0,
      messages: 0,
    },
    {
      id: "11",
      name: "Map Gameplay",
      isPrivate: true,
    },
  ];

  const otherFeedbackItems = [
    {
      id: "12",
      name: "New Client Feature Suggestions",
      isPrivate: true,
    },
    {
      id: "13",
      name: "Art Feedback - General",
      isPrivate: true,
    },
    {
      id: "14",
      name: "Art Feedback - Heroes",
      subForums: [{ name: "Sub-forums", href: "#" }],
      threads: 0,
      messages: 0,
    },
    {
      id: "15",
      name: "Sound Feedback - General",
      isPrivate: true,
    },
    {
      id: "16",
      name: "Sound Feedback - Heroes",
      subForums: [{ name: "Sub-forums", href: "#" }],
      threads: 0,
      messages: 0,
    },
    {
      id: "17",
      name: "UI Feedback",
      isPrivate: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <ForumHeader onLoginClick={() => setIsLoginOpen(true)} />
      
      {/* Page Title */}
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-xl font-semibold text-foreground">Deadlock</h1>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Forum Categories */}
          <div className="flex-1 min-w-0">
            <ForumCategory title="General" items={generalItems} />
            <ForumCategory title="Gameplay Feedback (private)" isPrivate items={gameplayFeedbackItems} />
            <ForumCategory title="Other Feedback (private)" isPrivate items={otherFeedbackItems} />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <ForumSidebar />
          </div>
        </div>
      </div>

      <ForumFooter />

      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default Index;
