import { cn } from "@/lib/utils";

interface GoldDividerProps {
  className?: string;
}

const GoldDivider = ({ className }: GoldDividerProps) => {
  return (
    <div className={cn("w-full py-8 md:py-12", className)}>
      <div className="gold-divider animate-line-reveal" />
    </div>
  );
};

export default GoldDivider;
