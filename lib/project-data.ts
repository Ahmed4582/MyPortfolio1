export interface ProjectLink {
  name: string;
  url: string;
}

export interface Project {
  title: string;
  description: string;
  highlights: string[];
  technologies: string[];
  link?: ProjectLink[];
  image: string;
  category: 'dashboard' | 'ecommerce' | 'portfolio' | 'landing' | 'webapp' | 'mobile';
  featured?: boolean;
  year: number;
  duration: string;
  complexity: 'beginner' | 'intermediate' | 'advanced';
}

export function createProjectsData(language: string): Project[] {
  return [
  {
    title: "One-Door",
    description: language === 'ar' 
      ? "موقع تعريفي لشركة رائدة في مجال التكنولوجيا والذكاء الاصطناعي. يحتوي على مشاريعهم وكيفية التواصل معهم."
      : "An introductory website for a leading company in technology and artificial intelligence. Contains their projects and contact information.",
    highlights: language === 'ar' 
      ? [
          "تصميم عصري ومتجاوب مع جميع الأجهزة",
          "واجهة مستخدم سهلة وبسيطة",
          "أداء عالي وسرعة تحميل ممتازة",
        ]
      : [
          "Modern and responsive design for all devices",
          "Simple and easy user interface",
          "High performance and excellent loading speed",
        ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "FramerMotion"],
    link: [
      {
        name: "View Project",
        url: "https://www.intishaarllc.com",
      },
    ],
    image: "/assets/onedoor.png",
    category: 'portfolio',
    featured: true,
    year: 2024,
    duration: language === 'ar' ? '3 أشهر' : '3 months',
    complexity: 'intermediate'
  },
  {
    title: "LMS Platform",
    description: language === 'ar' 
      ? "منصة تعليمية متطورة مثل يوديمي وكورسيرا لإدارة الكورسات والتعلم الإلكتروني مع نظام شامل للطلاب والمدرسين."
      : "Advanced learning management system like Udemy and Coursera for course management and e-learning with comprehensive system for students and instructors.",
    highlights: language === 'ar' 
      ? [
          "نظام إدارة كورسات متكامل",
          "لوحة تحكم للطلاب والمدرسين",
          "نظام دفع آمن ومتابعة التقدم",
        ]
      : [
          "Comprehensive course management system",
          "Dashboard for students and instructors",
          "Secure payment system and progress tracking",
        ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "FramerMotion"],
    image: "/assets/emadra.png",
    category: 'webapp',
    featured: true,
    year: 2024,
    duration: language === 'ar' ? '6 أشهر' : '6 months',
    complexity: 'advanced'
  },
  {
    title: language === 'ar' ? "راواسي كريستال" : "Rawasi Kristal",
    description: language === 'ar'
      ? "موقع متخصص في التصميم الداخلي والديكورات يعمل بتقنيات حديثة ويقدم خدمات احترافية في مجال التصميم الداخلي والتشطيبات. موقع احترافي يقدم حلول تصميم داخلي متكاملة مع تركيز على تجربة المستخدم والتصميم العصري."
      : "A specialized interior design and decoration website built with modern technologies, offering professional services in interior design and finishing. A professional website that provides comprehensive interior design solutions with a focus on user experience and modern design.",
    highlights: language === 'ar'
      ? [
          "تصميم عصري مع واجهة مستخدم احترافية وجذابة",
          "دعم متعدد اللغات مع العربية والإنجليزية",
          "SEO محسن مع معدل 100/100 في Lighthouse SEO",
          "نظام مدونات متكامل وعرض المشاريع السابقة",
          "تصميم متجاوب يعمل على جميع الأجهزة",
        ]
      : [
          "Modern design with professional and attractive user interface",
          "Multi-language support with Arabic and English",
          "Optimized SEO with 100/100 Lighthouse SEO score",
          "Integrated blog system and previous projects showcase",
          "Responsive design that works on all devices",
        ],
    technologies: ["React.js", "TypeScript", "Bootstrap CSS", "SCSS", "i18next"],
    link: [
      {
        name: language === 'ar' ? "زيارة الموقع" : "Visit Website",
        url: "https://rawasicrystal.com",
      },
    ],
    image: "/assets/rawasi-kristal.png",
    category: 'landing',
    featured: true,
    year: 2024,
    duration: language === 'ar' ? '3 أشهر' : '3 months',
    complexity: 'advanced'
  },
  {
    title: "TravelBank",
    description: language === 'ar'
      ? "تطبيق لإدارة وحجز الرحلات بواجهة حديثة وسهلة الاستخدام."
      : "A travel booking and management web app with a modern, easy UI.",
    highlights: language === 'ar'
      ? [
          "بحث ذكي عن الرحلات",
          "حجز سريع وتتبع فوري",
          "تجربة مستخدم سلسة",
        ]
      : [
          "Smart trip search",
          "Fast booking with live tracking",
          "Smooth user experience",
        ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "FramerMotion"],
    link: [
      {
        name: "View Project",
        url: "https://travel-bank.vercel.app/",
      },
    ],
    image: "/assets/travelbank.png",
    category: 'webapp',
    featured: false,
    year: 2023,
    duration: language === 'ar' ? 'شهر' : '1 month',
    complexity: 'intermediate'
  },
  {
    title: "Best Food",
    description: language === 'ar'
      ? "منصة طلب طعام مع عروض وقوائم تفاعلية."
      : "Food ordering platform with interactive menus and deals.",
    highlights: language === 'ar'
      ? [
          "قوائم تفاعلية",
          "دفع آمن",
          "تتبع الطلب",
        ]
      : [
          "Interactive menus",
          "Secure checkout",
          "Order tracking",
        ],
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    link: [
      {
        name: "View Project",
        url: "https://best-food-app.vercel.app/",
      },
    ],
    image: "/assets/best-food.png",
    category: 'ecommerce',
    featured: false,
    year: 2023,
    duration: language === 'ar' ? '6 أسابيع' : '6 weeks',
    complexity: 'intermediate'
  },
  {
    title: "Media Saudi",
    description: language === 'ar'
      ? "موقع تعريفي احترافي لشركة إعلامية سعودية."
      : "A professional company profile website for a media brand.",
    highlights: language === 'ar'
      ? [
          "تصميم احترافي",
          "تحسينات SEO",
          "دعم الوضع الداكن",
        ]
      : [
          "Professional design",
          "SEO optimizations",
          "Dark mode support",
        ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: [
      {
        name: "View Project",
        url: "https://sauida-media.vercel.app/",
      },
    ],
    image: "/assets/media-saudi.png",
    category: 'portfolio',
    featured: false,
    year: 2024,
    duration: language === 'ar' ? 'شهرين' : '2 months',
    complexity: 'beginner'
  },
  {
    title: "Akar Real Estate",
    description: language === 'ar'
      ? "موقع خاص بشركة عقارات مع عرض شامل للخدمات والمشاريع."
      : "A specialized real estate company website with comprehensive services and projects showcase.",
    highlights: language === 'ar'
      ? [
          "عرض المشاريع العقارية",
          "بحث متقدم عن العقارات",
          "واجهة تفاعلية للعملاء",
        ]
      : [
          "Real estate projects showcase",
          "Advanced property search",
          "Interactive client interface",
        ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    link: [
      {
        name: "View Project",
        url: "https://akar-24.vercel.app/",
      },
    ],
    image: "/assets/akar.png",
    category: 'portfolio',
    featured: false,
    year: 2024,
    duration: language === 'ar' ? 'شهرين' : '2 months',
    complexity: 'beginner'
  },
  {
    title: "Meet AI",
    description: language === 'ar'
      ? "تطبيق اجتماعات ذكي بميزات مدعومة بالذكاء الاصطناعي."
      : "Smart meeting app with AI-powered features.",
    highlights: language === 'ar'
      ? [
          "توليد ملاحظات تلقائي",
          "تسجيل الجلسات",
          "مزامنة عبر السحابة",
        ]
      : [
          "Auto-generated notes",
          "Session recording",
          "Cloud sync",
        ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI"],
    image: "/assets/meet-ai.png",
    category: 'webapp',
    featured: true,
    year: 2024,
    duration: language === 'ar' ? 'شهرين' : '2 months',
    complexity: 'advanced'
  },
  {
    title: "Dashboard Template",
    description: language === 'ar'
      ? "قالب لوحة تحكم مرن مع مكونات جاهزة."
      : "Flexible dashboard template with ready components.",
    highlights: language === 'ar'
      ? [
          "مخططات ورسوم",
          "جداول متقدمة",
          "إدارة حالات",
        ]
      : [
          "Charts and graphs",
          "Advanced tables",
          "State management",
        ],
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    link: [
      {
        name: "View Project",
        url: "https://dashboard-template-one.vercel.app/",
      },
    ],
    image: "/assets/DashBooard-Template.png",
    category: 'dashboard',
    featured: false,
    year: 2023,
    duration: language === 'ar' ? '4 أسابيع' : '4 weeks',
    complexity: 'intermediate'
  },
  {
    title: "CRUD App",
    description: language === 'ar'
      ? "تطبيق CRUD بسيط للتدريب مع واجهة أنيقة."
      : "Simple training CRUD app with a clean UI.",
    highlights: language === 'ar'
      ? [
          "عمليات إنشاء وتعديل ومسح",
          "تحقق من المدخلات",
          "تصميم متجاوب",
        ]
      : [
          "Create, update, delete",
          "Input validation",
          "Responsive design",
        ],
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    link: [
      {
        name: "View Project",
        url: "https://crud-applcation.vercel.app/",
      },
    ],
    image: "/assets/CRUD-APP.png",
    category: 'webapp',
    featured: false,
    year: 2023,
    duration: language === 'ar' ? 'أسبوعين' : '2 weeks',
    complexity: 'beginner'
  },
  {
    title: "DoOOS",
    description: language === 'ar'
      ? "منصة ويب تفاعلية لإدارة المحتوى والمستخدمين."
      : "Interactive web platform for content and user management.",
    highlights: language === 'ar'
      ? [
          "دور وصلاحيات",
          "بحث سريع",
          "إشعارات فورية",
        ]
      : [
          "Roles and permissions",
          "Fast search",
          "Real-time notifications",
        ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/assets/Dooos.png",
    category: 'webapp',
    featured: false,
    year: 2023,
    duration: language === 'ar' ? '6 أسابيع' : '6 weeks',
    complexity: 'intermediate'
  },
  {
    title: "Stellar Glaze",
    description: language === 'ar'
      ? "صفحة هبوط إبداعية لمنتج رقمي."
      : "Creative landing page for a digital product.",
    highlights: language === 'ar'
      ? [
          "حركات سلسة",
          "محتوى تفاعلي",
          "تحويلات عالية",
        ]
      : [
          "Smooth animations",
          "Interactive content",
          "High conversions",
        ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "FramerMotion"],
    link: [
      {
        name: "View Project",
        url: "https://stellar-glaze.com",
      },
    ],
    image: "/assets/stellar.png",
    category: 'landing',
    featured: true,
    year: 2023,
    duration: language === 'ar' ? '4 أسابيع' : '4 weeks',
    complexity: 'intermediate'
  },
  {
    title: "ElFahd",
    description: language === 'ar'
      ? "منصة تجارة إلكترونية متكاملة مع نظام إدارة متقدم للمخزون والمبيعات والطلبات."
      : "An integrated e-commerce platform with advanced inventory, sales, and order management system.",
    highlights: language === 'ar'
      ? [
          "نظام تجارة إلكترونية كامل مع سلة مشتريات",
          "لوحة تحكم متقدمة للمديرين",
          "نظام مصادقة آمن ومتعدد المستخدمين",
        ]
      : [
          "Complete e-commerce system with shopping cart",
          "Advanced admin dashboard",
          "Secure authentication system for multiple users",
        ],
    technologies: ["React.js", "JavaScript", "Tailwind CSS", "FramerMotion", "Node.js"],
    link: [
      {
        name: "View Project",
        url: "https://elfahdapp.vercel.app/",
      },
    ],
    image: "/assets/elfahd.png",
    category: 'portfolio',
    featured: true,
    year: 2024,
    duration: language === 'ar' ? '4 أشهر' : '4 months',
    complexity: 'intermediate'
  },
  {
    title: "TO DO App",
    description: language === 'ar'
      ? "تطبيق إدارة المهام والمسؤوليات مع دعم التعاون الجماعي وإدارة الأدوار المختلفة."
      : "A task and responsibility management application with support for team collaboration and role management.",
    highlights: language === 'ar'
      ? [
          "تتبع المهام في الوقت الفعلي",
          "واجهة مستخدم متجاوبة وبديهية",
          "إدارة ديناميكية للمهام مع خاصية السحب والإفلات",
        ]
      : [
          "Real-time task tracking",
          "Responsive and intuitive user interface",
          "Dynamic task management with drag-and-drop functionality",
        ],
    technologies: ["HTML", "JavaScript", "CSS", "LocalStorage"],
    link: [
      {
        name: "View Project",
        url: "https://ahmed4582.github.io/ToDoListJS/",
      },
    ],
    image: "/assets/todolist.png",
    category: 'dashboard',
    featured: false,
    year: 2023,
    duration: language === 'ar' ? '2 أسبوع' : '2 weeks',
    complexity: 'beginner'
  },
  {
    title: "Caarbon eCommerce",
    description: language === 'ar'
      ? "نظام تجارة إلكترونية متعدد المتاجر مع إعدادات منفصلة لكل متجر وبنية تحتية مشتركة."
      : "A multi-store e-commerce system with separate settings for each store and shared infrastructure.",
    highlights: language === 'ar'
      ? [
          "وظائف تجارة إلكترونية غنية: كتالوج المنتجات والدفع",
          "تخصيص لكل متجر من خلال السمات الديناميكية",
          "لوحات تحكم مخصصة مع تحكم في الوصول",
        ]
      : [
          "Rich e-commerce functionality: product catalog and payment",
          "Customization for each store through dynamic themes",
          "Custom dashboards with access control",
        ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    link: [
      {
        name: "View Project",
        url: "https://caarbonrentacar.com/Desktop",
      },
    ],
    image: "/assets/caarbon.png",
    category: 'ecommerce',
    featured: true,
    year: 2024,
    duration: language === 'ar' ? '6 أشهر' : '6 months',
    complexity: 'advanced'
  },
  {
    title: "DashboardCleano",
    description: language === 'ar'
      ? "لوحة إدارة شاملة لخدمات الغسيل مع واجهة مستخدم حديثة ومتجاوبة. نظام متكامل لإدارة الطلبات والعملاء والمدفوعات مع دعم كامل للعربية والإنجليزية."
      : "A comprehensive laundry service management dashboard with modern and responsive user interface. Integrated system for managing orders, customers, and payments with full Arabic and English support.",
    highlights: language === 'ar'
      ? [
          "نظام مصادقة آمن مع JWT وإدارة الجلسات",
          "إدارة الطلبات مع تتبع الحالة في الوقت الفعلي",
          "دعم متعدد اللغات مع تخطيط RTL للعربية",
          "لوحة إحصائيات مع بيانات في الوقت الفعلي",
          "تصميم متجاوب يعمل على جميع الأجهزة",
        ]
      : [
          "Secure JWT authentication with session management",
          "Order management with real-time status tracking",
          "Multi-language support with RTL layout for Arabic",
          "Statistics dashboard with real-time data",
          "Responsive design that works on all devices",
        ],
    technologies: ["React 18.3.1", "Vite", "Tailwind CSS", "React Router DOM", "i18next", "Leaflet", "Lucide React"],
    image: "/assets/dashboard-cleanoo.png",
    category: 'dashboard',
    featured: true,
    year: 2024,
    duration: language === 'ar' ? '4 أشهر' : '4 months',
    complexity: 'advanced'
  },

  ];
}
