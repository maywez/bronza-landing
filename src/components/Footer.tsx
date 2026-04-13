import { motion } from 'motion/react';
import { Phone, MapPin, Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <h2 className="text-4xl font-serif italic tracking-tight">Бронза</h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Премиальная студия загара в Кургане. Мы создаем идеальный загар и дарим моменты истинного наслаждения.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/bronza_45" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-charcoal transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://vk.ru/club237108041" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-charcoal transition-all duration-300">
                <span className="font-bold text-xs">VK</span>
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-display uppercase tracking-widest text-xs text-bronze font-bold">Контакты</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 group cursor-pointer">
                <MapPin className="w-5 h-5 text-white/30 group-hover:text-bronze transition-colors" />
                <span className="text-white/60 text-sm group-hover:text-white transition-colors">
                  г. Курган, <br />
                  ул. Комсомольская, 25
                </span>
              </li>
              <li className="flex items-center gap-4 group cursor-pointer">
                <Phone className="w-5 h-5 text-white/30 group-hover:text-bronze transition-colors" />
                <span className="text-white/60 text-sm group-hover:text-white transition-colors">
                  8 919 590 00 80
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-display uppercase tracking-widest text-xs text-bronze font-bold">Режим работы</h3>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="flex justify-between">
                <span>Ежедневно</span>
                <span className="text-white">10:00 — 21:00</span>
              </li>
              <li className="pt-4 text-white/30 text-[10px] uppercase tracking-widest leading-relaxed">
                Запись возможна онлайн <br /> или по телефону
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-display uppercase tracking-widest text-xs text-bronze font-bold">Навигация</h3>
            <ul className="space-y-3 text-white/60 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Главная</a></li>
              <li><a href="#booking" className="hover:text-white transition-colors">Записаться</a></li>
              <li><a href="https://vk.ru/club237108041" className="hover:text-white transition-colors">Группа VK</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Студия загара «Бронза». Все права защищены.
          </p>
          <div className="flex gap-8 text-white/20 text-[10px] uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Публичная оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
