import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-3 group">
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-primary via-purple-600 to-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
          <Dumbbell className="w-6 h-6 text-white" />
        </div>
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-600 to-secondary bg-clip-text text-transparent leading-tight">
          Aithena
        </span>
        <span className="text-xs text-muted-foreground font-medium -mt-1">
          AI Trainer
        </span>
      </div>
    </Link>
  );
}
