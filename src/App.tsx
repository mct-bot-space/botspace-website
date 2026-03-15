import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Benefits from './components/Benefits'
import DemoChat from './components/DemoChat'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <DemoChat />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}

export default App
