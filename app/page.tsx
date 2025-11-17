import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import MostBooked from '@/components/MostBooked'
import AdBanner from '@/components/AdBanner'
import AllServices from '@/components/AllServices'
import Services from '@/components/Services'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import Stats from '@/components/Stats'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <AdBanner />
      <MostBooked />
      <AllServices />
      {/* <Features />
      <HowItWorks />
      <Stats /> */}
      {/* <Services /> */}
      {/* <Testimonials /> */}
      <Footer />
    </main>
  )
}

