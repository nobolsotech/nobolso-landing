import "./globals.css"
import Navbar from '../components/Navbar/Navbar.jsx'
import Hero from '@/components/Hero/Hero.jsx'
import Benefits from '@/components/Benefits/Benefits.jsx'
import Services from '@/components/Services/Services.jsx'
import Differentials from "@/components/Differentials/Differentials"
import Forms from "@/components/Forms/Forms"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <div className='container-page'>
        <Benefits />
      </div>
      <div className='container-page'>
        <Services />
      </div>
      <div className='container-page'>
        <Differentials />
      </div>
      <div className='container-page'>
        <Forms />
      </div>
    </main>
  )
}
