// DURE-BORU Server-side Database Service (Self-contained file-based / in-memory state)
// Provides clean CRUD operations, search, filters, user sessions, activity logging, and AI logs.

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  avatar: string;
  createdAt: string;
  points: number;
}

export interface Resource {
  id: string;
  type: 'product' | 'promotion' | 'template' | 'ebook' | 'website' | 'aitool';
  name: string;
  title?: string; // mapping helper
  description: string;
  category: string;
  price: number;
  isPremium: boolean;
  isFree: boolean;
  downloadUrl?: string;
  imageUrl: string;
  rating: number;
  ratingsCount: number;
  features: string[];
  tags: string[];
  url?: string; // for websites/tools
  author?: string; // for ebooks
  pages?: number; // for ebooks
  code?: string; // for promotions
  discountPercent?: number; // for promotions
  expiresAt?: string; // for promotions
}

export interface Favorite {
  id: string;
  userId: string;
  resourceId: string;
  resourceType: string;
  createdAt: string;
}

export interface Download {
  id: string;
  userId: string;
  resourceId: string;
  resourceType: string;
  downloadedAt: string;
}

export interface Rating {
  id: string;
  userId: string;
  userName: string;
  resourceId: string;
  rating: number;
  review: string;
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
  readTime: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isReplied: boolean;
  replyMessage?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  timestamp: string;
}

export interface AILog {
  id: string;
  userId: string;
  prompt: string;
  response: string;
  type: 'chat' | 'recommend' | 'classify' | 'search';
  timestamp: string;
}

export interface SystemSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  phone: string;
  address: string;
  allowRegistrations: boolean;
  maintenanceMode: boolean;
  featuredDiscount: number;
}

// Memory database storage, persisted per node-process run
class MemoryDatabase {
  users: User[] = [];
  resources: Resource[] = [];
  favorites: Favorite[] = [];
  downloads: Download[] = [];
  ratings: Rating[] = [];
  blogs: Blog[] = [];
  contactMessages: ContactMessage[] = [];
  notifications: Notification[] = [];
  activityLogs: ActivityLog[] = [];
  aiLogs: AILog[] = [];
  settings: SystemSettings = {
    siteName: "DURE-BORU",
    siteDescription: "Modern AI-powered customer service and digital resource platform.",
    contactEmail: "support@dureboru.com",
    phone: "+82 2-1234-5678",
    address: "Seoul, South Korea",
    allowRegistrations: true,
    maintenanceMode: false,
    featuredDiscount: 15
  };

  private initialized = false;

  constructor() {
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    if (this.initialized) return;

    // Default Users & Admin
    this.users = [
      {
        id: "usr_1",
        name: "Demo Customer",
        email: "customer@dureboru.com",
        role: "customer",
        avatar: "https://picsum.photos/seed/customer/200",
        createdAt: "2026-01-15T09:00:00Z",
        points: 250
      },
      {
        id: "usr_admin",
        name: "Admin Manager",
        email: "admin@dureboru.com",
        role: "admin",
        avatar: "https://picsum.photos/seed/admin/200",
        createdAt: "2026-01-01T08:00:00Z",
        points: 9999
      }
    ];

    // Resources
    this.resources = [
      // PROMOTIONAL PRODUCTS
      {
        id: "res_prod_1",
        type: "product",
        name: "Bamboo Minimalist Charging Dock",
        description: "An eco-friendly natural bamboo multi-device charging station. Elegant design with clean cable management channels, perfect for custom corporate logo laser-engraving.",
        category: "Corporate Giftware",
        price: 24.99,
        isPremium: true,
        isFree: false,
        downloadUrl: "#",
        imageUrl: "https://picsum.photos/seed/bamboo/600/400",
        rating: 4.8,
        ratingsCount: 42,
        features: ["100% Sustainable Bamboo", "Integrated Apple Watch & Phone slots", "Non-slip rubber feet", "Custom engraving available"],
        tags: ["Eco-friendly", "Desk Organizer", "Corporate Premium"]
      },
      {
        id: "res_prod_2",
        type: "product",
        name: "Matte Black Smart Hydro-Flask",
        description: "Double-walled vacuum insulated smart bottle with LED temperature indicator touch-screen lid. Features custom thermal brand stamping options.",
        category: "Corporate Giftware",
        price: 34.99,
        isPremium: true,
        isFree: false,
        downloadUrl: "#",
        imageUrl: "https://picsum.photos/seed/flask/600/400",
        rating: 4.9,
        ratingsCount: 56,
        features: ["Premium 304 Stainless Steel", "LCD Temperature Display lid", "12 hours Hot / 24 hours Cold", "Leakproof IPX7 rating"],
        tags: ["Hydration", "Smart Gear", "Best Seller"]
      },
      {
        id: "res_prod_3",
        type: "product",
        name: "Recycled Tech Felt Organizer Sleeve",
        description: "A premium ultra-dense recycled PET felt sleeve for tablets and accessories. Embossed or stitched customized patch options.",
        category: "Corporate Giftware",
        price: 18.50,
        isPremium: false,
        isFree: false,
        downloadUrl: "#",
        imageUrl: "https://picsum.photos/seed/feltsleeve/600/400",
        rating: 4.6,
        ratingsCount: 29,
        features: ["Made from 100% recycled bottles", "Genuine leather toggle details", "Multiple pockets for cables", "Scratch-resistant padding"],
        tags: ["Eco-friendly", "Office Gear", "Budget Premium"]
      },

      // CREATIVE TEMPLATES
      {
        id: "res_temp_1",
        type: "template",
        name: "Modern SaaS Pitch Deck Presentation",
        description: "A professional 30-slide pitch deck template built for startups. Elegant minimalist layouts, fully editable vector assets, custom charts, and financial projection tables.",
        category: "Creative Presentation",
        price: 0,
        isPremium: false,
        isFree: true,
        downloadUrl: "https://example.com/downloads/saas-pitch-deck.zip",
        imageUrl: "https://picsum.photos/seed/presentation/600/400",
        rating: 4.7,
        ratingsCount: 118,
        features: ["30 high-definition 16:9 slides", "Fully editable charts & statistics", "Includes dark & light theme presets", "Free vector icon pack included"],
        tags: ["Pitch Deck", "Startup", "Freebie"]
      },
      {
        id: "res_temp_2",
        type: "template",
        name: "Premium Corporate Branding System",
        description: "A comprehensive brand identity guidelines template. Includes logo spacing rules, color palette systems, typographic pairings, and official corporate letterhead templates.",
        category: "Creative Presentation",
        price: 49.00,
        isPremium: true,
        isFree: false,
        downloadUrl: "https://example.com/downloads/brand-guidelines-pro.zip",
        imageUrl: "https://picsum.photos/seed/branding/600/400",
        rating: 4.9,
        ratingsCount: 37,
        features: ["Adobe Illustrator & Figma source files", "50+ detailed pages", "Print-ready CMYK layouts", "Easy-to-use style guide grid"],
        tags: ["Brand Identity", "Design Assets", "Pro Collection"]
      },

      // WEBSITE TEMPLATES
      {
        id: "res_web_temp_1",
        type: "template",
        name: "SaaS App Dark Launch Theme",
        description: "A responsive Tailwind CSS landing page template designed specifically for modern SaaS products. Gorgeous dark futuristic design, fluid motion animations, and email capture.",
        category: "Website Templates",
        price: 0,
        isPremium: false,
        isFree: true,
        downloadUrl: "https://example.com/downloads/dark-launch-tailwind.zip",
        imageUrl: "https://picsum.photos/seed/webtheme/600/400",
        rating: 4.8,
        ratingsCount: 245,
        features: ["Fully responsive HTML5/Tailwind layout", "Framer Motion animated headers", "Newsletter signup form integration", "Lighthouse 100 performance score"],
        tags: ["Tailwind CSS", "Launch Page", "HTML5"]
      },
      {
        id: "res_web_temp_2",
        type: "template",
        name: "Agile Agency Hub Premium Code",
        description: "A highly sophisticated full-stack React Next.js template for digital creative agencies. Features integrated case studies, animated portfolios, and interactive project planners.",
        category: "Website Templates",
        price: 79.00,
        isPremium: true,
        isFree: false,
        downloadUrl: "https://example.com/downloads/agile-agency-react.zip",
        imageUrl: "https://picsum.photos/seed/agile/600/400",
        rating: 5.0,
        ratingsCount: 19,
        features: ["Built on Next.js 15 App Router", "Tailwind CSS & Shadcn configuration", "CMS integration ready", "SEO meta-tags pre-configured"],
        tags: ["Next.js", "React", "Agency Premium"]
      },

      // E-BOOKS
      {
        id: "res_book_1",
        type: "ebook",
        name: "The AI Customer Service Playbook",
        description: "An educational deep-dive into implementing automation and smart LLMs into modern business support. Covers conversational styling, feedback loops, and customer satisfaction metrics.",
        category: "E-books & Guides",
        price: 0,
        isPremium: false,
        isFree: true,
        downloadUrl: "https://example.com/downloads/ai-customer-service-guide.pdf",
        imageUrl: "https://picsum.photos/seed/book1/600/400",
        rating: 4.6,
        ratingsCount: 130,
        features: ["120 pages of practical insights", "Step-by-step model training guide", "Real-world SaaS case studies", "Formulas for calculating support ROI"],
        tags: ["AI Automation", "Customer Support", "PDF Guide"],
        author: "Dr. Han Boru",
        pages: 120
      },
      {
        id: "res_book_2",
        type: "ebook",
        name: "Scale Your SaaS: The Zero to $1M ARR Handbook",
        description: "A masterclass in digital resource distribution, high-value lead acquisition, and building optimized conversion funnels for digital items.",
        category: "E-books & Guides",
        price: 19.99,
        isPremium: true,
        isFree: false,
        downloadUrl: "https://example.com/downloads/scale-saas-handbook.pdf",
        imageUrl: "https://picsum.photos/seed/book2/600/400",
        rating: 4.9,
        ratingsCount: 88,
        features: ["250-page high-quality PDF & EPUB", "Interviews with 10 successful founders", "Pre-built email campaign scripts", "A/B testing spreadsheet templates"],
        tags: ["Marketing", "SaaS Growth", "Mastery Series"],
        author: "Sarah Dure",
        pages: 254
      },

      // WEBSITES & AI TOOLS
      {
        id: "res_tool_1",
        type: "aitool",
        name: "DureBoru Smart Translator & Tone Adjuster",
        description: "Exquisite real-time customer reply translator. Analyzes client email sentiment, automatically translates across 40 languages, and rewrites responses to match desired professional tone.",
        category: "AI & Business Tools",
        price: 0,
        isPremium: false,
        isFree: true,
        url: "https://ai.studio/build",
        imageUrl: "https://picsum.photos/seed/translator/600/400",
        rating: 4.7,
        ratingsCount: 94,
        features: ["Real-time multi-language AI engine", "Tone modifier (Professional, Apologetic, Direct)", "Integrated spellcheck & styling guidelines", "Easy Chrome extension support"],
        tags: ["AI Assistant", "Translation", "Productivity"]
      },
      {
        id: "res_tool_2",
        type: "aitool",
        name: "Intelligent Customer Sentiment Dashboard Pro",
        description: "A enterprise-grade dashboard analyzing support logs. Maps hourly satisfaction, visualizes key customer concerns, flags urgent escalated tickets, and predicts churn risks.",
        category: "AI & Business Tools",
        price: 15.00,
        isPremium: true,
        isFree: false,
        url: "#",
        imageUrl: "https://picsum.photos/seed/analytics/600/400",
        rating: 4.8,
        ratingsCount: 22,
        features: ["Automatic ticket grouping via NLP", "Real-time alert notifications", "Exportable CSV analytics sheets", "Integrates with major CRMs"],
        tags: ["Analytics", "NLP", "Business Intelligence"]
      },

      // PROMOTIONS
      {
        id: "res_promo_1",
        type: "promotion",
        name: "Special Launch Discount Code - DURELAUNCH",
        description: "Claim 25% discount across all premium resources. Applicable to Branding Systems, Agile Agency Templates, and SaaS Growth books.",
        category: "Promotional Deals",
        price: 0,
        isPremium: false,
        isFree: true,
        imageUrl: "https://picsum.photos/seed/launchpromo/600/400",
        rating: 4.9,
        ratingsCount: 150,
        features: ["Save 25% sitewide", "Valid for all premium template & e-book packs", "One-click copy to clipboard", "No minimum purchase required"],
        tags: ["Discount", "Launch Special", "Limited Time"],
        code: "DURELAUNCH",
        discountPercent: 25,
        expiresAt: "2026-12-31"
      }
    ];

    // Favorites Default
    this.favorites = [
      {
        id: "fav_1",
        userId: "usr_1",
        resourceId: "res_temp_1",
        resourceType: "template",
        createdAt: "2026-06-10T12:00:00Z"
      },
      {
        id: "fav_2",
        userId: "usr_1",
        resourceId: "res_book_1",
        resourceType: "ebook",
        createdAt: "2026-06-12T15:30:00Z"
      }
    ];

    // Downloads Default
    this.downloads = [
      {
        id: "dl_1",
        userId: "usr_1",
        resourceId: "res_temp_1",
        resourceType: "template",
        downloadedAt: "2026-06-10T12:15:00Z"
      }
    ];

    // Reviews/Ratings Default
    this.ratings = [
      {
        id: "rt_1",
        userId: "usr_1",
        userName: "Demo Customer",
        resourceId: "res_temp_1",
        rating: 5,
        review: "This presentation template is absolute gold! Completely accelerated our seed round pitch creation.",
        createdAt: "2026-06-10T14:00:00Z"
      },
      {
        id: "rt_2",
        userId: "usr_1",
        userName: "Demo Customer",
        resourceId: "res_book_1",
        rating: 4,
        review: "Extremely informative book with great, actionable steps for customer service automation.",
        createdAt: "2026-06-12T16:00:00Z"
      }
    ];

    // Blog Default
    this.blogs = [
      {
        id: "blog_1",
        title: "How Generative AI is Revolutionizing Personalized Business Promotions",
        summary: "Discover how deep learning and semantic embeddings are enabling businesses to target individual client needs with custom-crafted promotional resources.",
        content: `Personalization has always been the holy grail of customer relationships. Historically, personalization meant inserting a First Name merge tag into an email. Today, AI has completely rewritten this script.

With advanced Large Language Models, systems can dynamically generate highly custom, tailor-made solutions tailored directly to an individual business's industry, size, and branding guidelines. This level of personalized marketing drives 4x higher retention and substantially greater click-through rates.

In this deep dive, we look at how **DURE-BORU** employs modern model context systems to extract keywords from chat, instantly categorizing user intents, and pairing them with specific creative assets, promotional items, or template setups that accelerate their daily workflows. Let's look at the future of support and digital distribution.`,
        author: "Admin Team",
        imageUrl: "https://picsum.photos/seed/aiblog/800/400",
        tags: ["AI", "SaaS Marketing", "Personalization"],
        createdAt: "2026-07-01T10:00:00Z",
        readTime: "5 min"
      },
      {
        id: "blog_2",
        title: "5 Crucial Digital Templates Every Launching Startup Needs in 2026",
        summary: "From brand standards to clean venture presentations, discover the foundational visual assets that establish corporate credibility.",
        content: `First impressions are incredibly sticky. When introducing a new technology, service, or retail product to the market, visual consistency is paramount to gain consumer trust.

Through extensive reviews of successful Series A startups, we have compiled the five critical assets:
1. **The Investor Pitch Deck**: Keep it high-contrast, visually sparse, and highly analytical.
2. **Brand Guidelines**: Document colors, grid ratios, and spacing constraints to align marketing partners.
3. **Clean Web Presence**: Ensure modern Tailwind styling, excellent responsiveness, and lightning-fast load times.
4. **Interactive Lead Tools**: Give value before you ask for it with free calculators, sheets, or PDF handbooks.
5. **Standard Customer Support playbooks**: Structure how you talk to early adapters to retain loyalty.

Integrating these digital files creates a comprehensive framework for professional scalability.`,
        author: "Sarah Dure",
        imageUrl: "https://picsum.photos/seed/templatesblog/800/400",
        tags: ["Startups", "Templates", "Brand Guidelines"],
        createdAt: "2026-07-05T14:30:00Z",
        readTime: "7 min"
      }
    ];

    // Messages Default
    this.contactMessages = [
      {
        id: "msg_1",
        name: "James Wilson",
        email: "james@agency.io",
        subject: "Customizing Bamboo Docks with Custom Logo",
        message: "Hello! We are interested in ordering 150 Bamboo charging docks with our custom company logo laser-etched. What is the lead time, and do you provide digital mockups beforehand?",
        isReplied: false,
        createdAt: "2026-07-10T11:00:00Z"
      }
    ];

    // Notifications Default
    this.notifications = [
      {
        id: "ntf_1",
        userId: "usr_1",
        title: "Welcome to DURE-BORU AI!",
        message: "Unlock premium e-books, templates, and corporate promotional gear. Try our AI recommendation bot now!",
        isRead: false,
        createdAt: "2026-07-11T10:00:00Z"
      }
    ];

    // Activity Logs Default
    this.activityLogs = [
      {
        id: "act_1",
        userId: "usr_1",
        userName: "Demo Customer",
        action: "Logged into account",
        timestamp: "2026-07-11T12:00:00Z"
      },
      {
        id: "act_2",
        userId: "usr_1",
        userName: "Demo Customer",
        action: "Viewed resource: Modern SaaS Pitch Deck Presentation",
        timestamp: "2026-07-11T12:05:00Z"
      }
    ];

    this.initialized = true;
  }
}

// Global DB instance
const db = new MemoryDatabase();
export { db };
