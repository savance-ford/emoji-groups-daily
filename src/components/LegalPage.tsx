import { AlertTriangle, ArrowLeft, FileText, Lock } from 'lucide-react';
import { SITE_CONFIG } from '../config';

export type LegalPageType = 'privacy' | 'terms' | 'disclaimer';

interface LegalPageProps {
  page: LegalPageType;
  onBackHome: () => void;
}

interface Section {
  title: string;
  body: string[];
}

interface LegalContent {
  icon: typeof Lock;
  eyebrow: string;
  title: string;
  intro: string;
  sections: Section[];
}

const emailLink = `mailto:${SITE_CONFIG.contactEmail}`;

const legalContent: Record<LegalPageType, LegalContent> = {
  privacy: {
    icon: Lock,
    eyebrow: 'Privacy Policy',
    title: 'Privacy Policy',
    intro:
      `This Privacy Policy explains how ${SITE_CONFIG.siteName} collects, uses, and protects information when you play our emoji puzzle game or visit our website.`,
    sections: [
      {
        title: 'Information We Collect',
        body: [
          'We do not require you to create an account to play the game.',
          'The game may store basic gameplay information on your device, such as your puzzle progress, completed daily puzzles, streaks, and stats. This is usually stored with browser storage such as localStorage so the game can remember your progress.',
          'If analytics, ads, or performance tools are enabled, those third-party services may collect information such as device type, browser type, approximate location, pages viewed, gameplay interactions, referral source, and other usage data.',
        ],
      },
      {
        title: 'How We Use Information',
        body: [
          'We use locally stored gameplay data to save your progress, show stats, maintain streaks, and improve the game experience.',
          'We may use aggregated analytics to understand how visitors use the site, fix bugs, improve performance, and decide which features or puzzles to build next.',
          'We do not sell personal information directly to other companies.',
        ],
      },
      {
        title: 'Cookies, Local Storage, and Similar Technologies',
        body: [
          'The site may use cookies, localStorage, or similar browser technologies to remember game progress, measure site usage, support ads, and improve the overall experience.',
          'You can usually disable cookies or clear local storage through your browser settings. Some features, such as saved stats or streaks, may not work correctly if storage is disabled or cleared.',
        ],
      },
      {
        title: 'Advertising and Third-Party Services',
        body: [
          'We may display ads through third-party advertising partners, including services such as Google AdSense. These partners may use cookies or similar technologies to serve ads, measure ad performance, limit how often ads appear, and personalize ads where allowed.',
          'Third-party services operate under their own privacy policies. We do not control how those services collect or use information once their tools are loaded on the site.',
          'If we use analytics tools, advertising tools, or embedded content in the future, those services may receive information about your browser, device, and interaction with the site.',
        ],
      },
      {
        title: 'Children’s Privacy',
        body: [
          'This site is designed as a general-audience puzzle game and is not intended to knowingly collect personal information from children under 13.',
          'If you believe a child has provided personal information through the site, please contact us and we will take reasonable steps to remove it.',
        ],
      },
      {
        title: 'Data Security',
        body: [
          'We use reasonable efforts to protect the site and reduce security risks, but no website or internet transmission is completely secure.',
          'Because most gameplay data is stored in your own browser, clearing your browser data may permanently remove your local stats and progress.',
        ],
      },
      {
        title: 'Your Choices',
        body: [
          'You can clear your browser cookies and localStorage to remove locally saved game data.',
          'You can use browser or device settings to limit cookies, tracking, and personalized advertising where available.',
          `For privacy questions, contact us at ${SITE_CONFIG.contactEmail}.`,
        ],
      },
      {
        title: 'Changes to This Policy',
        body: [
          'We may update this Privacy Policy from time to time. When we do, we will update the “Last updated” date on this page.',
        ],
      },
    ],
  },
  terms: {
    icon: FileText,
    eyebrow: 'Terms of Use',
    title: 'Terms of Use',
    intro:
      `These Terms of Use explain the rules for using ${SITE_CONFIG.siteName}. By accessing or using the site, you agree to these terms.`,
    sections: [
      {
        title: 'Use of the Site',
        body: [
          'You may use the site for personal, non-commercial entertainment purposes.',
          'You agree not to misuse the site, interfere with its operation, attempt to access systems without permission, or use automated tools in a way that harms site performance or other users.',
        ],
      },
      {
        title: 'Game Content and Availability',
        body: [
          'We may add, remove, edit, or rotate puzzles, features, pages, and game modes at any time.',
          'We try to keep the site available and working correctly, but we do not guarantee uninterrupted access, error-free gameplay, or that puzzle data will always be available.',
        ],
      },
      {
        title: 'Intellectual Property',
        body: [
          `The ${SITE_CONFIG.siteName} name, site design, game layout, original puzzle categories, explanations, text, and related content are owned by us or licensed to us unless otherwise noted.`,
          'Emoji characters may be rendered by your operating system, browser, or third-party emoji providers and may be subject to their own rights and licenses.',
          'You may not copy, reproduce, resell, or redistribute substantial parts of the site or puzzle collection without permission.',
        ],
      },
      {
        title: 'User Conduct',
        body: [
          'You agree not to use the site for unlawful activity, abuse, harassment, spam, scraping that harms the site, or attempts to bypass technical protections.',
          'You agree not to upload, transmit, or introduce malware, harmful code, or anything that could damage the site or other users’ devices.',
        ],
      },
      {
        title: 'Ads and Third-Party Links',
        body: [
          'The site may show ads or link to third-party websites, products, or services. Third-party content is provided by those third parties, not by us.',
          'We are not responsible for third-party websites, policies, content, products, or services. Visiting or using third-party links is at your own discretion.',
        ],
      },
      {
        title: 'No Warranties',
        body: [
          'The site is provided “as is” and “as available” without warranties of any kind, whether express or implied.',
          'We do not guarantee that the site will meet your expectations, be available at all times, or be free from errors, bugs, or security issues.',
        ],
      },
      {
        title: 'Limitation of Liability',
        body: [
          'To the fullest extent allowed by law, we will not be liable for indirect, incidental, special, consequential, or punitive damages related to your use of the site.',
          'Your sole remedy for dissatisfaction with the site is to stop using it.',
        ],
      },
      {
        title: 'Changes to These Terms',
        body: [
          'We may update these Terms of Use from time to time. Continued use of the site after changes are posted means you accept the updated terms.',
          `Questions about these terms can be sent to ${SITE_CONFIG.contactEmail}.`,
        ],
      },
    ],
  },
  disclaimer: {
    icon: AlertTriangle,
    eyebrow: 'Disclaimer',
    title: 'Disclaimer',
    intro:
      `${SITE_CONFIG.siteName} is a casual puzzle and entertainment website. This disclaimer explains important limits about the game, content, and third-party services.`,
    sections: [
      {
        title: 'Entertainment Only',
        body: [
          'The puzzles, categories, hints, explanations, scores, and stats on this site are provided for entertainment purposes only.',
          'Nothing on the site should be treated as professional, legal, financial, medical, educational, or other formal advice.',
        ],
      },
      {
        title: 'Puzzle Accuracy',
        body: [
          'We try to make puzzles fair, understandable, and fun, but category groupings can be subjective and may contain mistakes, ambiguities, or interpretations that not every player agrees with.',
          'We may update or correct puzzles at any time without notice.',
        ],
      },
      {
        title: 'No Affiliation',
        body: [
          `${SITE_CONFIG.siteName} is an independent emoji grouping puzzle game. Unless clearly stated otherwise, it is not affiliated with, endorsed by, sponsored by, or officially connected to any newspaper, publisher, app store, emoji platform, social media platform, or other game brand.`,
          'Any third-party names, marks, or references belong to their respective owners and are used only for identification, compatibility, or descriptive purposes where applicable.',
        ],
      },
      {
        title: 'Stats and Saved Progress',
        body: [
          'Stats, streaks, completed puzzles, and progress are generally saved in your browser. They may reset if you clear your browser data, switch devices, use private browsing, or if browser storage becomes unavailable.',
          'We do not guarantee that stats, streaks, or saved progress will always be preserved.',
        ],
      },
      {
        title: 'Advertising and External Content',
        body: [
          'Ads, sponsored content, affiliate links, or external links may appear on the site. We may earn revenue if you view, click, or interact with some third-party content.',
          'We are not responsible for the accuracy, availability, safety, claims, pricing, or policies of third-party websites, ads, or services.',
        ],
      },
      {
        title: 'Use at Your Own Risk',
        body: [
          'You use the site at your own risk. We are not responsible for losses, damages, device issues, data loss, or other problems that may result from using the site or interacting with third-party services.',
          `For questions about this disclaimer, contact ${SITE_CONFIG.contactEmail}.`,
        ],
      },
    ],
  },
};

const LegalPage = ({ page, onBackHome }: LegalPageProps) => {
  const content = legalContent[page];
  const Icon = content.icon;

  return (
    <main id="main-content" className="flex-1 w-full px-4 py-8">
      <article className="max-w-3xl mx-auto">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-teal-300 transition-colors mb-6"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to puzzle
        </button>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl shadow-slate-950/30 overflow-hidden">
          <header className="px-5 py-6 sm:px-8 sm:py-8 border-b border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 text-xs font-bold uppercase tracking-wide mb-4">
              <Icon size={14} aria-hidden="true" />
              {content.eyebrow}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {content.title}
            </h1>
            <p className="text-slate-400 text-sm mt-3">
              Last updated: {SITE_CONFIG.lastUpdated}
            </p>
            <p className="text-slate-300 leading-relaxed mt-5 max-w-2xl">
              {content.intro}
            </p>
          </header>

          <div className="px-5 py-6 sm:px-8 sm:py-8 space-y-7">
            {/* <div className="flex gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
              <Info className="shrink-0 mt-0.5" size={18} aria-hidden="true" />
              <p>
                This page is a general template for a casual puzzle website and
                is not legal advice. Review it before launch and update the
                contact email, domain, ad tools, analytics tools, and business
                details to match your actual setup.
              </p>
            </div> */}

            {content.sections.map((section) => (
              <section key={section.title} className="space-y-3">
                <h2 className="text-xl font-extrabold text-white">
                  {section.title}
                </h2>
                <div className="space-y-3 text-slate-300 leading-relaxed">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

            <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <h2 className="text-lg font-extrabold text-white mb-2">
                Contact
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Questions about this page can be sent to{' '}
                <a
                  href={emailLink}
                  className="text-teal-300 hover:text-teal-200 font-semibold underline underline-offset-4"
                >
                  {SITE_CONFIG.contactEmail}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
};

export default LegalPage;
