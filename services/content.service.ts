import matter from 'gray-matter';
import { Service, Course, PMHEvent, BlogPost } from '../types';

export interface CaseStudy {
  id: string;
  client: string;
  title: string;
  metric: string;
  image: string;
}

/* ------------------------------
   VITE BUILD-TIME IMPORTS
-------------------------------- */

const serviceFiles = import.meta.glob('/content/services/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const courseFiles = import.meta.glob('/content/courses/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const eventFiles = import.meta.glob('/content/events/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const blogFiles = import.meta.glob('/content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const caseFiles = import.meta.glob('/content/cases/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

/* ------------------------------
   GENERIC PARSER
-------------------------------- */

function parseCollection<T>(files: Record<string, string>): T[] {
  return Object.entries(files).map(([path, raw]) => {
    const { data, content } = matter(raw);
    const id = path.split('/').pop()?.replace('.md', '') || '';

    return {
      id,
      ...data,
      body: content,
    } as T;
  });
}

/* ------------------------------
   CONTENT SERVICE
-------------------------------- */

class ContentService {
  async getServices(): Promise<Service[]> {
    return parseCollection<Service>(serviceFiles);
  }

  async getCourses(): Promise<Course[]> {
    return parseCollection<Course>(courseFiles);
  }

  async getEvents(): Promise<PMHEvent[]> {
    return parseCollection<PMHEvent>(eventFiles);
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return parseCollection<BlogPost>(blogFiles);
  }

  async getCaseStudies(): Promise<CaseStudy[]> {
    return parseCollection<CaseStudy>(caseFiles);
  }
}

export const contentService = new ContentService();
