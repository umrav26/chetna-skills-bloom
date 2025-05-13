import React from 'react';
import { cn } from '@/lib/utils';
interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}
const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  centered = false,
  className
}) => {
  return <div className={cn("mb-8 md:mb-10 lg:mb-12", centered && "text-center", className)}>
      <h2 className="heading-lg mb-3 md:mb-4">{title}</h2>
      {subtitle && <p className="text-lg text-muted-foreground max-w-3xl">
          {subtitle}
        </p>}
    </div>;
};
export default SectionTitle;