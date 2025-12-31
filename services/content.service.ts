
import { Service, Course, PMHEvent, BlogPost } from '../types';

export interface CaseStudy {
  id: string;
  client: string;
  title: string;
  metric: string;
  image: string;
}

class ContentService {
  /**
   * Defensive Markdown Parser
   * Extracts frontmatter and body with safety checks for Netlify CMS fields.
   */
  private parseMarkdown(md: string, id: string): any {
    const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
    const match = md.match(frontmatterRegex);
    const data: any = { id, body: '' };

    if (match) {
      const yaml = match[1];
      yaml.split('\n').forEach(line => {
        const separatorIndex = line.indexOf(':');
        if (separatorIndex !== -1) {
          const key = line.slice(0, separatorIndex).trim();
          let value = line.slice(separatorIndex + 1).trim();
          
          // Basic clean up of quotes
          value = value.replace(/^["'](.*)["']$/, '$1');
          
          // Type coercion
          if (value === 'true') data[key] = true;
          else if (value === 'false') data[key] = false;
          else if (!isNaN(value as any) && value !== '') data[key] = Number(value);
          else data[key] = value;
        }
      });
      data.body = md.replace(frontmatterRegex, '').trim();
    }
    return data;
  }

  private async fetchCollection<T>(folder: string, files: string[]): Promise<T[]> {
    try {
      const results = await Promise.all(
        files.map(async (file) => {
          // Normalizing to lowercase for Linux-based Netlify environments
          const path = `/content/${folder.toLowerCase()}/${file.toLowerCase()}.md`;
          const response = await fetch(path);
          if (!response.ok) return null;
          const text = await response.text();
          return this.parseMarkdown(text, file) as T;
        })
      );
      return results.filter(item => item !== null) as T[];
    } catch (e) {
      console.error(`Build-time fetch failed for collection: ${folder}`, e);
      return [];
    }
  }

  async getServices(): Promise<Service[]> {
    return this.fetchCollection<Service>('services', ['consultancy', 'training', 'research']);
  }

  async getCourses(): Promise<Course[]> {
    return this.fetchCollection<Course>('courses', ['sales-mastery', 'growth-marketing', 'leadership-exec', 'cx-protocol']);
  }

  async getEvents(): Promise<PMHEvent[]> {
    return this.fetchCollection<PMHEvent>('events', ['q4-intensive', 'consumer-psychology', 'high-ticket-closing']);
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return this.fetchCollection<BlogPost>('blog', ['lagos-consumer-landscape', 'sales-techniques-nigeria', 'digital-ads-lagos']);
  }

  async getCaseStudies(): Promise<CaseStudy[]> {
    return this.fetchCollection<CaseStudy>('cases', ['heritage-foods', 'swiftpay-africa', 'zest-beverages']);
  }
}

export const contentService = new ContentService();
