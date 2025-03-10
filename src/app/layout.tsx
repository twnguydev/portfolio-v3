import type { Metadata, Viewport } from "next";
import "/public/styles/main.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#581c87',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://tanguygibrat.fr'),
  title: {
    default: "Tanguy Gibrat - Explorateur Tech",
    template: '%s | Tanguy Gibrat'
  },
  description: "Étudiant passionné par le développement web. Je crée des solutions web innovantes et performantes.",
  keywords: [
    "développeur full stack",
    "web development",
    "react",
    "angular",
    "java",
    "node.js",
    "blockchain",
    "business document",
    "web design",
    "devops",
    "IA",
    "développeur marseille",
    "developpeur web",
    "agence de développement",
    "étudiant développeur",
    "epitech"
  ],
  authors: [{ name: "Tanguy Gibrat" }],
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
    url: 'https://tanguygibrat.fr',
    title: 'Tanguy Gibrat - Développeur web & Explorateur Tech',
    description: 'Créateur d\'expériences web performantes et innovantes. Passionné par le développement, l\'IA et la blockchain.',
    siteName: 'Tanguy Gibrat',
    images: [{
      url: '/og.png',
      width: 1200,
      height: 630,
      alt: 'Tanguy Gibrat - Portfolio'
    }],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Tanguy Gibrat - Développeur & Tech Explorer',
    description: 'Full Stack, IA, Blockchain - Créateur d\'expériences web',
    creator: '@tanguygibrat',
    images: ['/og.png'],
  },

  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/manifest.json',
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
              "url": "https://tanguy-gibrat.dev",
              "image": "/og.png",
              "description": "Étudiant développeur Full Stack à Epitech Marseille",
              "jobTitle": "Développeur Full Stack",
              "worksFor": {
                "@type": "Organization",
                "name": "Epitech"
              },
              "alumniOf": {
                "@type": "Organization",
                "name": "Epitech"
              },
              "knowsAbout": [
                "Web Development",
                "React",
                "Node.js",
                "Artificial Intelligence",
                "Blockchain"
              ],
              "sameAs": [
                "https://github.com/twnguydev",
                "https://linkedin.com/in/tanguy-gibrat"
              ]
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}