import fs from 'fs';
import path from 'path';

export interface FAQItem {
  question: string;
  answer: string;
}

export function parseFAQMarkdown(): FAQItem[] {
  try {
    const faqPath = path.join(process.cwd(), 'lib', 'faq.md');
    const content = fs.readFileSync(faqPath, 'utf8');
    
    // Split content by h2 headers (##)
    const sections = content.split(/^## /m).filter(section => section.trim());
    
    const faqs: FAQItem[] = [];
    
    for (const section of sections) {
      const lines = section.trim().split('\n');
      if (lines.length < 2) continue;
      
      const question = lines[0].trim();
      const answer = lines.slice(1).join('\n').trim();
      
      if (question && answer) {
        faqs.push({ question, answer });
      }
    }
    
    return faqs;
  } catch (error) {
    console.error('Error parsing FAQ markdown:', error);
    return [];
  }
}
