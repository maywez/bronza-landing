import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const testimonials = [
  {
    id: 1,
    name: "Анна Смирнова",
    role: "Постоянный клиент",
    text: "Лучшая студия в городе! Всегда чисто, администраторы очень приветливые. Лампы новые, загар ложится идеально ровно. Очень нравится атмосфера и музыка.",
    rating: 5,
    image: "https://picsum.photos/seed/user1/200/200"
  },
  {
    id: 2,
    name: "Мария Волкова",
    role: "Клиент студии",
    text: "Прихожу сюда за порцией витамина D и отличным настроением. Коллагенарий — это просто находка, кожа после него такая нежная. Рекомендую всем подругам!",
    rating: 5,
    image: "https://picsum.photos/seed/user2/200/200"
  },
  {
    id: 3,
    name: "Елена Кузнецова",
    role: "Любитель загара",
    text: "Очень удобная онлайн-запись, никогда не приходится ждать. Студия стильная, современная. Косметика для загара всегда в наличии, помогают подобрать под тип кожи.",
    rating: 5,
    image: "https://picsum.photos/seed/user3/200/200"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[400px_1fr] gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-bronze font-display uppercase tracking-[0.2em] text-xs font-bold mb-4 block">
                Отзывы
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-light leading-tight mb-6">
                Что говорят <br />
                <span className="italic">наши гости</span>
              </h2>
              <p className="text-charcoal/50 leading-relaxed font-light">
                Ваше доверие и комфорт — наша главная награда. Мы ценим каждое мнение и стремимся быть лучшими для вас.
              </p>
            </motion.div>

            <div className="flex gap-4">
              <button 
                onClick={prev}
                className="w-12 h-12 rounded-full border border-charcoal/10 flex items-center justify-center hover:bg-charcoal hover:text-white transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={next}
                className="w-12 h-12 rounded-full border border-charcoal/10 flex items-center justify-center hover:bg-charcoal hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="bg-sand/30 rounded-[40px] p-8 md:p-16 relative"
              >
                <Quote className="absolute top-12 right-12 w-24 h-24 text-bronze/5 -z-0" />
                
                <div className="relative z-10">
                  <div className="flex gap-1 mb-8">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-bronze text-bronze" />
                    ))}
                  </div>

                  <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-charcoal/80 mb-12">
                    «{testimonials[currentIndex].text}»
                  </p>

                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
                      <img 
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full object-cover grayscale-[0.5]"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="font-display font-medium text-lg">{testimonials[currentIndex].name}</h4>
                      <p className="text-xs uppercase tracking-widest text-bronze font-bold">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Dots */}
            <div className="flex gap-2 mt-8 justify-center lg:justify-start">
              {testimonials.map((_, i) => (
                <div 
                  key={i}
                  className={cn(
                    "h-1 transition-all duration-500 rounded-full",
                    i === currentIndex ? "w-8 bg-bronze" : "w-2 bg-charcoal/10"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
