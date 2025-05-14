
import { useState } from 'react';
import SectionTitle from '../SectionTitle';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItemProps {
  question: string;
  answer: string;
}

const faqItems: FAQItemProps[] = [
  {
    question: "What types of courses does Chetna Academy offer?",
    answer: "Chetna Academy offers a diverse range of courses across four main categories: Tech Skills (like Full Stack Development, Data Analysis), Creative Skills (such as UI/UX Design, Photography), Business Skills (Excel, Freelancing), and Soft Skills (Communication, Spoken English)."
  },
  {
    question: "How are the courses delivered?",
    answer: "Our courses are delivered through a blend of in-person classes, hands-on workshops, and practical projects. We focus on real-world applications and industry-relevant skills to ensure you're job-ready upon completion."
  },
  {
    question: "What are the different course durations available?",
    answer: "We offer flexible course durations to accommodate different learning paces and depth requirements. Depending on the course, options may include 1.5-month, 3-month, 6-month, and 9-month programs. Longer durations typically include more advanced topics and practical projects."
  },
  {
    question: "Do I receive a certificate after completing a course?",
    answer: "Yes, all students who successfully complete their course requirements receive a Chetna Academy certificate, which they can add to their resume and professional profiles."
  },
  {
    question: "Are there any prerequisites for joining the courses?",
    answer: "Prerequisites vary by course. Basic courses typically require only fundamental computer skills, while more advanced courses may require specific prior knowledge. Each course page details any prerequisites needed."
  },
  {
    question: "What languages are the courses taught in?",
    answer: "We offer courses in multiple languages including English, Hindi, Assamese, and Bodo, depending on the specific course. This information is specified on each course page."
  }
];

const FAQ = () => {
  const [openItem, setOpenItem] = useState<string | undefined>("item-0");

  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="container">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full animate-fade-in">
            FAQ
          </span>
          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our courses, teaching methods, and more."
            centered
          />
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7 lg:col-span-8">
            <div className="space-y-4 animate-fade-in">
              <Accordion 
                type="single" 
                collapsible 
                className="w-full" 
                value={openItem}
                onValueChange={setOpenItem}
              >
                {faqItems.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border border-muted rounded-lg mb-4 overflow-hidden data-[state=open]:shadow-md transition-all duration-200"
                  >
                    <AccordionTrigger className="px-5 py-4 hover:bg-muted/50 hover:no-underline font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4 pt-1">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <div className="md:col-span-5 lg:col-span-4">
            <Card className="p-6 border border-muted bg-gradient-to-br from-primary/5 to-background animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
                <p className="text-muted-foreground">
                  Can't find the answer you're looking for? Please reach out to our support team.
                </p>
              </div>
              <Button asChild className="w-full flex items-center gap-2">
                <Link to="/contact">
                  <MessageSquare className="h-4 w-4" />
                  Contact Us
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
