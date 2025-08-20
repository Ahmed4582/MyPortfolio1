export const translations = {
  ar: {
    nav: {
      about: "عني",
      skills: "المهارات",
      projects: "المشاريع",
      experience: "الخبرة",
      contact: "تواصل معي"
    },
    hero: {
      title: "أحمد ناصر",
      subtitle: "مطور واجهات أمامية بخبرة أكثر من سنتين",
      description: "أقوم بتصميم واجهات ويب عالية الأداء ومتاحة وجميلة باستخدام أحدث التقنيات الأمامية وأنظمة التصميم القابلة للتطوير.",
      viewResume: "عرض السيرة الذاتية",
      viewCertificate: "عرض الشهادة"
    },
    about: {
      title: "عني",
      description1: "مرحباً! أنا مطور واجهات أمامية شغوف متخصص في تصميم تجارب ويب حديثة وبديهية ومتاحة. أزدهر في إحياء التصاميم الجميلة مع ضمان أنها تعمل بكامل طاقتها ومتجاوبة وعالية الأداء.",
      description2: "مع أكثر من سنتين من الخبرة، أدمج الإبداع مع الكفاءة التقنية لتطوير حلول جميلة بصرياً وتركز على المستخدم. كل مشروع هو فرصة لتحسين تجربة المستخدم وحل التحديات المعقدة."
    },
    skills: {
      title: "المهارات التقنية",
      frontend: "الواجهة الأمامية",
      backend: "الخلفية",
      database: "قاعدة البيانات"
    },
    projects: {
      title: "مشاريع الواجهة الأمامية",
      subtitle: "تصميم تجارب أمامية متجاوبة ومتاحة وجذابة بصرياً",
      viewLive: "عرض التجربة الحية",
      viewRepo: "عرض المستودع"
    },
    experience: {
      title: "الخبرة العملية"
    },
    contact: {
      title: "تواصل معي",
      name: "الاسم",
      email: "البريد الإلكتروني",
      message: "الرسالة",
      sendMessage: "إرسال رسالة عبر واتساب",
      openingWhatsApp: "جاري فتح واتساب...",
      location: "الموقع",
      locationValue: "الشرقية، مصر"
    }
  },
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact"
    },
    hero: {
      title: "Ahmed Nasser",
      subtitle: "Front-End Engineer with 2+ Years of Hands-On Experience",
      description: "Crafting performant, accessible, and aesthetically refined web interfaces using modern front-end technologies and scalable design systems.",
      viewResume: "View Resume",
      viewCertificate: "View Certificate"
    },
    about: {
      title: "About Me",
      description1: "Hello! I'm a passionate front-end developer with a deep expertise in crafting modern, intuitive, and accessible web experiences. I thrive on bringing beautiful designs to life while ensuring they are fully functional, responsive, and performant.",
      description2: "With over 2 years of experience, I blend creativity with technical proficiency to develop solutions that are both visually appealing and user-centric. Every project is an opportunity to enhance the user experience and solve complex challenges."
    },
    skills: {
      title: "Technical Skills",
      frontend: "Frontend",
      backend: "Backend",
      database: "Database"
    },
    projects: {
      title: "Frontend Projects",
      subtitle: "Crafting responsive, accessible, and visually engaging frontend experiences",
      viewLive: "View Live Demo",
      viewRepo: "View Repository"
    },
    experience: {
      title: "Work Experience"
    },
    contact: {
      title: "Get in Touch",
      name: "Name",
      email: "Email",
      message: "Message",
      sendMessage: "Send Message via WhatsApp",
      openingWhatsApp: "Opening WhatsApp...",
      location: "Location",
      locationValue: "al-Sharqia, Egypt"
    }
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
