import type { Metadata, Viewport } from "next";
import "/public/styles/main.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Permet un zoom jusqu'à 5x pour l'accessibilité
  themeColor: '#581c87',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://tanguy-gibrat.fr'),
  title: {
    default: "Tanguy Gibrat | Développeur web & Consultant",
    template: '%s | Tanguy Gibrat'
  },
  description: "Étudiant développeur Full Stack à la Web@cadémie by Epitech et consultant en alternance. Spécialisé en développement web, SaaS et automatisation.",
  keywords: [
    "développeur full stack",
    "consultant développement web",
    "front-end",
    "back-end",
    "React",
    "Next.js",
    "Angular",
    "TypeScript",
    "Laravel",
    "Spring Boot",
    "Java",
    "Node.js",
    "applications SaaS",
    "automatisation",
    "IA générative",
    "solutions business",
    "développeur Marseille",
    "étudiant Epitech",
    "Web@cadémie",
    "portfolio développeur"
  ],
  authors: [{ name: "Tanguy Gibrat", url: "https://tanguy-gibrat.fr" }],
  creator: "Tanguy Gibrat",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: 'technology',
  
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://tanguy-gibrat.fr',
    title: 'Tanguy Gibrat | Développeur Full Stack & Consultant',
    description: 'Étudiant à la Web@cadémie by Epitech et consultant développeur en alternance. Spécialisé en développement web, SaaS et automatisation.',
    siteName: 'Portfolio de Tanguy Gibrat',
    images: [{
      url: '/images/tg-linkedin.webp',
      width: 1200,
      height: 630,
      alt: 'Tanguy Gibrat - Portfolio de développeur web'
    }],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Tanguy Gibrat | Développeur Full Stack & Consultant',
    description: 'Étudiant à la Web@cadémie by Epitech et consultant développeur en alternance. Spécialités : web, SaaS, automatisation.',
    creator: '@tanguy-gibrat',
    images: ['/images/tg-linkedin.webp'],
  },

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180' }
    ],
    shortcut: [{ url: '/favicon.ico' }]
  },
  manifest: '/manifest.json',
  
  alternates: {
    canonical: 'https://tanguy-gibrat.fr',
    languages: {
      'fr-FR': 'https://tanguy-gibrat.fr'
    }
  },
  
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" dir="ltr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#581c87" />
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Tanguy Gibrat",
              "url": "https://tanguy-gibrat.fr",
              "image": "https://tanguy-gibrat.fr/images/tg-linkedin.webp",
              "description": "Étudiant développeur Full Stack à la Web@cadémie by Epitech et consultant en alternance",
              "jobTitle": "Développeur Full Stack & Consultant",
              "worksFor": {
                "@type": "Organization",
                "name": "JLC Consulting"
              },
              "alumniOf": {
                "@type": "Organization",
                "name": "Web@cadémie by Epitech Marseille"
              },
              "knowsAbout": [
                "Développement Web Full Stack",
                "React et Next.js",
                "Angular et TypeScript",
                "Laravel et Spring Boot",
                "Applications SaaS",
                "IA Générative",
                "Automatisation"
              ],
              "sameAs": [
                "https://github.com/twnguydev",
                "https://linkedin.com/in/tanguy-gibrat"
              ]
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "item": {
                    "@type": "Course",
                    "name": "Développement Web Frontend",
                    "description": "React, Next.js, Angular, TypeScript",
                    "provider": {
                      "@type": "Organization",
                      "name": "Web@cadémie by Epitech"
                    }
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "item": {
                    "@type": "Course",
                    "name": "Développement Web Backend",
                    "description": "Laravel, Spring Boot, Node.js, APIs RESTful",
                    "provider": {
                      "@type": "Organization",
                      "name": "Web@cadémie by Epitech"
                    }
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "item": {
                    "@type": "Course",
                    "name": "DevOps",
                    "description": "Docker, CI/CD, Git",
                    "provider": {
                      "@type": "Organization",
                      "name": "Web@cadémie by Epitech"
                    }
                  }
                }
              ]
            })
          }}
        />
        
        {/* ProjectsStructuredData */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "item": {
                    "@type": "SoftwareApplication",
                    "name": "Modernisation ERP",
                    "applicationCategory": "BusinessApplication",
                    "operatingSystem": "Web",
                    "description": "Migration d'une architecture monolithique vers Laravel API / Angular avec Docker et CI/CD"
                  }
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "item": {
                    "@type": "SoftwareApplication",
                    "name": "SaaS Workflow Optimizer",
                    "applicationCategory": "BusinessApplication",
                    "operatingSystem": "Web",
                    "description": "Plateforme de simulation et d'optimisation de workflows business"
                  }
                },
              ]
            })
          }}
        />
        
        {children}
      </body>
    </html>
  );
}