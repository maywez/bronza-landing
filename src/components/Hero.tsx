import { motion } from 'motion/react';
import { Instagram, MapPin, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-height-[100vh] flex flex-col justify-center px-6 overflow-hidden bg-ivory">
      {/* Abstract Glow Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[80%] h-[80%] bg-bronze/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute -bottom-[10%] -left-[5%] w-[60%] h-[60%] bg-champagne/20 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 pt-20">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 text-bronze"
            >
              <div className="w-12 h-[1px] bg-bronze" />
              <span className="font-display uppercase tracking-[0.3em] text-xs font-medium">
                Premium Tanning Studio
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-7xl md:text-9xl font-serif font-light leading-[0.9] tracking-tight"
            >
              Бронза
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-charcoal/60 max-w-md font-light leading-relaxed"
            >
              Эстетика идеального загара в самом сердце города. Современные технологии и премиальный комфорт для вашей уверенности.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-6 pt-4"
            >
              <a 
                href="#booking"
                className="group relative px-10 py-5 bg-charcoal text-white rounded-full font-display uppercase tracking-widest text-xs overflow-hidden transition-all hover:pr-14"
              >
                <span className="relative z-10">Записаться</span>
                <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
              </a>
              
              <div className="flex items-center gap-3 text-charcoal/40 group cursor-pointer">
                <MapPin className="w-4 h-4 transition-colors group-hover:text-bronze" />
                <span className="text-sm font-medium border-b border-charcoal/10 pb-1 transition-colors group-hover:text-charcoal group-hover:border-bronze">
                  Комсомольская, 25
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            className="relative hidden lg:block"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl shadow-bronze/10 border-[12px] border-white relative">
              <img 
                src="https://picsum.photos/seed/bronze-tanning/800/1000" 
                alt="Bronze Studio Aesthetic" 
                className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bronze/20 to-transparent mix-blend-overlay" />
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 glass p-6 rounded-3xl shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bronze-gradient flex items-center justify-center text-white">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-charcoal/40 font-bold">Follow us</div>
                  <div className="text-sm font-display font-medium">@bronza_45</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-bronze to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-charcoal/30 font-bold vertical-text">Scroll</span>
      </motion.div>
    </section>
  );
}
