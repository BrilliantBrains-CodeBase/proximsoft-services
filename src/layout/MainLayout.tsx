import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import { siteConfig } from '@/lib/content'
import { buildSchema } from '@/lib/schema'
import MetaPixel from '@/components/analytics/MetaPixel'
import ClarityInit from '@/components/analytics/ClarityInit'

export default function MainLayout() {
  const schema = buildSchema({
    type: siteConfig.schema.type,
    name: siteConfig.name,
    description: siteConfig.meta.description,
    url: siteConfig.meta.canonicalUrl,
    phone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: siteConfig.contact.address,
    openingHours: siteConfig.contact.openingHours,
  })

  return (
    <>
      <Helmet>
        <title>{siteConfig.meta.title}</title>
        <meta name="description" content={siteConfig.meta.description} />
        <link rel="canonical" href={siteConfig.meta.canonicalUrl} />
        <script type="application/ld+json">{schema}</script>
        {import.meta.env.VITE_GTM_ID && (
          <script>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${import.meta.env.VITE_GTM_ID}');`}</script>
        )}
      </Helmet>

      {/* Analytics — only mount when IDs are set */}
      {import.meta.env.VITE_FACEBOOK_PIXEL_ID && (
        <MetaPixel pixelId={import.meta.env.VITE_FACEBOOK_PIXEL_ID} />
      )}
      {import.meta.env.VITE_CLARITY_PROJECT_ID && (
        <ClarityInit projectId={import.meta.env.VITE_CLARITY_PROJECT_ID} />
      )}

      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
