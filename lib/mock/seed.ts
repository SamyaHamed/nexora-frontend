import type { ContactMessage } from "@/features/messages/types";
import type { Product } from "@/features/products/types";
import type { Project } from "@/features/projects/types";
import type { ProjectRequest } from "@/features/requests/types";
import type { Service } from "@/features/services/types";
import type { SiteSettings } from "@/features/settings/types";

// Sample content for the mock backend. Services/projects/products mirror the
// site's original copy; requests and messages are made-up demo submissions.
// Timestamps are relative to server start so the demo always looks recent.

const HOUR = 60 * 60 * 1000;
const hoursAgo = (hours: number) => new Date(Date.now() - hours * HOUR).toISOString();
const daysAgo = (days: number) => hoursAgo(days * 24);

export function createSeed() {
  const services: Service[] = [
    {
      id: "web",
      icon: "code",
      title: {
        en: "Website & app development",
        ar: "تطوير المواقع والتطبيقات",
      },
      description: {
        en: "Fast, responsive websites and mobile apps built with React, Next.js and Node.js.",
        ar: "مواقع وتطبيقات سريعة ومتجاوبة مبنية بـ React وNext.js وNode.js.",
      },
      features: {
        en: [
          "Marketing and corporate websites",
          "Web apps and customer portals",
          "iOS and Android apps",
        ],
        ar: ["مواقع تسويقية ومواقع للشركات", "تطبيقات ويب وبوابات للعملاء", "تطبيقات iOS وAndroid"],
      },
      order: 1,
      published: true,
    },
    {
      id: "systems",
      icon: "system",
      title: {
        en: "Custom systems",
        ar: "أنظمة مخصصة",
      },
      description: {
        en: "Internal tools, portals and dashboards shaped around how your team actually works.",
        ar: "لوحات تحكم وأدوات داخلية مصممة حسب طريقة عمل فريقك.",
      },
      features: {
        en: ["Admin dashboards", "Booking, inventory and CRM tools", "Role-based permissions"],
        ar: ["لوحات تحكم إدارية", "أدوات الحجوزات والمخزون وإدارة العملاء", "صلاحيات حسب الأدوار"],
      },
      order: 2,
      published: true,
    },
    {
      id: "ux",
      icon: "ux",
      title: {
        en: "UX/UI design",
        ar: "تصميم تجربة وواجهة المستخدم",
      },
      description: {
        en: "Research-led interfaces that are clear, accessible and true to your brand.",
        ar: "واجهات واضحة وسهلة الاستخدام تعكس هوية علامتك.",
      },
      features: {
        en: ["User research and flows", "Wireframes and prototypes", "Design systems"],
        ar: ["أبحاث المستخدمين ومسارات الاستخدام", "مخططات أولية ونماذج تفاعلية", "أنظمة التصميم"],
      },
      order: 3,
      published: true,
    },
    {
      id: "api",
      icon: "api",
      title: {
        en: "APIs & integrations",
        ar: "واجهات برمجية وتكاملات",
      },
      description: {
        en: "Documented REST APIs that connect your products, payments and third-party services.",
        ar: "واجهات REST موثقة تربط منتجاتك بخدمات الدفع والأنظمة الأخرى.",
      },
      features: {
        en: ["REST API design and docs", "Payment and SMS integrations", "Authentication with JWT"],
        ar: [
          "تصميم واجهات REST وتوثيقها",
          "تكامل بوابات الدفع والرسائل النصية",
          "المصادقة باستخدام JWT",
        ],
      },
      order: 4,
      published: true,
    },
    {
      id: "db",
      icon: "db",
      title: {
        en: "Databases",
        ar: "قواعد البيانات",
      },
      description: {
        en: "Well-structured PostgreSQL and MongoDB data models that stay fast as you grow.",
        ar: "تصميم قواعد بيانات PostgreSQL وMongoDB تبقى سريعة مع نموك.",
      },
      features: {
        en: ["PostgreSQL and MongoDB", "Data modelling and migrations", "Backups and performance"],
        ar: ["PostgreSQL وMongoDB", "نمذجة البيانات وترحيلها", "النسخ الاحتياطي والأداء"],
      },
      order: 5,
      published: true,
    },
    {
      id: "support",
      icon: "support",
      title: {
        en: "Support & maintenance",
        ar: "الدعم والصيانة",
      },
      description: {
        en: "Monitoring, backups, updates and a team that answers when something needs fixing.",
        ar: "مراقبة ونسخ احتياطي وتحديثات وفريق يستجيب عند الحاجة.",
      },
      features: {
        en: ["Hosting, HTTPS and monitoring", "Security updates", "Feature improvements"],
        ar: ["الاستضافة وHTTPS والمراقبة", "التحديثات الأمنية", "تحسين الميزات وتطويرها"],
      },
      order: 6,
      published: true,
    },
  ];

  const projects: Project[] = [
    {
      id: "p1",
      category: "website",
      title: {
        en: "[Project name]",
        ar: "[اسم المشروع]",
      },
      description: {
        en: "[One-line summary and result.]",
        ar: "[ملخص في سطر واحد والنتيجة.]",
      },
      tags: ["Next.js", "Tailwind CSS"],
      featured: true,
      published: true,
      createdAt: daysAgo(60),
    },
    {
      id: "p2",
      category: "customSystem",
      title: {
        en: "[Project name]",
        ar: "[اسم المشروع]",
      },
      description: {
        en: "[One-line summary and result.]",
        ar: "[ملخص في سطر واحد والنتيجة.]",
      },
      tags: ["React", "Node.js", "PostgreSQL"],
      featured: true,
      published: true,
      createdAt: daysAgo(52),
    },
    {
      id: "p3",
      category: "mobileApp",
      title: {
        en: "[Project name]",
        ar: "[اسم المشروع]",
      },
      description: {
        en: "[One-line summary and result.]",
        ar: "[ملخص في سطر واحد والنتيجة.]",
      },
      tags: ["React Native", "Express"],
      featured: true,
      published: true,
      createdAt: daysAgo(44),
    },
    {
      id: "p4",
      category: "customSystem",
      title: {
        en: "[Project name]",
        ar: "[اسم المشروع]",
      },
      description: {
        en: "[One-line summary and result.]",
        ar: "[ملخص في سطر واحد والنتيجة.]",
      },
      tags: ["Next.js", "MongoDB"],
      featured: false,
      published: true,
      createdAt: daysAgo(36),
    },
    {
      id: "p5",
      category: "uxui",
      title: {
        en: "[Project name]",
        ar: "[اسم المشروع]",
      },
      description: {
        en: "[One-line summary and result.]",
        ar: "[ملخص في سطر واحد والنتيجة.]",
      },
      tags: ["Figma", "Design system"],
      featured: false,
      published: true,
      createdAt: daysAgo(28),
    },
    {
      id: "p6",
      category: "website",
      title: {
        en: "[Project name]",
        ar: "[اسم المشروع]",
      },
      description: {
        en: "[One-line summary and result.]",
        ar: "[ملخص في سطر واحد والنتيجة.]",
      },
      tags: ["Next.js", "Headless CMS"],
      featured: false,
      published: true,
      createdAt: daysAgo(20),
    },
  ];

  const products: Product[] = [
    {
      id: "u1",
      status: "development",
      progress: 62,
      title: {
        en: "[Product name]",
        ar: "[اسم المنتج]",
      },
      description: {
        en: "[What it does and who it’s for — one sentence.]",
        ar: "[ماذا يقدم المنتج ولمن — في جملة واحدة.]",
      },
      tags: ["Next.js", "Node.js"],
      featured: true,
      published: true,
      createdAt: daysAgo(40),
    },
    {
      id: "u2",
      status: "beta",
      progress: 85,
      title: {
        en: "[Product name]",
        ar: "[اسم المنتج]",
      },
      description: {
        en: "[What it does and who it’s for — one sentence.]",
        ar: "[ماذا يقدم المنتج ولمن — في جملة واحدة.]",
      },
      tags: ["React", "MongoDB"],
      featured: false,
      published: true,
      createdAt: daysAgo(35),
    },
    {
      id: "u3",
      status: "planning",
      progress: 15,
      title: {
        en: "[Product name]",
        ar: "[اسم المنتج]",
      },
      description: {
        en: "[What it does and who it’s for — one sentence.]",
        ar: "[ماذا يقدم المنتج ولمن — في جملة واحدة.]",
      },
      tags: ["Next.js"],
      featured: true,
      published: true,
      createdAt: daysAgo(30),
    },
    {
      id: "u4",
      status: "launched",
      progress: 100,
      title: {
        en: "[Product name]",
        ar: "[اسم المنتج]",
      },
      description: {
        en: "[What it does and who it’s for — one sentence.]",
        ar: "[ماذا يقدم المنتج ولمن — في جملة واحدة.]",
      },
      tags: ["React Native"],
      featured: false,
      published: true,
      createdAt: daysAgo(25),
    },
  ];

  const requests: ProjectRequest[] = [
    {
      id: "r1",
      name: "Lina Haddad",
      email: "lina@example.com",
      projectType: "customSystem",
      budget: "from15kTo40k",
      timeline: "threeToSixMonths",
      status: "new",
      createdAt: hoursAgo(3),
      description:
        "Clinic booking system: online appointments, reminders by SMS, and a dashboard for reception staff.",
    },
    {
      id: "r2",
      name: "Omar Khalil",
      email: "omar@example.com",
      projectType: "mobileApp",
      budget: "from5kTo15k",
      timeline: "oneToThreeMonths",
      status: "inReview",
      createdAt: hoursAgo(20),
      description:
        "Restaurant ordering app for iOS and Android with pickup and delivery, connected to our existing POS.",
    },
    {
      id: "r3",
      name: "Sara Nasser",
      email: "sara@example.com",
      projectType: "website",
      budget: "under5k",
      timeline: "asap",
      status: "quoted",
      createdAt: daysAgo(2),
      description:
        "Corporate website in Arabic and English for a small consulting firm, with a contact form and blog.",
    },
    {
      id: "r4",
      name: "Yousef Darwish",
      email: "yousef@example.com",
      projectType: "customSystem",
      budget: "from15kTo40k",
      timeline: "flexible",
      status: "accepted",
      createdAt: daysAgo(4),
      description:
        "Inventory dashboard for three warehouses: stock levels, transfers between sites, and low-stock alerts.",
    },
    {
      id: "r5",
      name: "Maya Saleh",
      email: "maya@example.com",
      projectType: "uxui",
      budget: "from5kTo15k",
      timeline: "oneToThreeMonths",
      status: "new",
      createdAt: daysAgo(5),
      description:
        "Brand refresh and new UI for our customer portal; we have a developer team for the build.",
    },
    {
      id: "r6",
      name: "Hani Jaber",
      email: "hani@example.com",
      projectType: "api",
      budget: "unsure",
      timeline: "flexible",
      status: "declined",
      createdAt: daysAgo(9),
      description:
        "Integrate our e-commerce store with a local payment gateway and an SMS provider.",
    },
    {
      id: "r7",
      name: "Dana Fares",
      email: "dana@example.com",
      projectType: "website",
      budget: "from5kTo15k",
      timeline: "oneToThreeMonths",
      status: "inReview",
      createdAt: daysAgo(12),
      description:
        "Real-estate listings website with search filters, map view and an admin area for agents.",
    },
  ];

  const messages: ContactMessage[] = [
    {
      id: "m1",
      name: "Ahmad Ali",
      email: "ahmad@example.com",
      subject: "Question about support plans",
      message:
        "Hi, we launched our site last year with another agency. Do you offer monthly support for existing Next.js projects?",
      read: false,
      createdAt: hoursAgo(2),
    },
    {
      id: "m2",
      name: "Rana Odeh",
      email: "rana@example.com",
      subject: "Partnership inquiry",
      message:
        "We are a design studio looking for a development partner for client projects. Could we schedule a call next week?",
      read: false,
      createdAt: hoursAgo(5),
    },
    {
      id: "m3",
      name: "Khaled Amr",
      email: "khaled@example.com",
      subject: "Careers: frontend role",
      message: "Hello, I'm a frontend developer with 3 years of React experience. Are you hiring?",
      read: true,
      createdAt: daysAgo(1),
    },
    {
      id: "m4",
      name: "Nour Hamdan",
      email: "nour@example.com",
      subject: "Arabic website localization",
      message:
        "Can you help translate and adapt our existing English website to Arabic with proper RTL support?",
      read: false,
      createdAt: daysAgo(3),
    },
    {
      id: "m5",
      name: "Tariq Mansour",
      email: "tariq@example.com",
      subject: "Invoice copy",
      message: "Could you resend the invoice for last month's maintenance? Thanks.",
      read: true,
      createdAt: daysAgo(8),
    },
  ];

  const settings: SiteSettings = {
    email: "hello@nexora.example",
    phone: "+970 00 000 0000",
    address: { en: "Ramallah, Palestine", ar: "رام الله، فلسطين" },
    workingHours: { en: "[Sun–Thu, 9:00–17:00]", ar: "[الأحد–الخميس، 9:00–17:00]" },
    social: {
      facebook: "https://facebook.com/nexora",
      instagram: "https://instagram.com/nexora",
      linkedin: "https://linkedin.com/company/nexora",
    },
  };

  return { services, projects, products, requests, messages, settings };
}
