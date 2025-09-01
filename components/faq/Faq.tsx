
import { parseFAQMarkdown, type FAQItem } from '@/components/faq/faq-parser';

interface FaqProps {
  faqs?: FAQItem[];
}

export default function Faq({ faqs }: FaqProps) {
  // Use provided faqs or parse from markdown file
  const faqItems = faqs || parseFAQMarkdown();

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold element-spacing">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">Find answers to common questions about our directory</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {faqItems.map((faq, index) => (
          <div key={index} className="border border-border rounded-lg p-5">
            <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
            <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}