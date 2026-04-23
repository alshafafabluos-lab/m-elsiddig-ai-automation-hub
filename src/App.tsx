/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Cpu, 
  Database, 
  Globe, 
  Mail, 
  MessageSquare, 
  Code2, 
  Github, 
  Linkedin, 
  Instagram, 
  Facebook, 
  ArrowRight, 
  Download, 
  ExternalLink, 
  Globe2, 
  Menu, 
  X,
  Bot,
  Zap,
  CheckCircle2,
  Phone,
  Star,
  BookOpen,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { jsPDF } from 'jspdf';

// --- Types ---
type Language = 'ar' | 'en';

interface Translation {
  nav: {
    home: string;
    services: string;
    portfolio: string;
    vision: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  vision: {
    title: string;
    subtitle: string;
    philosophyTitle: string;
    philosophyDesc: string;
    categories: {
      id: string;
      title: string;
      desc: string;
      advice: string;
    }[];
    consultationCta: string;
  };
  blueprint: {
    title: string;
    description: string;
    cta: string;
    disclaimer: string;
    pdf: {
      title: string;
      author: string;
      sections: { h: string; p: string; }[];
    };
  };
  services: {
    title: string;
    items: {
      title: string;
      description: string;
      features: string[];
    }[];
  };
  portfolio: {
    title: string;
    viewImage: string;
  };
  assistant: {
    label: string;
    welcome: string;
    categories: {
      faq: string;
      terms: string;
      process: string;
    };
    faqs: { q: string; a: string; }[];
    terms: { title: string; content: string; }[];
    process: { step: string; desc: string; }[];
  };
  contact: {
    title: string;
    form: {
      name: string;
      email: string;
      message: string;
      send: string;
    };
    socials: string;
  };
}

// --- Content ---
const translations: Record<Language, Translation> = {
  en: {
    nav: { home: 'Home', services: 'Solutions', portfolio: 'Work', vision: 'AI Hub', contact: 'Talk' },
    hero: {
      title: 'Mustafa ElSiddig',
      subtitle: 'Solutions Engineer & AI Systems Automation Developer',
      description: 'I build smart systems that handle your routine work and manual processes, saving you hours of effort every day using AI and Automation tools.',
      ctaPrimary: 'Start Your Project',
      ctaSecondary: 'View My Work'
    },
    services: {
      title: 'What I Can Do For You',
      items: [
        {
          title: 'Business Process Automation',
          description: 'Connecting your favorite apps to work together and handle repetitive tasks automatically.',
          features: [
            'Google Apps Script Automation',
            'Zapier & Make.com Integration',
            'Automatic Invoicing & Reports',
            'Custom Workflow Building'
          ]
        },
        {
          title: 'Smart AI Chatbots',
          description: 'Building intelligent assistants that talk to your customers and handle basic inquiries 24/7.',
          features: [
            'WhatsApp & Messenger Bots',
            'AI Document Assistants (RAG)',
            'Auto Lead Qualification',
            'Customer Support Automation'
          ]
        },
        {
          title: 'Custom Python Solutions',
          description: 'Writing specialized scripts and tools to solve specific business problems or process data.',
          features: [
            'Web Scraping & Data Extraction',
            'Custom API Integrations',
            'Task Automation Scripts',
            'File & Image Processing'
          ]
        },
        {
          title: 'Data & Sheets Automation',
          description: 'Turning messy data into organized systems using Google Sheets and automation scripts.',
          features: [
            'Google Apps Script',
            'Automated Dashboarding',
            'Data Cleaning & Formatting',
            'Bulk Data Management'
          ]
        },
        {
          title: 'Professional Web Apps',
          description: 'Developing fast, modern, and easy-to-use websites and web applications.',
          features: [
            'Fast Performance Apps',
            'Responsive & Clean Design',
            'SEO Friendly Structure',
            'User-Focused Experience'
          ]
        }
      ]
    },
    portfolio: {
      title: 'Projects & Results',
      viewImage: 'See Project'
    },
    vision: {
      title: 'Future Vision',
      subtitle: 'AI with a Human Perspective',
      philosophyTitle: 'Continuous Evolution Over Static Degrees',
      philosophyDesc: 'In a world changing every second, a degree from 2022 might not serve you in 2030. Technology doesn\'t wait for curriculum changes. I don\'t advocate leaving studies, but I urge you to embrace constant adaptation. AI is not here to replace us, but to empower those who know how to walk with it.',
      categories: [
        {
          id: 'student',
          title: 'Students & Talents',
          desc: 'AI is your ultimate mentor. It is about understanding faster, not cheating. Use it to break down complex theories and explore career paths.',
          advice: 'Think of AI as an "Exoskeleton" for your brain. It amplifies your logic but can never replace your human creativity. Use it to learn 10x faster, but keep the steering wheel in your hands.'
        },
        {
          id: 'employee',
          title: 'Ambitious Employees',
          desc: 'Automation protects your position by making you indispensable. Let the machine handle the data, while you handle the strategy.',
          advice: 'AI wont replace humans, but humans using AI will replace those who dont. Focus on becoming the conductor of the digital orchestra.'
        },
        {
          id: 'business',
          title: 'Agile Organizations',
          desc: 'Build smart workflows that grow without overhead. AI is the tool that lets small teams achieve giant results.',
          advice: 'Scale your vision, not your friction. Use AI to build a system that works while you sleep, serving your customers with human-like precision.'
        }
      ],
      consultationCta: 'Let\'s Discuss Your AI Strategy (Free Brief)'
    },
    blueprint: {
      title: 'Strategic Blueprint',
      description: 'Download my high-level engineering guide for scaling your business with AI and smart workflows.',
      cta: 'Download Blueprint (PDF)',
      disclaimer: 'Engineered for founders and technical leaders.',
      pdf: {
        title: 'Deep AI & Automation Strategic Blueprint',
        author: 'Mustafa ElSiddig - Solutions Engineer',
        sections: [
          { h: 'The Architecture', p: 'Designing scalable systems by separating data, logic, and interface layers for long-term growth.' },
          { h: 'Advanced Roadmap', p: 'Auditing workflows to identify bottlenecks and orchestrating systems using custom scripts and APIs.' },
          { h: 'AI Agents (RAG)', p: 'Moving beyond simple chat-bots to building context-aware agents that handle complex business operations.' },
          { h: 'Custom Coding vs Generic Tools', p: 'Leveraging Python and Google Apps Script for efficiency where common tools reach their limits.' }
        ]
      }
    },
    assistant: {
      label: 'Your Project Partner',
      welcome: 'Hello! I can help you find out which tasks you can automate today. What part of your work takes most of your time?',
      categories: {
        faq: 'Questions',
        terms: 'My Commitments',
        process: 'How We Work'
      },
      faqs: [
        { q: 'How does automation help my business?', a: 'It saves you hours of manual work every week, reduces human errors, and lets you focus on growing your business instead of doing routine tasks.' },
        { q: 'Is it hard to set up?', a: 'Not for you! I handle all the technical setup and integration, making sure everything works smoothly with your current tools.' },
        { q: 'How long does a project take?', a: 'Most automation tasks and bots can be up and running within 1 to 2 weeks.' }
      ],
      terms: [
        { title: 'Data Privacy', content: 'Your business data is yours. I follow strict security practices to keep your information safe.' },
        { title: 'Reliable Support', content: 'I don\'t just build and leave; I make sure the system works perfectly and I am here if you need help later.' },
        { title: 'Simple & Scalable', content: 'I build systems that are easy to use and can grow as your business grows.' }
      ],
      process: [
        { step: 'Discussion', desc: 'We talk about your work and find the best things to automate.' },
        { step: 'Building', desc: 'I develop the bot or automation specifically for your needs.' },
        { step: 'Launch', desc: 'We go live, and you start saving time immediately.' }
      ]
    },
    contact: {
      title: 'Let\'s Work Together',
      form: {
        name: 'Your Name',
        email: 'Your Email',
        message: 'How can I help you?',
        send: 'Send Message'
      },
      socials: 'Social Links'
    }
  },
  ar: {
    nav: { home: 'الرئيسية', services: 'الخدمات', portfolio: 'أعمالي', vision: 'دليلك للذكاء', contact: 'تواصل معي' },
    hero: {
      title: 'مصطفى الصديق',
      subtitle: 'مهندس حلول ومطور أتمتة وأنظمة ذكاء اصطناعي',
      description: 'أساعدك على توفير وقتك وجهدك من خلال أتمتة المهام المتكررة وبناء أنظمة ذكية تنجز عملك الروتيني بدقة وسرعة.',
      ctaPrimary: 'ابدأ مشروعك الآن',
      ctaSecondary: 'مشاهدة أعمالي'
    },
    services: {
      title: 'كيف يمكنني مساعدتك؟',
      items: [
        {
          title: 'أتمتة مهام العمل',
          description: 'ربط تطبيقاتك المفضلة ببعضها لتنفيذ المهام الروتينية بدلاً منك بشكل آلي تماماً.',
          features: [
            'برمجة Google Apps Script',
            'ربط التطبيقات (Zapier/Make)',
            'أتمتة التقارير والفواتير',
            'بناء مسارات عمل مخصصة'
          ]
        },
        {
          title: 'بوتات رد ذكية (AI)',
          description: 'بناء مساعدين ذكيين للرد على عملائك في الواتساب أو موقعك على مدار الساعة.',
          features: [
            'بوتات واتساب وماسنجر',
            'أنظمة رد قائمة على بياناتك',
            'تصنيف العملاء تلقائياً',
            'توفير وقت خدمة العملاء'
          ]
        },
        {
          title: 'حلول برمجية بلغة بايثون',
          description: 'كتابة سكربتات مخصصة لحل أي مشكلة تقنية أو استخلاف بيانات من المواقع.',
          features: [
            'استخراج البيانات من المواقع',
            'ربط برمجيات الـ API',
            'سكربتات أتمتة المهام',
            'معالجة الملفات والصور'
          ]
        },
        {
          title: 'أتمتة جداول البيانات',
          description: 'تحويل جداول البيانات الفوضوية إلى نظام منظم وذكي يوفر عليك ساعات من التنسيق.',
          features: [
            'Google Apps Script',
            'تقارير ولوحات تحكم آلية',
            'تنظيف البيانات وتنسيقها',
            'إدارة البيانات الضخمة'
          ]
        },
        {
          title: 'تطوير مواقع وتطبيقات',
          description: 'بناء مواقع سريعة وحديثة تساعدك في عرض خدماتك وتطوير وجودك الرقمي.',
          features: [
            'تطبيقات ويب سريعة الأداء',
            'تصميم عصري وسهل الاستخدام',
            'تحسين الظهور في جوجل',
            'تجربة مستخدم مريحة'
          ]
        }
      ]
    },
    portfolio: {
      title: 'أعمالي وتجارب العملاء',
      viewImage: 'شاهد المشروع'
    },
    vision: {
      title: 'رؤية المستقبل',
      subtitle: 'الذكاء الاصطناعي بعين إنسانية',
      philosophyTitle: 'المواكبة المستمرة أهم من الشهادة الجامعية',
      philosophyDesc: 'في عالم يتغير كل ثانية، الشهادة التي أخذتها في 2022 قد لا تخدمك في 2030. التكنولوجيا لا تنتظر أحداً. أنا لا أدعو لترك الدراسة، بل أدعوك لمواكبة التطور كل يوم. الذكاء الاصطناعي خُلق ليكون شريكاً لنا، ليعطينا "قوى خارقة" ننجز بها ما كان مستحيلاً بالأمس.',
      categories: [
        {
          id: 'student',
          title: 'للطلاب والمواهب',
          desc: 'الذكاء الاصطناعي هو معلمك الشخصي الأفضل. الهدف هو الفهم العميق والتحليل وليس مجرد "القص واللصق". تعلم كيف تسبق زمنك.',
          advice: 'اعتبر الذكاء الاصطناعي كـ "هيكل خارجي" لعقلك المبدع. هو يضاعف قوتك لكنه لا يحل محل منطقك البشري. استخدمه لتفهم 10 أضعاف أسرع، لكن ابقِ أنت القائد والمفكر.'
        },
        {
          id: 'employee',
          title: 'للموظف الطموح',
          desc: 'الأتمتة تحمي منصبك بجعلك الموظف الذي لا يمكن استبداله. دع الآلة تعالج البيانات، وركز أنت على اتخاذ القرارات الاستراتيجية.',
          advice: 'الذكاء الاصطناعي لن يحل محل البشر، لكن البشر الذين يستخدمونه سيحلون محل أولئك الذين يرفضونه. كن أنت المايسترو لهذا النظام الذكي.'
        },
        {
          id: 'business',
          title: 'للمؤسسات المرنة',
          desc: 'ابنِ مسارات عمل ذكية تنمو مع نمو طموحك دون زيادة التعقيد الإداري. الذكاء هو سر التوسع الرشيق.',
          advice: 'ضاعف رؤيتك، وليس عدد الموظفين بشكل عشوائي. استخدم الذكاء الاصطناعي لبناء نظام يخدم عملاءك بدقة بشرية وسرعة فائقة على مدار الساعة.'
        }
      ],
      consultationCta: 'لنناقش استراتيجية الذكاء الاصطناعي الخاصة بك (استشارة مجانية)'
    },
    blueprint: {
      title: 'الدليل الاستراتيجي',
      description: 'قم بتحميل دليلي الهندسي لبناء بنية تحتية ذكية لمؤسستك وتحجيم عملياتك آلياً.',
      cta: 'تحميل الدليل (PDF)',
      disclaimer: 'مصمم خصيصاً للمؤسسين والقادة التقنيين.',
      pdf: {
        title: 'الدليل الاستراتيجي للأتمتة والذكاء الاصطناعي',
        author: 'مصطفى الصديق - مهندس حلول',
        sections: [
          { h: 'هندسة الأنظمة', p: 'تصميم أنظمة قابلة للتوسع من خلال فصل طبقات البيانات والمنطق لضمان النمو المستدام.' },
          { h: 'خارطة الطريق المتقدمة', p: 'تحليل مسارات العمل لتحديد نقاط الاختناق وربط الأنظمة باستخدام سكربتات مخصصة.' },
          { h: 'وكلاء الذكاء (RAG)', p: 'الانتقال من مجرد المحادثة إلى بناء وكلاء أذكياء لديهم سياق كامل عن بياناتك الخاصة.' },
          { h: 'البرمجة مقابل الأدوات الجاهزة', p: 'استغلال بايثون وغوغل سكربت لتحقيق الكفاءة في المناطق التي تتوقف عندها الأدوات العادية.' }
        ]
      }
    },
    assistant: {
      label: 'شريكك في التطوير',
      welcome: 'أهلاً بك! يمكنني مساعدتك في اكتشاف المهام التي يمكنك أتمتتها اليوم. ما هو أكثر شيء يستهلك وقتك في العمل؟',
      categories: {
        faq: 'أسئلة شائعة',
        terms: 'التزاماتي تجاهك',
        process: 'كيف نبدأ العمل؟'
      },
      faqs: [
        { q: 'كيف تفيد الأتمتة مشروعي؟', a: 'توفر عليك ساعات من العمل اليدوي أسبوعياً، وتقلل الأخطاء البشرية، وتخليك تركز في نمو البزنس بدل الشغل الروتيني.' },
        { q: 'هل الموضوع صعب في التنفيذ؟', a: 'أبداً! أنا أتكفل بكل التفاصيل التقنية والربط، وأتأكد إن كل شي شغال بسلاسة مع أدواتك الحالية.' },
        { q: 'كم ياخذ المشروع من الوقت؟', a: 'معظم مهام الأتمتة والبوتات بتكون جاهزة وشغالة في فترة بين أسبوع إلى أسبوعين.' }
      ],
      terms: [
        { title: 'خصوصية بياناتك', content: 'بيانات عملك ملك لك وحدك، وألتزم بخصوصيتها وأمانها بشكل كامل.' },
        { title: 'دعم ومتابعة', content: 'شغلي ما بينتهي بمجرد التسليم، بكون معاك عشان أتأكد إن النظام شغال بامتياز.' },
        { title: 'مرونة وبساطة', content: 'أصمم أنظمة سهلة في الاستخدام وقابلة للتطوير مع نمو مشروعك.' }
      ],
      process: [
        { step: 'نقاش', desc: 'نتكلم عن طبيعة شغلك ونحدد الأشغال الممكن أتمتتها.' },
        { step: 'بناء', desc: 'أقوم بتطوير البوت أو نظام الأتمتة المناسب لاحتياجك.' },
        { step: 'انطلاق', desc: 'النظام يبدأ يشتغل وأنت تبدأ توفر وقتك فوراً.' }
      ]
    },
    contact: {
      title: 'خلينا نشتغل مع بعض',
      form: {
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        message: 'كيف أقدر أساعدك؟',
        send: 'إرسال الرسالة'
      },
      socials: 'روابط التواصل'
    }
  }
};

const portfolioItems = [
  { id: 1, url: '/project1.png', title: 'BrandAI: Customer Support Ecosystem', tag: 'Full Integration', tech: ['Python', 'OpenAI', 'Pinecone'] },
  { id: 2, url: '/project2.jpg', title: 'AI Digital Employee (Flex-AI)', tag: 'AI Agent', tech: ['LangChain', 'Make.com', 'Zapier'] },
  { id: 3, url: '/project3.jpg', title: 'Operational Bleed Analysis Tool', tag: 'Automation', tech: ['Pandas', 'Google Sheets', 'Apps Script'] },
  { id: 4, url: '/project4.jpg', title: 'Flex-AI PRO Systems', tag: 'Systems Evolution', tech: ['Custom API', 'Workflow', 'No-Code'] },
  { id: 5, url: '/project5.png', title: 'Custom AI Terminal & Scripting', tag: 'Data Engineering', tech: ['Bash', 'Python', 'LLM'] }
];

// --- Components ---

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [isBotOpen, setIsBotOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'faq' | 'terms' | 'process'>('faq');
  const [userRating, setUserRating] = useState<number | null>(null);

  const t = translations[lang];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [customService, setCustomService] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const servicesList = lang === 'ar' 
    ? ['أتمتة العمليات (Automation)', 'بوتات الذكاء الاصطناعي (AI Bots)', 'برمجة بايثون (Python)', 'تحليل البيانات (Analytics)', 'هندسة الأنظمة (Systems)']
    : ['Process Automation', 'AI Chatbots', 'Python Scripting', 'Data Analytics', 'Systems Engineering'];

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const services = selectedServices.join(', ') + (customService ? `, Other: ${customService}` : '');
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nServices Requested: ${services}\n\nMessage:\n${formData.message}`;
    const mailtoUrl = `mailto:MustafaSiddig989@gmail.com?subject=New Project Request from Portfolio&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const generateBlueprintPDF = () => {
    const doc = new jsPDF();
    const primaryColor = [59, 130, 246]; // Brand Blue
    const bgColor = [15, 23, 42]; // Slate 900
    const textColor = [255, 255, 255];
    const subTextColor = [148, 163, 184];
    
    let currentPage = 1;
    let y = 20;

    const setupPage = () => {
      doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
      doc.rect(0, 0, 210, 297, 'F');
      
      // Footer on every page
      doc.setDrawColor(subTextColor[0], subTextColor[1], subTextColor[2]);
      doc.setLineWidth(0.1);
      doc.line(15, 280, 195, 280);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFontSize(8);
      doc.text(`MUSTAFA ELSIDDIG | STRATEGIC AI BLUEPRINT 2025 | PAGE ${currentPage}`, 15, 288);
      
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    };

    const checkNewPage = (neededHeight: number) => {
      if (y + neededHeight > 270) {
        doc.addPage();
        currentPage++;
        y = 30;
        setupPage();
      }
    };

    // --- PAGE 1: TITLE ---
    setupPage();
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(32);
    doc.text('THE STRATEGIC', 15, 80);
    doc.text('AI BLUEPRINT', 15, 95);
    
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(18);
    doc.text('Architecting Intelligent Business Systems', 15, 110);
    
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(1);
    doc.line(15, 120, 100, 120);
    
    doc.setFontSize(14);
    doc.text('A Comprehensive Guide for Founders and Technical Leaders', 15, 135);
    doc.text('on Scaling Efficiency through Automation and Deep AI.', 15, 145);
    
    doc.setFontSize(12);
    doc.setTextColor(subTextColor[0], subTextColor[1], subTextColor[2]);
    doc.text('PREPARED BY:', 15, 230);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(14);
    doc.text('Mustafa ElSiddig', 15, 240);
    doc.setFontSize(11);
    doc.text('Solutions Engineer & AI Automation Expert', 15, 246);

    // --- PAGE 2: PHILOSOPHY ---
    doc.addPage();
    currentPage++;
    y = 30;
    setupPage();
    doc.setFontSize(22);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('01. THE PHILOSOPHY', 15, y);
    y += 20;
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(12);
    const philosophyText = [
      "In the rapidly evolving landscape of 2025, technology is no longer a support function—it is the core of any sustainable business. This blueprint is not about tools; it is about architecture.",
      "",
      "Generic automation leads to fragile systems. Strategic engineering leads to exponential growth. My approach focuses on building 'Digital Assets' that appreciate over time, reducing the need for massive human overhead while increasing output precision.",
      "",
      "The goal is simple: To transition your organization from a series of manual, disconnected tasks into a single, cohesive, and intelligent 'Living Organism'."
    ];
    philosophyText.forEach(text => {
      const split = doc.splitTextToSize(text, 180);
      doc.text(split, 15, y);
      y += split.length * 7;
    });

    // --- PAGE 3: WORKFLOW ENGINEERING ---
    checkNewPage(100);
    y += 20;
    doc.setFontSize(22);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('02. WORKFLOW ENGINEERING', 15, y);
    y += 20;
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(12);
    const workflowText = [
      "Before applying AI, we must decode the workflow. Most inefficiencies are hidden behind 'The way we've always done it'.",
      "",
      "Step 1: Gap Analysis. Identifying where data stalls and where manual intervention is excessive.",
      "Step 2: Logic Mapping. Every business process is a series of 'If-This-Then-That' statements. We map these into a digital logic layer.",
      "Step 3: Redundancy Elimination. Removing steps that don't add value before automating the ones that do.",
      "",
      "Transformation is about subtraction, then multiplication."
    ];
    workflowText.forEach(text => {
      const split = doc.splitTextToSize(text, 180);
      doc.text(split, 15, y);
      y += split.length * 7;
    });

    // --- PAGE 4: DATA INFRASTRUCTURE ---
    checkNewPage(100);
    y += 20;
    doc.setFontSize(22);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('03. DATA ARCHITECTURE', 15, y);
    y += 20;
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(12);
    const dataText = [
      "AI is only as good as the data it feeds on. A modern business needs a 'Single Source of Truth'.",
      "",
      "- Centralized Repositories: Moving away from isolated sheets into unified databases.",
      "- Data Orchestration: Using tools like Google Apps Script to move data seamlessly between platforms.",
      "- Real-time Analytics: Automating the reporting layer so decisions are made on data, not gut feelings.",
      "",
      "A well-structured database is a moat that protects your business from competitors."
    ];
    dataText.forEach(text => {
      const split = doc.splitTextToSize(text, 180);
      doc.text(split, 15, y);
      y += split.length * 7;
    });

    // --- PAGE 5: DEEP AUTOMATION ---
    checkNewPage(100);
    y += 20;
    doc.setFontSize(22);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('04. DEEP AUTOMATION', 15, y);
    y += 20;
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(12);
    const automationText = [
      "Beyond Zapier: Deep automation involves using APIs and Webhooks to create custom connections.",
      "",
      "- Logic Controllers: Using Python or Node.js to handle complex multi-conditional paths.",
      "- Cross-Platform Sync: Ensuring that a change in your CRM reflects instantly in your accounting and project management tools.",
      "- Failure Recovery: Building 'Self-Healing' systems that retry operations if an API call fails.",
      "",
      "True automation is invisible."
    ];
    automationText.forEach(text => {
      const split = doc.splitTextToSize(text, 180);
      doc.text(split, 15, y);
      y += split.length * 7;
    });

    // --- PAGE 6: AI AUGMENTATION ---
    checkNewPage(100);
    y += 20;
    doc.setFontSize(22);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('05. AI AUGMENTATION', 15, y);
    y += 20;
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(12);
    const aiText = [
      "Integrating LLMs (Large Language Models) isn't just about chat. It's about 'Reasoning'.",
      "",
      "- Content Intelligence: Automating the drafting of proposals, contracts, and marketing copy.",
      "- Cognitive Routing: Using AI to categorize incoming tickets/emails and assign them to the right human or bot.",
      "- Sentiment Analysis: Monitoring customer feedback in real-time to alert management of potential issues.",
      "",
      "AI is the engine, but Prompt Engineering is the steering wheel."
    ];
    aiText.forEach(text => {
      const split = doc.splitTextToSize(text, 180);
      doc.text(split, 15, y);
      y += split.length * 7;
    });

    // --- PAGE 7: RAG & KNOWLEDGE BASES ---
    checkNewPage(100);
    y += 20;
    doc.setFontSize(22);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('06. CUSTOM KNOWLEDGE (RAG)', 15, y);
    y += 20;
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(12);
    const ragText = [
      "Retrieval Augmented Generation (RAG) is the key to making AI safe and useful for your company.",
      "",
      "- Personal Context: Giving AI access to your specific SOPs, history, and training manuals.",
      "- Zero Hallucination: Forcing the AI to only answer based on provided facts.",
      "- Instant Training: New employees can 'Talk' to the company history to learn processes instantly.",
      "",
      "Turning your dead archives into a living, breathing knowledge base."
    ];
    ragText.forEach(text => {
      const split = doc.splitTextToSize(text, 180);
      doc.text(split, 15, y);
      y += split.length * 7;
    });

    // --- PAGE 8: AUTONOMOUS AGENTS ---
    checkNewPage(100);
    y += 20;
    doc.setFontSize(22);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('07. AUTONOMOUS AGENTS', 15, y);
    y += 20;
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(12);
    const agentText = [
      "The next frontier: Digital workers that don't just 'suggest', but 'act'.",
      "",
      "- Sales Agents: Cold outreach and qualification handling automatically.",
      "- HR Agents: Initial screening and scheduling of candidates.",
      "- Support Agents: Resolving 80% of issues without human intervention.",
      "",
      "Scaling your power without scaling your payroll."
    ];
    agentText.forEach(text => {
      const split = doc.splitTextToSize(text, 180);
      doc.text(split, 15, y);
      y += split.length * 7;
    });

    // --- PAGE 9: SAFETY & GOVERNANCE ---
    checkNewPage(100);
    y += 20;
    doc.setFontSize(22);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('08. GOVERNANCE & SECURITY', 15, y);
    y += 20;
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(12);
    const safetyText = [
      "With great power comes great responsibility. Intelligent systems must be secure.",
      "",
      "- Data Sovereignty: Ensuring AI calls don't leak sensitive trade secrets.",
      "- Audit Trails: Knowing exactly why an AI made a specific decision.",
      "- Human-in-the-loop: Critical steps always require a human click.",
      "",
      "Security is not a feature; it is the foundation."
    ];
    safetyText.forEach(text => {
      const split = doc.splitTextToSize(text, 180);
      doc.text(split, 15, y);
      y += split.length * 7;
    });

    // --- PAGE 10: CONCLUSION & ACTION ---
    checkNewPage(150);
    y += 20;
    doc.setFontSize(22);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('09. THE NEXT STEP', 15, y);
    y += 20;
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(12);
    doc.text("Reading this blueprint is the first step. Implementing it is the marathon.", 15, y);
    y += 10;
    doc.text("Automation and AI are not about replacing people, but about freeing them from the shackles of routine. If you take anything from this document, let it be this: The cost of inaction is higher than the cost of implementation.", 15, y + 5);
    
    y += 40;
    doc.setFontSize(20);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('READY TO ARCHITECT YOUR FUTURE?', 15, y);
    y += 15;
    doc.setFontSize(14);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text('Email: MustafaSiddig989@gmail.com', 15, y);
    doc.text('WhatsApp: +249 124 819 460', 15, y + 8);
    
    doc.save('Mustafa_Strategic_AI_Blueprint_2025.pdf');
  };

  const handleRating = (stars: number) => {
    setUserRating(stars);
    // Note: Since Firebase is declined, we simulate or direct to contact
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
    document.documentElement.dir = lang === 'ar' ? 'ltr' : 'rtl';
    document.documentElement.lang = lang === 'ar' ? 'en' : 'ar';
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-white selection:bg-brand-500/30 selection:text-brand-200 relative transition-colors duration-300 ${lang === 'ar' ? 'font-sans' : 'font-sans'}`}>
      {/* Interactive Cursor Spotlight */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.15), transparent 80%)`
        }}
      />
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-500 z-[100] origin-left"
        style={{ scaleX }}
      />
      {/* Engineering Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold text-gradient cursor-pointer"
            onClick={() => scrollTo('home')}
          >
            M. ElSiddig
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {Object.entries(t.nav).map(([key, value]) => (
              <button 
                key={key} 
                onClick={() => scrollTo(key)}
                className="text-sm font-medium text-slate-300 hover:text-brand-400 transition-colors uppercase tracking-wider"
              >
                {value}
              </button>
            ))}
            <button 
              onClick={toggleLang}
              className="px-3 py-1 rounded border border-slate-700 hover:border-brand-500 text-xs font-bold transition-all text-slate-300 flex items-center gap-2"
            >
              <Globe2 size={14} />
              {lang === 'ar' ? 'EN' : 'العربية'}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleLang} className="text-slate-300 text-xs font-bold px-2 py-1 border border-slate-700 rounded uppercase">
              {lang === 'ar' ? 'EN' : 'AR'}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-300 p-1">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 pt-20"
          >
            {Object.entries(t.nav).map(([key, value]) => (
              <button 
                key={key} 
                onClick={() => scrollTo(key)}
                className="text-2xl font-bold text-slate-100 hover:text-brand-400"
              >
                {value}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-500/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="inline-block px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-sm font-bold tracking-wide uppercase">
                {t.hero.subtitle}
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                  {lang === 'ar' ? 'متاح للمشاريع الجديدة' : 'Available for hire'}
                </span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              {t.hero.title}
              <span className="block text-gradient mt-2">
                {lang === 'ar' ? 'أتمتة الحاضر.. لهندسة المستقبل' : 'Automating Today, Engineering Tomorrow'}
              </span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              {t.hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => {
                  const msg = lang === 'ar' 
                    ? 'السلام عليكم بشمهندس مصطفى، اطلعت على موقعك وأود البدء في مشروع أتمتة جديد.'
                    : 'Hello Mustafa, I checked your website and I would like to start a new automation project.';
                  window.open(`https://wa.me/249124819460?text=${encodeURIComponent(msg)}`);
                }}
                className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-brand-900/20"
              >
                {t.hero.ctaPrimary}
                <ArrowRight size={20} className={lang === 'ar' ? 'rotate-180' : ''} />
              </button>
              <button 
                onClick={() => scrollTo('portfolio')}
                className="px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl font-bold transition-all"
              >
                {t.hero.ctaSecondary}
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative hidden md:block"
          >
            <div className="relative z-10 glass rounded-3xl p-8 aspect-square flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-cyan-500/10 rounded-3xl" />
              <div className="relative">
                <Bot size={180} className="text-brand-400 motion-safe:animate-pulse" />
                <div className="absolute -top-4 -right-4 p-4 glass rounded-2xl animate-bounce">
                  <Cpu className="text-cyan-400" size={32} />
                </div>
                <div className="absolute -bottom-4 -left-4 p-4 glass rounded-2xl">
                  <Zap className="text-yellow-400" size={32} />
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-slate-800/30 rounded-full animate-spin-slow pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Impact Numbers Section */}
      <section className="relative z-10 -mt-12 mb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: lang === 'ar' ? 'تحسين كفاءة العمليات' : 'Process Efficiency Boost', value: '90%+', sub: lang === 'ar' ? 'تقليل المهام اليدوية' : 'Manual task reduction' },
              { label: lang === 'ar' ? 'تغطية ذكية شاملة' : 'AI Operational Coverage', value: '24/7', sub: lang === 'ar' ? 'أنظمة تعمل بلا انقطاع' : 'Uninterrupted systems' },
              { label: lang === 'ar' ? 'دقة هندسة البيانات' : 'Data Engineering Precision', value: '100%', sub: lang === 'ar' ? 'حلول خالية من الأخطاء' : 'Error-free implementation' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-3xl border-slate-800 flex flex-col items-center text-center group hover:border-brand-500/50 transition-colors"
                id={`stat-${i}`}
              >
                <div className="text-4xl md:text-5xl font-black text-brand-500 mb-2 group-hover:scale-110 transition-transform font-mono">
                  {stat.value}
                </div>
                <div className="text-white font-bold text-sm uppercase tracking-widest mb-1">
                  {stat.label}
                </div>
                <div className="text-slate-500 text-xs">
                  {stat.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gradient inline-block uppercase">{t.services.title}</h2>
            <div className="h-1 w-20 bg-brand-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.items.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-8 rounded-3xl hover:border-brand-500/50 transition-all flex flex-col h-full group"
              >
                <div className="p-3 bg-brand-500/10 rounded-2xl w-fit mb-6 text-brand-400 group-hover:scale-110 transition-transform">
                  {index === 0 && <Cpu size={28} />}
                  {index === 1 && <Bot size={28} />}
                  {index === 2 && <Zap size={28} />}
                  {index === 3 && <Database size={28} />}
                  {index === 4 && <Globe size={28} />}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white uppercase">{service.title}</h3>
                <p className="text-slate-400 mb-8 flex-grow">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 size={16} className="text-brand-500 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section - Direct Image Links */}
      <section id="portfolio" className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight uppercase">{t.portfolio.title}</h2>
              <p className="text-slate-400 text-lg">{lang === 'ar' ? 'معرض يبرز الدقة والاحترافية في تنفيذ الأنظمة الذكية' : 'Showcasing precision and professionalism in intelligent systems implementation'}</p>
            </div>
            <div className="h-px flex-grow bg-slate-800 mx-8 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative rounded-3xl overflow-hidden glass"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.url} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tech?.map(t => (
                      <span key={t} className="text-[10px] px-2 py-1 bg-brand-500/20 text-brand-300 border border-brand-500/30 rounded-md font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-white font-bold text-xl mb-4">{item.title}</h4>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-brand-400 font-bold hover:text-brand-300 transition-colors"
                  >
                    {t.portfolio.viewImage}
                    <ExternalLink size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About / CV Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="glass p-12 rounded-[3rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-[100px] pointer-events-none" />
             <div className="grid md:grid-cols-3 gap-12 items-center">
                <div className="md:col-span-2">
              <h3 className="text-3xl font-bold mb-6 text-white uppercase">{lang === 'ar' ? 'أقدم حلولاً ذكية تخدم أهدافك' : 'Smart Solutions Tailored to Your Goals'}</h3>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                {lang === 'ar' 
                  ? 'خبرتي في البرمجة والأتمتة تساعدك على تنظيم عملك وتوفير وقتك. لا داعي للقلق بشأن التعقيدات التقنية، أنا هنا لأحول المهام الصعبة والمملة إلى عمليات بسيطة وذكية تخدم مشروعك وتزيد من إنتاجيتك.' 
                  : 'My experience in programming and automation helps you organize your work and save time. Forget about technical complexities—I am here to turn difficult and tedious tasks into simple, smart processes that serve your business and increase productivity.'}
              </p>
                  <a 
                    href="https://drive.google.com/file/d/16nzwA6CTMUMOlrh0vJMcpuhezuUVqBN9/view?usp=drivesdk" 
                    target="_blank"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-slate-100 text-slate-950 rounded-2xl font-bold hover:bg-white transition-all transform hover:-translate-y-1"
                  >
                    <Download size={20} />
                    {lang === 'ar' ? 'تحميل السيرة الذاتية' : 'Download Resume'}
                  </a>
                </div>
                <div className="flex flex-col gap-6">
                   <div className="p-6 glass rounded-3xl border-l-4 border-l-brand-500">
                      <div className="text-4xl font-bold text-white mb-1">90%</div>
                      <div className="text-sm text-slate-400 font-medium uppercase tracking-widest">{lang === 'ar' ? 'زيادة في سرعة العمليات' : 'Process Speed Increase'}</div>
                   </div>
                   <div className="p-6 glass rounded-3xl border-l-4 border-l-cyan-500">
                      <div className="text-4xl font-bold text-white mb-1">70%</div>
                      <div className="text-sm text-slate-400 font-medium uppercase tracking-widest">{lang === 'ar' ? 'تقليل الجهد البشري' : 'Human Effort Reduction'}</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="vision" className="py-24 relative overflow-hidden bg-slate-950/50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-brand-500 font-bold uppercase tracking-[0.2em] mb-4 text-sm">{t.vision.subtitle}</h2>
              <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight">{t.vision.philosophyTitle}</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                {t.vision.philosophyDesc}
              </p>
              <div className="p-6 bg-brand-500/5 rounded-3xl border border-brand-500/10 mb-8">
                <p className="text-brand-200 text-sm italic">
                  {lang === 'ar' 
                    ? '"الذكاء الاصطناعي ليس بديلاً للإنسان، بل هو محرك خارق يحتاج لقائد بشري يمتلك الرؤية والإبداع."' 
                    : '"AI is not a replacement for humans; it is a super-engine that needs a human leader with vision and creativity."'}
                </p>
              </div>
              <button 
                onClick={() => {
                  const msg = lang === 'ar' 
                    ? 'بشمهندس مصطفى، أود استشارتك مجاناً حول إدخال الذكاء الاصطناعي في عملي/دراستي.'
                    : 'Mustafa, I would like a free AI strategy brief for my work/studies.';
                  window.open(`https://wa.me/249124819460?text=${encodeURIComponent(msg)}`);
                }}
                className="group flex items-center gap-4 text-white font-bold hover:text-brand-400 transition-colors"
              >
                <span className="underline underline-offset-8">{t.vision.consultationCta}</span>
                <ArrowRight size={20} className={`transform group-hover:translate-x-2 transition-transform ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-2' : ''}`} />
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
               <div className="glass p-1 rounded-3xl overflow-hidden aspect-video relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-transparent z-10" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <BookOpen size={80} className="text-brand-500/30 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center p-12">
                    <p className="text-slate-500 font-mono text-xs text-center opacity-50">
                      // AI_PHILOSOPHY_MANIFESTO<br/>
                      const education = degree.year === 2022;<br/>
                      const reality = current.year === 2030;<br/>
                      if (education !== reality) {'{'}<br/>
                        &nbsp;&nbsp;await system.adapt();<br/>
                      {'}'}
                    </p>
                  </div>
               </div>
               <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-500/10 blur-3xl rounded-full" />
               <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-cyan-500/10 blur-3xl rounded-full" />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.vision.categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-8 rounded-3xl border-slate-800 hover:border-brand-500/30 transition-all flex flex-col"
              >
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-400 mb-6">
                  {cat.id === 'student' && <Star size={24} />}
                  {cat.id === 'employee' && <Zap size={24} />}
                  {cat.id === 'business' && <Bot size={24} />}
                </div>
                <h4 className="text-xl font-bold mb-4 text-white uppercase">{cat.title}</h4>
                <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">{cat.desc}</p>
                <div className="pt-6 border-t border-white/5">
                  <div className="text-[10px] text-brand-500 uppercase font-black tracking-widest mb-2">{lang === 'ar' ? 'نصيحة الخبير' : 'Expert Advice'}</div>
                  <p className="text-slate-200 text-xs italic">"{cat.advice}"</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Blueprint Lead Magnet CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-1 bg-gradient-to-r from-brand-500/20 via-cyan-500/20 to-brand-500/20 rounded-[2.5rem]"
          >
            <div className="glass p-10 md:p-16 rounded-[2.4rem] text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 blur-[100px] pointer-events-none" />
               <div className="relative z-10 max-w-3xl mx-auto">
                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/10 border border-brand-500/20 rounded-full mb-8 text-brand-400 text-xs font-bold uppercase tracking-widest">
                   <ShieldCheck size={16} />
                   {t.blueprint.disclaimer}
                 </div>
                 <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                   {t.blueprint.title}
                 </h3>
                 <p className="text-slate-400 text-lg mb-12 leading-relaxed">
                   {t.blueprint.description}
                 </p>
                 <button 
                   onClick={generateBlueprintPDF}
                   className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-4 mx-auto"
                 >
                   <FileText size={24} />
                   {t.blueprint.cta}
                 </button>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-tighter leading-none">{t.contact.title}</h2>
              <p className="text-slate-400 text-xl mb-12 max-w-md">
                {lang === 'ar' ? 'جاهز للتحدث حول مشروعك القادم؟ تواصل معي مباشرة عبر حساباتي أو اترك رسالة.' : 'Ready to talk about your next project? Reach out directly or leave a message.'}
              </p>

              <div className="space-y-8">
                 <a href="mailto:MustafaSiddig989@gmail.com" className="flex items-center gap-5 group">
                    <div className="w-14 h-14 glass rounded-full flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all">
                      <Mail size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 uppercase font-bold tracking-widest">Email</div>
                      <div className="text-lg text-white font-medium">MustafaSiddig989@gmail.com</div>
                    </div>
                 </a>
                 <a 
                   href={`https://wa.me/249124819460?text=${encodeURIComponent(lang === 'ar' ? 'مرحباً بشمهندس مصطفى، اطلعت على موقعك وأود التواصل معك بخصوص مشروع لعملي.' : 'Hello Mustafa, I checked your website and I would like to reach out regarding a project for my business.')}`}
                   target="_blank"
                   rel="noreferrer"
                   className="flex items-center gap-5 group"
                 >
                    <div className="w-14 h-14 glass rounded-full flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all">
                      <Phone size={24} />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 uppercase font-bold tracking-widest">WhatsApp</div>
                      <div className="text-lg text-white font-medium">+249 124 819 460</div>
                    </div>
                 </a>
              </div>

              <div className="mt-16">
                 <h4 className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em] mb-6">{t.contact.socials}</h4>
                 <div className="flex gap-4">
                    <a 
                      href="https://www.facebook.com/profile.php?id=100072085056656" 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-brand-600 transition-all text-slate-300 hover:text-white"
                    >
                      <Facebook size={20} />
                    </a>
                    <a 
                      href="https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=mtujobn" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-brand-600 transition-all text-slate-300 hover:text-white"
                    >
                      <Instagram size={20} />
                    </a>
                 </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-[2.5rem] border-slate-800"
            >
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{t.contact.form.name}</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full h-14 glass px-6 rounded-2xl border-slate-700 outline-none focus:border-brand-500 transition-all text-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{t.contact.form.email}</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full h-14 glass px-6 rounded-2xl border-slate-700 outline-none focus:border-brand-500 transition-all text-white" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                    {lang === 'ar' ? 'اختر الخدمات المطلوبة' : 'Select Required Services'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {servicesList.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                          selectedServices.includes(service) 
                            ? 'bg-brand-500 border-brand-500 text-black' 
                            : 'bg-white/5 border-white/10 text-slate-400 hover:border-brand-500'
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
                    {lang === 'ar' ? 'خدمة أخرى (اختياري)' : 'Other Service (Optional)'}
                  </label>
                  <input 
                    type="text" 
                    value={customService}
                    onChange={(e) => setCustomService(e.target.value)}
                    placeholder={lang === 'ar' ? 'مثلاً: تطوير تطبيق موبايل...' : 'e.g. Mobile App Development...'}
                    className="w-full h-14 glass px-6 rounded-2xl border-slate-700 outline-none focus:border-brand-500 transition-all text-white" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{t.contact.form.message}</label>
                  <textarea 
                    rows={4} 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full glass p-6 rounded-2xl border-slate-700 outline-none focus:border-brand-500 transition-all text-white resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-bold text-lg transition-all transform active:scale-95 shadow-xl shadow-brand-900/30"
                >
                  {t.contact.form.send}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900 border-t-slate-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 text-sm font-medium">
            © 2025 Mustafa ElSiddig. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-8 text-slate-500 text-xs font-bold uppercase tracking-widest">
             <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors">{t.nav.services}</button>
             <button onClick={() => scrollTo('portfolio')} className="hover:text-white transition-colors">{t.nav.portfolio}</button>
             <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors">{t.nav.contact}</button>
          </div>
        </div>
      </footer>

      {/* Floating AI Bot Assistant */}
      <div className={`fixed bottom-8 ${lang === 'ar' ? 'left-8' : 'right-8'} z-[200]`}>
         <AnimatePresence>
            {isBotOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className={`absolute bottom-20 ${lang === 'ar' ? 'left-0' : 'right-0'} w-[calc(100vw-2rem)] md:w-[400px] glass rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col`}
                style={{ maxHeight: 'calc(100vh - 160px)' }}
              >
                {/* Header */}
                <div className={`bg-brand-500 p-6 flex justify-between items-center text-black shrink-0 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                   <div className={`flex items-center gap-3 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <Bot size={24} />
                      <span className="font-bold uppercase tracking-widest text-sm">{t.assistant.label}</span>
                   </div>
                   <button onClick={() => setIsBotOpen(false)} className="hover:scale-110 transition-transform"><X size={20} /></button>
                </div>

                <div className="p-6 overflow-y-auto custom-scrollbar">
                   <p className={`text-slate-300 text-sm mb-6 leading-relaxed bg-white/5 p-4 rounded-2xl italic ${lang === 'ar' ? 'text-right' : ''}`}>
                     "{t.assistant.welcome}"
                   </p>

                   {/* Tabs */}
                   <div className={`flex gap-2 mb-6 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                      {(['faq', 'terms', 'process'] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`flex-1 py-2 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all ${activeTab === tab ? 'bg-brand-500 text-black' : 'bg-white/5 text-slate-500'}`}
                        >
                          {t.assistant.categories[tab]}
                        </button>
                      ))}
                   </div>

                   {/* Content */}
                   <div className="space-y-4">
                      {activeTab === 'faq' && t.assistant.faqs.map((item, i) => (
                        <div key={i} className="bg-white/5 p-4 rounded-xl">
                           <div className={`font-bold text-brand-400 text-xs mb-2 ${lang === 'ar' ? 'text-right' : ''}`}>{item.q}</div>
                           <div className={`text-slate-400 text-xs leading-relaxed ${lang === 'ar' ? 'text-right' : ''}`}>{item.a}</div>
                        </div>
                      ))}

                      {activeTab === 'terms' && t.assistant.terms.map((item, i) => (
                        <div key={i} className="border-b border-white/5 pb-4 last:border-0">
                           <div className={`font-bold text-white text-xs mb-1 flex items-center gap-2 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                               <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                               {item.title}
                           </div>
                           <div className={`text-slate-500 text-[11px] leading-relaxed ${lang === 'ar' ? 'text-right' : ''}`}>{item.content}</div>
                        </div>
                      ))}

                      {activeTab === 'process' && (
                        <div className="space-y-6">
                           {t.assistant.process.map((p, i) => (
                             <div key={i} className="flex gap-4">
                                <div className="text-brand-500 font-bold text-lg">0{i+1}</div>
                                <div>
                                   <div className={`text-white font-bold text-xs ${lang === 'ar' ? 'text-right' : ''}`}>{p.step}</div>
                                   <div className={`text-slate-500 text-[11px] ${lang === 'ar' ? 'text-right' : ''}`}>{p.desc}</div>
                                </div>
                             </div>
                           ))}
                        </div>
                      )}
                   </div>
                </div>

                <div className="p-4 bg-white/5 border-t border-white/5">
                   <button 
                    onClick={() => {
                      const msg = lang === 'ar' 
                        ? 'مرحباً بشمهندس مصطفى، أود استشارتك بخصوص حلول الأتمتة والذكاء الاصطناعي لعملي.' 
                        : 'Hello Mustafa, I would like a consultation regarding automation and AI solutions for my business.';
                      window.open(`https://wa.me/249124819460?text=${encodeURIComponent(msg)}`);
                    }}
                    className="w-full py-3 bg-brand-500/10 text-brand-500 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-500 hover:text-black transition-all"
                   >
                     {lang === 'ar' ? 'تحدث مع المهندس مباشرة' : 'Chat with Mustafa Directly'}
                   </button>
                </div>
              </motion.div>
            )}
         </AnimatePresence>

         <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsBotOpen(!isBotOpen)}
            className="w-16 h-16 bg-brand-500 rounded-full shadow-2xl flex items-center justify-center text-black relative"
         >
            <Bot size={32} />
            <motion.div 
               animate={{ scale: [1, 1.2, 1] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-900"
            />
         </motion.button>
      </div>
    </div>
  );
}
