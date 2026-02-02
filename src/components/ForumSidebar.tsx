import { Users, TrendingUp, MessageCircle, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const ForumSidebar = () => {
  const onlineMembers = [
    "Habanero", "zyoka", "zeldlock", "JustinB", "George", "Argus_prime",
    "artemis02", "cosmomart1", "Moses", "PeterRKD88", "Green", "prakish1",
    "core4t16", "danieldecor123", "gern", "STARTHima", "DoNe", "Nagato"
  ];

  const trendingContent = [
    { title: "Thread 'Bad Matchmaking Thread'", author: "Yoshi", date: "Oct 4, 2024", replies: 2547 },
    { title: "Thread '01-30-2025 Update'", author: "Yoshi", date: "Saturday at 3:57 PM", replies: 845 },
    { title: "Thread '12-29-2025 Update'", author: "Yoshi", date: "Dec 29, 2025", replies: 523 },
  ];

  const latestPosts = [
    { 
      title: "Debug profiles ALL HIS ABILITIES DAMAGE with bomb stacks", 
      author: "odeh_ihalakuk", 
      time: "31 minutes ago",
      category: "Bug Reports",
      isHot: true
    },
    { 
      title: "Visual rework idea for Sinclair's Knife! Hex", 
      author: "Maria CouldBeBetter", 
      time: "8 minutes ago",
      category: "Community Hero Ideas"
    },
    { 
      title: "Owl Wheel Pointer DPI Speed Dipped to Minimum", 
      author: "troubleshoot main", 
      time: "30 minutes ago",
      category: "Bug Reports"
    },
  ];

  const latestResources = [
    { 
      title: "Deadlock Graphical Library", 
      description: "Logos, icons, fonts, skill sprites minimaps and more!",
      author: "Yoshi",
      date: "Nov 25, 2025"
    },
    { 
      title: "Guide to Deadlock exports and content creation", 
      description: "Observing and camera controls in Deadlock",
      author: "SoiMeister",
      date: "Aug 1, 2025"
    },
  ];

  const forumStats = {
    threads: "102,104",
    messages: "185,774",
    members: "287,507",
    latestMember: "123456210999"
  };

  return (
    <div className="space-y-4">
      {/* New Posts Button */}
      <Button className="w-full gap-2 text-sm">
        <span>+</span> New posts
      </Button>

      {/* Members Online */}
      <div className="bg-card rounded border border-border">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <Users className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Members online</h3>
        </div>
        <div className="p-4">
          <div className="flex flex-wrap gap-1 text-xs">
            {onlineMembers.map((member, index) => (
              <span key={member}>
                <a href="#" className="forum-link hover:underline">{member}</a>
                {index < onlineMembers.length - 1 && <span className="text-muted-foreground">, </span>}
              </span>
            ))}
            <span className="text-muted-foreground">...</span>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Total: 6,136 (members: 101, guests: 6,035)
          </p>
        </div>
      </div>

      {/* Trending Content */}
      <div className="bg-card rounded border border-border">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Trending content</h3>
        </div>
        <div className="p-4 space-y-3">
          {trendingContent.map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              <div className="text-xs min-w-0">
                <a href="#" className="forum-link hover:underline line-clamp-2">{item.title}</a>
                <div className="text-muted-foreground mt-0.5">
                  {item.author} · {item.date}
                </div>
                <div className="text-muted-foreground">Replies: {item.replies}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Posts */}
      <div className="bg-card rounded border border-border">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <MessageCircle className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Latest posts</h3>
        </div>
        <div className="p-4 space-y-4">
          {latestPosts.map((post, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${post.isHot ? 'bg-destructive' : 'bg-forum-online'}`} />
              <div className="text-xs min-w-0">
                <a href="#" className="forum-link hover:underline line-clamp-2 font-medium">
                  {post.title}
                </a>
                <div className="text-muted-foreground mt-1">
                  Latest: <span className="forum-link">{post.author}</span> · {post.time}
                </div>
                <div className="text-muted-foreground">{post.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Resources */}
      <div className="bg-card rounded border border-border">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <FileText className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Latest resources</h3>
        </div>
        <div className="p-4 space-y-4">
          {latestResources.map((resource, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-forum-online mt-1.5 flex-shrink-0" />
              <div className="text-xs min-w-0">
                <a href="#" className="forum-link hover:underline font-medium">
                  {resource.title}
                </a>
                <div className="text-muted-foreground mt-0.5">{resource.description}</div>
                <div className="text-muted-foreground mt-1">
                  {resource.author} · {resource.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Profile Posts */}
      <div className="bg-card rounded border border-border">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <User className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Latest profile posts</h3>
        </div>
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded bg-muted flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-xs min-w-0">
              <div className="flex items-center gap-1">
                <span className="online-indicator" />
                <a href="#" className="forum-link hover:underline">imSmallRookMe</a>
                <span className="text-muted-foreground">►</span>
                <a href="#" className="forum-link hover:underline">Humonokull</a>
              </div>
              <p className="text-muted-foreground mt-1 line-clamp-2">
                Hello, joined the deadlock discord server but accidentally left right away 😢 can i rejoin?
              </p>
              <div className="text-muted-foreground mt-1">cleanID</div>
            </div>
          </div>
        </div>
      </div>

      {/* Forum Statistics */}
      <div className="bg-card rounded border border-border">
        <div className="px-4 py-3 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Forum statistics</h3>
        </div>
        <div className="p-4 grid grid-cols-2 gap-2 text-xs">
          <div className="text-muted-foreground">Threads:</div>
          <div className="text-right text-foreground">{forumStats.threads}</div>
          <div className="text-muted-foreground">Messages:</div>
          <div className="text-right text-foreground">{forumStats.messages}</div>
          <div className="text-muted-foreground">Members:</div>
          <div className="text-right text-foreground">{forumStats.members}</div>
          <div className="text-muted-foreground">Latest member:</div>
          <div className="text-right">
            <a href="#" className="forum-link hover:underline">{forumStats.latestMember}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumSidebar;
