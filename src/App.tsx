import { motion, useScroll, useSpring } from 'motion/react';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import About from './components/About';
import ServicesGallery from './components/ServicesGallery';
import Testimonials from './components/Testimonials';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';
import { Instagram, Phone } from 'lucide-react';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-bronze z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 px-4 py-5 md:px-6 md:py-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-3">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pointer-events-auto"
          >
            <span className="text-xl md:text-2xl font-serif italic tracking-tight text-charcoal">Бронза</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="hidden md:flex items-center gap-8 pointer-events-auto"
          >
            <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-bold text-charcoal/40">
              <a href="#services" className="hover:text-bronze transition-colors">Услуги</a>
              <a href="#booking" className="hover:text-bronze transition-colors">Запись</a>
              <a href="https://vk.ru/club237108041" className="hover:text-bronze transition-colors">VK</a>
              <a href="https://www.instagram.com/bronza_45" className="hover:text-bronze transition-colors">Instagram</a>
            </div>
            <div className="w-[1px] h-4 bg-charcoal/10" />
            <a 
              href="tel:89195900080" 
              className="flex items-center gap-2 text-sm font-display font-medium text-charcoal hover:text-bronze transition-colors"
            >
              <Phone className="w-4 h-4" />
              8 919 590 00 80
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:hidden pointer-events-auto"
          >
            <a href="tel:89195900080" className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-charcoal/5">
              <Phone className="w-5 h-5 text-bronze" />
            </a>
          </motion.div>
        </div>
      </nav>

      <main>
        <Hero />
        <About />
        <div id="services">
          <ServicesGallery />
        </div>
        <Benefits />
        <Testimonials />
        <BookingSection />
      </main>

      <Footer />
    </div>
  );
}
