/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
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
  BookOpen
} from 'lucide-react';

// --- Types ---
type Language = 'ar' | 'en';

interface Translation {
  nav: {
    home: string;
    services: string;
    portfolio: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
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
    nav: { home: 'Home', services: 'Services', portfolio: 'Portfolio', contact: 'Contact' },
    hero: {
      title: 'Mustafa ElSiddig',
      subtitle: 'Intelligent Systems Architect',
      description: 'Solution Engineer specializing in analyzing operational gaps and designing intelligent systems that combine the power of Google Cloud, RPA automation, and Large Language Models (LLMs).',
      ctaPrimary: 'Get in Touch',
      ctaSecondary: 'View Projects'
    },
    services: {
      title: 'Expert Solutions',
      items: [
        {
          title: 'Workflow Automation',
          description: 'Design seamless workflows that require zero human intervention.',
          features: [
            'Sales & Invoicing Automation',
            'Google Apps Script Integration',
            'Automated Reporting Systems',
            'Cloud-based Paperless Migration'
          ]
        },
        {
          title: 'AI Digital Agents',
          description: 'Building AI systems that work as intelligent employees within your organization.',
          features: [
            'Context-aware Smart Bots',
            'Automated Customer Engagement',
            'Decision-making AI Systems',
            'Custom Knowledge Base Integration'
          ]
        },
        {
          title: 'Systems Evolution',
          description: 'Transform traditional legacy systems into modern intelligent infrastructures.',
          features: [
            '70% Human Effort Reduction',
            'Process Re-engineering',
            'Data Accuracy Optimization',
            'Scalable Modern Architectures'
          ]
        },
        {
          title: 'Data Engineering',
          description: 'Transforming raw data into strategic insights through advanced scripting.',
          features: [
            'Big Data Processing Scripts',
            'Automated Data Classification',
            'Strategic Insight Generation',
            'Advanced Data Cleaning'
          ]
        },
        {
          title: 'SEO & Performance Web',
          description: 'Building professional web interfaces optimized for search engines and performance.',
          features: [
            'High-Performance Web Apps',
            'SEO-First Architecture',
            'Professional Brand Display',
            'Lightning Fast Load Times'
          ]
        }
      ]
    },
    portfolio: {
      title: 'Project Showcases',
      viewImage: 'View Full Result'
    },
    assistant: {
      label: 'Business Consultant',
      welcome: 'Hello! I am here to show you how intelligent systems can scale your business. What are you looking to achieve?',
      categories: {
        faq: 'Values',
        terms: 'Success Basis',
        process: 'How we start'
      },
      faqs: [
        { q: 'How will this save me money?', a: 'By handling repetitive tasks (like invoicing, follow-ups, and data entry) automatically. This lets you grow without hiring more staff.' },
        { q: 'Is it complicated for my team?', a: 'Not at all. We design everything to work in the background. If your team can use WhatsApp or Email, they can use our systems.' },
        { q: 'Will it stop working or break?', a: 'We build reliable systems on Google’s infrastructure. Plus, we monitor the performance for you to ensure everything stays smooth.' }
      ],
      terms: [
        { title: 'Your Privacy', content: 'Your business data and client information are strictly yours. We never share or use your data for anything else.' },
        { title: 'Quality Guarantee', content: 'We don’t just deliver code; we deliver results. We stay with you until the system works exactly as we planned.' },
        { title: 'Growth Mindset', content: 'As your business grows, our systems grow with you. Everything we build is flexible for the future.' }
      ],
      process: [
        { step: 'Discovery', desc: 'We find the "silent" tasks that are stealing your time.' },
        { step: 'Build', desc: 'We create the smart helper that will handle those tasks for you.' },
        { step: 'Growth', desc: 'You focus on expansion while the system handles the details.' }
      ]
    },
    contact: {
      title: 'Start a Project',
      form: {
        name: 'Full Name',
        email: 'Email Address',
        message: 'Project Details',
        send: 'Send Message'
      },
      socials: 'Connect with me'
    }
  },
  ar: {
    nav: { home: 'الرئيسية', services: 'الخدمات', portfolio: 'الأعمال', contact: 'تواصل معي' },
    hero: {
      title: 'مصطفى صديق',
      subtitle: 'مهندس أنظمة ذكية',
      description: 'مهندس حلول متخصص في تحليل الفجوات التشغيلية وتصميم أنظمة ذكية تجمع بين قوة الـ Google Cloud وأتمتة العمليات (RPA) وذكاء النماذج اللغوية (LLMs).',
      ctaPrimary: 'ابدأ مشروعك',
      ctaSecondary: 'عرض المشاريع'
    },
    services: {
      title: 'حلول احترافية',
      items: [
        {
          title: 'هندسة الأتمتة المكتبية',
          description: 'تصميم مسارات عمل لا تتطلب تدخلًا بشريًا.',
          features: [
            'أتمتة المبيعات والفواتير',
            'ربط Google Apps Script',
            'نظم التقارير التلقائية',
            'التحول السحابي الكامل'
          ]
        },
        {
          title: 'تطوير الموظف الرقمي',
          description: 'بناء أنظمة ذكاء اصطناعي تعمل كموظف ذكي داخل مؤسستك.',
          features: [
            'بوتات ذكية تفهم السياق',
            'الرد الآلي على العملاء',
            'اتخاذ القرارات بالذكاء الاصطناعي',
            'ربط قواعد البيانات الخاصة'
          ]
        },
        {
          title: 'التحول الرقمي وتطوير الأنظمة',
          description: 'تحديث الأنظمة التقليدية المتهالكة إلى أنظمة ذكية حديثة.',
          features: [
            'تقليل الجهد البشري بنسبة 70%',
            'إعادة هندسة العمليات',
            'زيادة دقة البيانات',
            'هياكل حديثة قابلة للتوسع'
          ]
        },
        {
          title: 'هندسة البيانات',
          description: 'تحويل البيانات الخام إلى رؤى استراتيجية عبر سكربتات متقدمة.',
          features: [
            'سكربتات معالجة البيانات الضخمة',
            'تصنيف البيانات آلياً',
            'خلق رؤى استراتيجية للقرار',
            'تنظيف ومعالجة البيانات'
          ]
        },
        {
          title: 'الحلول الويب المهيأة',
          description: 'بناء واجهات عرض احترافية تضمن ظهورك في محركات البحث بآداء عالي.',
          features: [
            'تطبيقات ويب فائقة السرعة',
            'بنية صديقة لمحركات البحث',
            'عرض احترافي للهوية',
            'سرعة تحميل استثنائية'
          ]
        }
      ]
    },
    portfolio: {
      title: 'كتالوج المشاريع',
      viewImage: 'مشاهدة النتيجة الكاملة'
    },
    assistant: {
      label: 'مستشار الأعمال',
      welcome: 'مرحباً! أنا هنا لأوضح لك كيف يمكن للأنظمة الذكية أن تضاعف حجم عملك. ما هو الهدف الذي تسعى لتحقيقه؟',
      categories: {
        faq: 'الفوائد',
        terms: 'أساس النجاح',
        process: 'كيف نبدأ؟'
      },
      faqs: [
        { q: 'كيف سيوفر لي هذا المال؟', a: 'من خلال تولي المهام المتكررة (مثل الفواتير، المتابعات، وإدخال البيانات) تلقائياً. هذا يتيح لك التوسع دون الحاجة لتوظيف عمالة إضافية.' },
        { q: 'هل النظام معقد على موظفي؟', a: 'أبداً. نصمم كل شيء ليعمل في الخلفية. إذا كان فريقك يجيد استخدام الواتساب أو الإيميل، فهم جاهزون لاستخدام أنظمتنا.' },
        { q: 'هل سيتوقف النظام فجأة؟', a: 'نحن نبني أنظمة موثوقة على بنية جوجل الأساسية، كما نقوم بمراقبة الأداء نيابة عنك لضمان بقاء كل شيء يعمل بسلاسة.' }
      ],
      terms: [
        { title: 'خصوصية بياناتك', content: 'بيانات عملك ومعلومات عملائك ملك لك وحدك. نحن نلتزم بعدم مشاركتها أو استخدامها لأي غرض آخر.' },
        { title: 'ضمان الجودة', content: 'نحن لا نسلم مجرد أكواد، بل نسلم نتائج. نبقى معك حتى يعمل النظام تماماً كما خططنا له في البداية.' },
        { title: 'المرونة في التوسع', content: 'مع نمو عملك، ستنمو أنظمتنا معك. كل ما نبنيه مصمم ليكون مرناً وقابلاً للتطوير في المستقبل.' }
      ],
      process: [
        { step: 'الاستكشاف', desc: 'نحدد المهام "الصامتة" التي تسرق وقتك وجهدك حالياً.' },
        { step: 'البناء', desc: 'نصمم المساعد الذكي الذي سيتولى تلك المهام بدلاً منك.' },
        { step: 'الانطلاق', desc: 'أنت تركز على التوسع، والنظام يتولى التفاصيل الروتينية.' }
      ]
    },
    contact: {
      title: 'ابدأ مشروعك الآن',
      form: {
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        message: 'تفاصيل المشروع',
        send: 'إرسال الرسالة'
      },
      socials: 'تواصل اجتماعي'
    }
  }
};

const portfolioItems = [
  { id: 1, url: '/project1.png', title: 'BrandAI: Data & Analytics Ecosystem', tag: 'Full Integration' },
  { id: 2, url: '/project2.jpg', title: 'AI Digital Employee (Flex-AI)', tag: 'AI Agent' },
  { id: 3, url: '/project3.jpg', title: 'Operational Bleed Analysis Tool', tag: 'Automation' },
  { id: 4, url: '/project4.jpg', title: 'Flex-AI PRO Systems', tag: 'Systems Evolution' },
  { id: 5, url: '/project5.png', title: 'Custom AI Terminal & Scripting', tag: 'Data Engineering' }
];

// --- Components ---

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [isBotOpen, setIsBotOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'faq' | 'terms' | 'process'>('faq');

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
                onClick={() => scrollTo(key === 'home' ? 'home' : key)}
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
                onClick={() => scrollTo(key === 'home' ? 'home' : key)}
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
            <div className="inline-block px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-sm font-bold mb-6 tracking-wide uppercase">
              {t.hero.subtitle}
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
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
                  <h3 className="text-3xl font-bold mb-6 text-white uppercase">{lang === 'ar' ? 'مهندس حلول بخلفية استشارية' : 'Solution Engineer with Consultancy Background'}</h3>
                  <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    {lang === 'ar' 
                      ? 'ما يميزني هو القدرة على فهم "سياق العمل" قبل كتابة سطر كود واحد. أقوم بتحليل المشكلات التشغيلية وابتكار حلول برمجية مخصصة تجعل الأنظمة تعمل من أجلك، وليس العكس.' 
                      : 'What sets me apart is the ability to understand "business context" before writing a single line of code. I analyze operational issues and innovate custom software solutions that make systems work for you, not the other way around.'}
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
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{t.contact.form.name}</label>
                  <input type="text" className="w-full h-14 glass px-6 rounded-2xl border-slate-700 outline-none focus:border-brand-500 transition-all text-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{t.contact.form.email}</label>
                  <input type="email" className="w-full h-14 glass px-6 rounded-2xl border-slate-700 outline-none focus:border-brand-500 transition-all text-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{t.contact.form.message}</label>
                  <textarea rows={4} className="w-full glass p-6 rounded-2xl border-slate-700 outline-none focus:border-brand-500 transition-all text-white resize-none"></textarea>
                </div>
                <button className="w-full py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-bold text-lg transition-all transform active:scale-95 shadow-xl shadow-brand-900/30">
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
