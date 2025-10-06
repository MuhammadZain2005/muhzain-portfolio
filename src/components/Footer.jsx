import { ArrowUp, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-6 px-4 bg-card relative border-t border-border mt-12 flex flex-col items-center justify-center gap-4">
      <p className="text-sm text-muted-foreground flex items-center gap-2">
        Muhzain.me. Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> 
      </p>
      <a
        href="#hero"
        className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};
