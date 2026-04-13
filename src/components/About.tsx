import { motion } from 'motion/react';

export default function About() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-bronze/5 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block p-4 rounded-full bg-bronze/10 mb-10"
        >
          <div className="w-3 h-3 rounded-full bg-bronze animate-pulse" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-serif font-light leading-snug mb-10"
        >
          «Бронза» — это не просто студия загара. Это пространство <span className="italic text-bronze">комфорта</span> и <span className="italic text-bronze">эстетики</span>, где каждый визит становится моментом заботы о себе.
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-3xl flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center text-charcoal/40 font-display text-xs uppercase tracking-[0.3em] font-bold"
        >
          <div className="flex items-center justify-center gap-3 text-center">
            <span className="w-8 h-[1px] bg-charcoal/20 shrink-0" />
            <span>Современное оборудование</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-center">
            <span className="w-8 h-[1px] bg-charcoal/20 shrink-0" />
            <span>Премиальный сервис</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-center">
            <span className="w-8 h-[1px] bg-charcoal/20 shrink-0" />
            <span>Уютная атмосфера</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
