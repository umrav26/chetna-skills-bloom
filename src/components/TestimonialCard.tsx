
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

export interface TestimonialProps {
  name: string;
  role?: string;
  content: string;
  image?: string;
  rating?: number;
  course?: string;
  location?: string;
  className?: string;
  style?: React.CSSProperties;
}

const TestimonialCard: React.FC<TestimonialProps> = ({
  name,
  role,
  content,
  image,
  rating,
  course,
  location,
  className,
  style
}) => {
  return (
    <Card className={`h-full overflow-hidden ${className || ''}`} style={style}>
      <CardContent className="p-6">
        {rating && (
          <div className="flex mb-4">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} 
              />
            ))}
          </div>
        )}
        
        <blockquote className="text-lg mb-6">"{content}"</blockquote>
        
        <div className="flex items-center">
          <div className="mr-4 flex-shrink-0">
            {image ? (
              <img 
                src={image} 
                alt={name} 
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-lg font-medium">{name.charAt(0)}</span>
              </div>
            )}
          </div>
          
          <div>
            <div className="font-medium">{name}</div>
            {role && <div className="text-muted-foreground text-sm">{role}</div>}
            {(course || location) && (
              <div className="text-muted-foreground text-sm">
                {course && <span>{course}</span>}
                {course && location && <span> • </span>}
                {location && <span>{location}</span>}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
