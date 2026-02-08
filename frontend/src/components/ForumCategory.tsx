import { MessageSquare, ChevronDown } from "lucide-react";

interface SubForum {
  name: string;
  href: string;
}

interface ForumItem {
  id: string;
  name: string;
  description?: string;
  subForums?: SubForum[];
  threads?: number;
  messages?: number;
  isPrivate?: boolean;
  lastPost?: {
    title: string;
    author: string;
    avatar: string;
    time: string;
  };
}

interface ForumCategoryProps {
  title: string;
  isPrivate?: boolean;
  items: ForumItem[];
}

const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

const ForumCategory = ({ title, isPrivate, items }: ForumCategoryProps) => {
  return (
    <div className="mb-4">
      {/* Category Header */}
      <div className="forum-category-header">
        <h2 className="text-sm font-semibold text-primary flex items-center gap-2">
          {title}
          {isPrivate && <span className="private-badge">private</span>}
        </h2>
      </div>

      {/* Forum Items */}
      <div className="bg-card">
        {items.map((item) => (
          <div key={item.id} className="forum-row">
            <div className="flex items-start gap-4 px-4 py-3">
              {/* Icon */}
              <div className="mt-1 w-8 h-8 rounded bg-muted flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <a href="#" className="forum-link font-medium text-sm hover:underline">
                    {item.name}
                  </a>
                  {item.isPrivate && <span className="private-badge">Private</span>}
                </div>
                {item.subForums && item.subForums.length > 0 && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <span>Sub-forums:</span>
                    <ChevronDown className="w-3 h-3" />
                  </div>
                )}
              </div>

              {/* Stats */}
              {(item.threads !== undefined || item.messages !== undefined) && (
                <div className="hidden sm:flex items-center gap-6 text-xs">
                  <div className="text-center min-w-[60px]">
                    <div className="text-muted-foreground">Threads</div>
                    <div className="text-foreground font-medium">
                      {item.threads !== undefined ? formatNumber(item.threads) : "-"}
                    </div>
                  </div>
                  <div className="text-center min-w-[60px]">
                    <div className="text-muted-foreground">Messages</div>
                    <div className="text-foreground font-medium">
                      {item.messages !== undefined ? formatNumber(item.messages) : "-"}
                    </div>
                  </div>
                </div>
              )}

              {/* Private indicator for items without stats */}
              {item.isPrivate && item.threads === undefined && (
                <div className="hidden sm:block">
                  <span className="private-badge">Private</span>
                </div>
              )}

              {/* None indicator */}
              {!item.isPrivate && item.threads === 0 && item.messages === 0 && (
                <div className="hidden sm:block text-xs text-muted-foreground">
                  None
                </div>
              )}

              {/* Last Post */}
              {item.lastPost && (
                <div className="hidden lg:flex items-center gap-3 min-w-[200px]">
                  <div className="w-8 h-8 rounded bg-muted overflow-hidden flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30" />
                  </div>
                  <div className="text-xs min-w-0">
                    <a href="#" className="forum-link line-clamp-1 hover:underline">
                      {item.lastPost.title}
                    </a>
                    <div className="text-muted-foreground">
                      {item.lastPost.time} · <span className="forum-link">{item.lastPost.author}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumCategory;
