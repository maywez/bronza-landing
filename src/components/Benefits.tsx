import { motion } from 'motion/react';
import { Sparkles, Clock, ShieldCheck, MapPin, Heart } from 'lucide-react';

const benefits = [
  {
    icon: Sparkles,
    title: "Комфортная атмосфера",
    description: "Пространство, где каждая деталь создана для вашего расслабления и эстетического удовольствия."
  },
  {
    icon: Clock,
    title: "Удобная запись",
    description: "Записывайтесь онлайн в любое время. Мы ценим вашу пунктуальность и комфорт."
  },
  {
    icon: ShieldCheck,
    title: "Современный подход",
    description: "Используем передовые технологии и качественные материалы для идеального результата."
  },
  {
    icon: MapPin,
    title: "Удобное расположение",
    description: "Студия находится в центре города с удобной парковкой и транспортной доступностью."
  },
  {
    icon: Heart,
    title: "Внимание к клиенту",
    description: "Индивидуальный подход и забота о каждом посетителе — наш главный приоритет."
  }
];

export default function Benefits() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-6">
            <span className="text-bronze font-display uppercase tracking-[0.2em] text-xs font-bold">
              Почему выбирают нас
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-light leading-tight">
              Ваш путь к <br />
              <span className="italic">идеальному</span> загару
            </h2>
            <p className="text-charcoal/50 leading-relaxed max-w-sm">
              Мы создали место, где профессионализм встречается с эстетикой, чтобы вы могли наслаждаться результатом и процессом.
            </p>
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-[32px] bg-sand/30 border border-transparent hover:border-bronze/20 hover:bg-white hover:shadow-xl hover:shadow-bronze/5 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="w-6 h-6 text-bronze" />
                </div>
                <h3 className="text-xl font-display font-medium mb-3">{item.title}</h3>
                <p className="text-sm text-charcoal/50 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
