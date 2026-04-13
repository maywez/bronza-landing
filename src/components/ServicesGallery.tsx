import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Service {
  id: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  features: string[];
}

const services: Service[] = [
  {
    id: 1,
    title: "Вертикальный солярий",
    shortDesc: "Идеально ровный загар за считанные минуты.",
    fullDesc: "Наши вертикальные солярии последнего поколения обеспечивают максимально равномерное распределение лучей. Мощная система вентиляции и аква-бриз делают сеанс максимально комфортным даже в жаркую погоду.",
    image: "https://picsum.photos/seed/vertical-tanning/800/1200",
    features: ["Равномерный загар", "Мощный обдув", "Аква-бриз", "MP3-система"]
  },
  {
    id: 2,
    title: "Горизонтальный солярий",
    shortDesc: "Максимальное расслабление и глубокий оттенок.",
    fullDesc: "Погрузитесь в атмосферу полного релакса. Эргономичное стекло повторяет контуры тела, снимая нагрузку с позвоночника, пока вы получаете глубокий, стойкий загар.",
    image: "https://picsum.photos/seed/horizontal-tanning/800/1200",
    features: ["Эргономичный дизайн", "Ароматерапия", "Защита лица", "Режим релаксации"]
  },
  {
    id: 3,
    title: "Коллагенарий",
    shortDesc: "Омоложение кожи во время сеанса загара.",
    fullDesc: "Уникальная технология красного света стимулирует выработку собственного коллагена. Кожа становится более упругой, увлажненной и сияющей, а загар ложится мягче.",
    image: "https://picsum.photos/seed/collagen/800/1200",
    features: ["Anti-age эффект", "Увлажнение", "Ровный тон", "Стимуляция коллагена"]
  },
  {
    id: 4,
    title: "Косметика для загара",
    shortDesc: "Премиальный уход и усиление пигмента.",
    fullDesc: "Мы подобрали лучшие линейки профессиональной косметики, которые не только ускоряют появление загара, но и глубоко питают кожу, продлевая стойкость оттенка.",
    image: "https://picsum.photos/seed/tanning-cream/800/1200",
    features: ["Ускорители загара", "Бронзаторы", "Увлажнение 24ч", "Витаминные комплексы"]
  }
];

export default function ServicesGallery() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section className="py-24 px-6 bg-ivory">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-bronze font-display uppercase tracking-[0.2em] text-xs mb-4 block"
            >
              Наши услуги
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif font-light"
            >
              Искусство <span className="italic">безупречного</span> оттенка
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-charcoal/40 text-sm max-w-xs font-display uppercase tracking-widest leading-relaxed"
          >
            Мы используем только сертифицированное оборудование и премиальные материалы.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              layoutId={`card-${service.id}`}
              onClick={() => setSelectedService(service)}
              className="group relative aspect-[3/4] rounded-[32px] overflow-hidden cursor-pointer bg-sand"
            >
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white text-2xl font-serif mb-2">{service.title}</h3>
                <p className="text-white/60 text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                  {service.shortDesc}
                </p>
                <div className="mt-4 flex items-center gap-2 text-bronze text-xs font-display uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  Подробнее <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-6 py-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-charcoal/90 backdrop-blur-sm"
            />
            
            <motion.div 
              layoutId={`card-${selectedService.id}`}
              className="relative w-full max-w-4xl bg-ivory rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-charcoal hover:bg-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-bronze font-display uppercase tracking-[0.2em] text-[10px] mb-4 block font-bold">
                    Детали услуги
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif mb-6">{selectedService.title}</h3>
                  <p className="text-charcoal/60 leading-relaxed mb-8 font-light">
                    {selectedService.fullDesc}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-10">
                    {selectedService.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-charcoal/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-bronze" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedService(null);
                      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-5 bg-charcoal text-white rounded-2xl font-display uppercase tracking-widest text-xs hover:bg-bronze transition-colors duration-500"
                  >
                    Записаться на сеанс
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
