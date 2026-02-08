import { Twitter } from "lucide-react";

const ForumFooter = () => {
  return (
    <footer className="bg-card border-t border-border mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Share */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Share this page</span>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="forum-link hover:underline">Terms and rules</a>
            <a href="#" className="forum-link hover:underline">Privacy policy</a>
            <a href="#" className="forum-link hover:underline">Help</a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-4 border-t border-border text-center text-xs text-muted-foreground">
          Community platform by XenForo® © 2010-2024 XenForo Ltd.
        </div>
      </div>
    </footer>
  );
};

export default ForumFooter;
