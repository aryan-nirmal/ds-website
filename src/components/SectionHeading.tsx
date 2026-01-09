import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

const SectionHeading = ({ title, subtitle, className, align = "center" }: SectionHeadingProps) => {
  return (
    <div className={cn(
      "mb-10 md:mb-14",
      align === "center" && "text-center",
      className
    )}>
      <h2 className="heading-section text-foreground mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={cn(
        "w-20 h-1 bg-accent mt-4",
        align === "center" && "mx-auto"
      )} />
    </div>
  );
};

export default SectionHeading;
