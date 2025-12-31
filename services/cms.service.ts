
import { CMSPage, Course, PMHEvent, GlobalConfig } from '../types';

/**
 * CMS Service Abstraction
 * In a production environment, you would replace the mock data 
 * with actual fetch() calls to your Headless CMS endpoint.
 */
class CMSService {
  private useMock = true; // Toggle for development

  private async fetchAPI<T>(endpoint: string): Promise<T> {
    // In production, use your actual CMS URL and API Key
    // const response = await fetch(`${process.env.CMS_URL}${endpoint}`, {
    //   headers: { Authorization: `Bearer ${process.env.CMS_TOKEN}` }
    // });
    // return response.json();

    // Simulating API Latency
    await new Promise(resolve => setTimeout(resolve, 300));

    // Simple Mock Routing
    if (endpoint.includes('/pages/home')) return this.getMockHome() as any;
    if (endpoint.includes('/courses')) return this.getMockCourses() as any;
    if (endpoint.includes('/events')) return this.getMockEvents() as any;
    if (endpoint.includes('/config')) return this.getMockGlobalConfig() as any;

    throw new Error(`Endpoint ${endpoint} not found in CMS.`);
  }

  async getPage(slug: string): Promise<CMSPage> {
    return this.fetchAPI<CMSPage>(`/pages/${slug}`);
  }

  async getCourses(): Promise<Course[]> {
    return this.fetchAPI<Course[]>('/courses');
  }

  async getEvents(): Promise<PMHEvent[]> {
    return this.fetchAPI<PMHEvent[]>('/events');
  }

  async getGlobalConfig(): Promise<GlobalConfig> {
    return this.fetchAPI<GlobalConfig>('/config');
  }

  // --- MOCK DATA GENERATORS ---
  // In a real scenario, this data lives in Contentful/Sanity/Strapi
  
  private getMockGlobalConfig(): GlobalConfig {
    return {
      siteName: "Punchline Marketing Hub",
      logoUrl: "", 
      contact: {
        email: "hello@punchlinehub.com",
        phone: "+234 800 PUNCHLINE",
        address: "Victoria Island, Lagos, Nigeria"
      },
      socials: [
        { platform: "linkedin", url: "#" },
        { platform: "twitter", url: "#" },
        { platform: "instagram", url: "#" }
      ]
    };
  }

  private getMockHome(): CMSPage {
    return {
      title: "Home",
      slug: "home",
      metadata: {
        title: "Punchline Marketing Hub | Marketing Excellence",
        description: "Nigeria's elite marketing consultancy and education hub."
      },
      sections: [
        {
          id: "hero-1",
          type: "hero",
          heading: "Empowering African Marketing Excellence",
          subheading: "Nigeria's Elite Marketing Hub",
          description: "Transformative training, strategic consultancy, and data-driven market research designed for the unique Nigerian business landscape.",
          image: "https://picsum.photos/seed/marketing/800/1000",
          buttons: [
            { label: "Get a Free Audit", link: "/contact", variant: "primary" },
            { label: "Our Solutions", link: "/services", variant: "outline" }
          ]
        },
        {
          id: "features-1",
          type: "features",
          heading: "Expert Solutions for Your Growth",
          description: "From strategic blueprints to ground-level execution, we offer end-to-end marketing support.",
          items: [
            { id: "f1", title: "Strategic Consultancy", icon: "Target", desc: "Bespoke marketing strategies that bridge global best practices with Nigerian nuances." },
            { id: "f2", title: "Transformative Training", icon: "Users", desc: "Empowering your teams with practical, expert-led skills for the modern era." },
            { id: "f3", title: "Data-Driven Research", icon: "Search", desc: "Uncovering actionable insights through deep-dive consumer behavior analysis." }
          ]
        },
        {
          id: "cta-1",
          type: "cta",
          heading: "Ready to Punch Through the Noise?",
          description: "Book your strategic marketing audit today and discover your brand's true potential.",
          buttons: [{ label: "Get My Free Audit", link: "/contact", variant: "primary" }]
        }
      ]
    };
  }

  private getMockCourses(): Course[] {
    return [
      { id: "c1", title: "Sales Mastery Accelerator", description: "Advanced techniques to close high-ticket deals in the Nigerian market.", duration: "6 Weeks", price: 15000, type: "paid", category: "Sales", image: "https://picsum.photos/seed/course1/800/600" },
      { id: "c2", title: "Foundations of Growth Marketing", description: "Understand the basics of data-driven marketing for early startups.", duration: "Self-paced", price: 0, type: "free", category: "Marketing", image: "https://picsum.photos/seed/course2/800/600" },
      { id: "c3", title: "Strategic Leadership", description: "Build high-performance teams and navigate business complexity.", duration: "4 Weeks", price: 20000, type: "paid", category: "Leadership", image: "https://picsum.photos/seed/course3/800/600" },
      { id: "c4", title: "Customer Experience Protocol", description: "The blueprint for world-class service that builds loyal fans.", duration: "3 Weeks", price: 12500, type: "paid", category: "Support", image: "https://picsum.photos/seed/course4/800/600" },
    ];
  }

  private getMockEvents(): PMHEvent[] {
    return [
      { id: "e1", title: "Q4 Sales Strategy Intensive", date: "Oct 15, 2023", location: "Lagos", type: "Physical Masterclass", category: "masterclass" },
      { id: "e2", title: "Consumer Psychology Workshop", date: "Sep 28, 2023", location: "Hybrid", type: "Workshop", category: "masterclass" },
      { id: "e3", title: "Corporate Sales Bootcamp", date: "Aug 10, 2023", location: "Abuja", type: "Program", category: "corporate" },
    ];
  }
}

export const cms = new CMSService();
