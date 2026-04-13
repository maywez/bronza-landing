import { useState } from 'react';
import { format, addDays, startOfToday, eachDayOfInterval, isSameDay, addMinutes, isBefore, setHours, setMinutes } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

const WORKING_HOURS = { start: 10, end: 21 };
const INTERVAL = 15;

export default function BookingSection() {
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const days = eachDayOfInterval({
    start: startOfToday(),
    end: addDays(startOfToday(), 13),
  });

  const generateTimeSlots = (date: Date) => {
    const slots = [];
    let current = setMinutes(setHours(date, WORKING_HOURS.start), 0);
    const end = setMinutes(setHours(date, WORKING_HOURS.end), 0);

    while (isBefore(current, end) || current.getTime() === end.getTime()) {
      slots.push(format(current, 'HH:mm'));
      current = addMinutes(current, INTERVAL);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots(selectedDate);

  const handleConfirm = () => {
    if (selectedTime) {
      setIsConfirmed(true);
      setTimeout(() => setIsConfirmed(false), 5000);
    }
  };

  return (
    <section id="booking" className="py-24 px-6 bg-sand/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-bronze font-display uppercase tracking-[0.2em] text-xs mb-4 block"
          >
            Онлайн-запись
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-light mb-6"
          >
            Выберите удобное время
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_380px] gap-8 lg:gap-12 items-start">
          {/* Date Selection */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-bronze" />
                Дата визита
              </h3>
              <div className="text-sm text-charcoal/50 font-medium">
                {format(selectedDate, 'LLLL yyyy', { locale: ru })}
              </div>
            </div>

            <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-4 no-scrollbar">
              {days.map((day) => (
                <button
                  key={day.toISOString()}
                  onClick={() => {
                    setSelectedDate(day);
                    setSelectedTime(null);
                  }}
                  className={cn(
                    "flex-shrink-0 w-20 h-24 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border",
                    isSameDay(day, selectedDate)
                      ? "bg-bronze border-bronze text-white shadow-lg shadow-bronze/20 scale-105"
                      : "bg-white border-charcoal/5 hover:border-bronze/30 text-charcoal"
                  )}
                >
                  <span className="text-[10px] uppercase tracking-wider mb-1 opacity-70">
                    {format(day, 'eee', { locale: ru })}
                  </span>
                  <span className="text-2xl font-display font-medium">
                    {format(day, 'd')}
                  </span>
                </button>
              ))}
            </div>

            {/* Time Slots */}
            <div className="space-y-6">
              <h3 className="font-display text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-bronze" />
                Доступное время
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "py-3 rounded-xl text-sm font-medium transition-all duration-200 border",
                      selectedTime === time
                        ? "bg-charcoal border-charcoal text-white shadow-md"
                        : "bg-white border-charcoal/5 hover:border-bronze/30 text-charcoal/70"
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Summary Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="xl:sticky xl:top-24"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-charcoal/5 border border-charcoal/5">
              <h3 className="font-display text-xl mb-8">Детали записи</h3>
              
              <div className="space-y-6 mb-10">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-4 border-b border-charcoal/5">
                  <span className="text-charcoal/50 text-sm">Студия</span>
                  <span className="font-medium sm:text-right">Бронза, Курган</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-4 border-b border-charcoal/5">
                  <span className="text-charcoal/50 text-sm">Дата</span>
                  <span className="font-medium sm:text-right">{format(selectedDate, 'd MMMM', { locale: ru })}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-4 border-b border-charcoal/5">
                  <span className="text-charcoal/50 text-sm">Время</span>
                  <span className="font-medium sm:text-right">{selectedTime || 'Не выбрано'}</span>
                </div>
              </div>

              <button
                disabled={!selectedTime || isConfirmed}
                onClick={handleConfirm}
                className={cn(
                  "w-full py-5 rounded-2xl font-display font-medium tracking-wider uppercase transition-all duration-500 relative overflow-hidden",
                  !selectedTime 
                    ? "bg-sand text-charcoal/30 cursor-not-allowed" 
                    : "bg-bronze text-white hover:bg-bronze/90 shadow-lg shadow-bronze/20 active:scale-95"
                )}
              >
                <AnimatePresence mode="wait">
                  {isConfirmed ? (
                    <motion.div
                      key="confirmed"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Записано
                    </motion.div>
                  ) : (
                    <motion.span
                      key="confirm"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                    >
                      Подтвердить запись
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              
              <p className="text-[10px] text-center mt-6 text-charcoal/40 leading-relaxed">
                Нажимая кнопку, вы соглашаетесь с правилами посещения студии и обработкой персональных данных
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
