
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Award, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export interface CourseProps {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: string;
  languages: string[];
  skills: string[];
  image?: string;
  fee?: string;
}

const CourseCard: React.FC<CourseProps> = ({
  id,
  title,
  category,
  duration,
  level,
  languages,
  skills,
  image,
  fee
}) => {
  return (
    <Card className="overflow-hidden card-hover h-full flex flex-col">
      <div className="aspect-video w-full overflow-hidden bg-muted">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-r 
            ${category === 'Tech' ? 'from-blue-100 to-blue-200' : 
              category === 'Soft Skills' ? 'from-green-100 to-green-200' : 
              'from-yellow-100 to-yellow-200'}`}
          >
            <span className="text-2xl font-medium opacity-50">{title.charAt(0)}</span>
          </div>
        )}
      </div>
      
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className={`
            ${category === 'Tech' ? 'bg-blue-50 text-blue-600 border-blue-200' : 
              category === 'Soft Skills' ? 'bg-green-50 text-green-600 border-green-200' : 
              'bg-yellow-50 text-yellow-600 border-yellow-200'}
          `}>
            {category}
          </Badge>
          {fee && <span className="text-sm font-medium">₹{fee}</span>}
        </div>
        
        <h3 className="heading-sm mb-2">{title}</h3>
        
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <Clock className="h-4 w-4 mr-1" />
          <span>{duration}</span>
          <span className="mx-2">•</span>
          <Award className="h-4 w-4 mr-1" />
          <span>{level}</span>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-1">Key skills:</h4>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1">Available in:</h4>
          <div className="flex gap-1">
            {languages.map((language, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {language}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link to={`/courses/${id}`}>
            View Details
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
