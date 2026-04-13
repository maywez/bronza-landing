import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  format,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMinutes,
  isBefore,
  setHours,
  setMinutes,
  setSeconds,
  startOfMonth,
  addMonths,
  isBefore as isBeforeDate,
} from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock, CheckCircle2, ChevronLeft, ChevronRight, LoaderCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

const WORKING_HOURS = { start: 10, end: 21 };
const INTERVAL = 15;
const APPOINTMENT_DURATION = 15;

type BookingStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function BookingSection() {
  const today = useMemo(() => setSeconds(setMinutes(setHours(new Date(), 0), 0), 0), []);
  const firstAvailableDate = today;
  const bookingRangeStart = startOfMonth(today);
  const bookingRangeEnd = endOfMonth(addMonths(today, 1));

  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<BookingStatus>('idle');
  const [message, setMessage] = useState('');
  const daysScrollRef = useRef<HTMLDivElement | null>(null);

  const days = useMemo(() => eachDayOfInterval({
    start: bookingRangeStart,
    end: bookingRangeEnd,
  }), [bookingRangeEnd, bookingRangeStart]);

  useEffect(() => {
    const selectedButton = daysScrollRef.current?.querySelector<HTMLButtonElement>('[data-selected="true"]');
    selectedButton?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [selectedDate]);

  const generateTimeSlots = (date: Date) => {
    const slots: string[] = [];
    let current = setMinutes(setHours(date, WORKING_HOURS.start), 0);
    current = setSeconds(current, 0);
    const end = setMinutes(setHours(date, WORKING_HOURS.end), 0);

    while (isBefore(current, end) || current.getTime() === end.getTime()) {
      slots.push(format(current, 'HH:mm'));
      current = addMinutes(current, INTERVAL);
    }

    return slots;
  };

  const timeSlots = useMemo(() => generateTimeSlots(selectedDate), [selectedDate]);

  const selectedDateTime = useMemo(() => {
    if (!selectedTime) return null;

    const [hours, minutes] = selectedTime.split(':').map(Number);
    let date = setHours(selectedDate, hours);
    date = setMinutes(date, minutes);
    date = setSeconds(date, 0);
    return date;
  }, [selectedDate, selectedTime]);

  const scrollDays = (direction: 'left' | 'right') => {
    const container = daysScrollRef.current;
    if (!container) return;

    const amount = Math.max(container.clientWidth * 0.7, 220);
    container.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  const isDayDisabled = (day: Date) => isBeforeDate(day, startOfMonth(firstAvailableDate)) || isBeforeDate(day, firstAvailableDate);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedDateTime) {
      setStatus('error');
      setMessage('Сначала выберите дату и время.');
      return;
    }

    if (!fullName.trim() || !phone.trim()) {
      setStatus('error');
      setMessage('Заполните имя и номер телефона.');
      return;
    }

    try {
      setStatus('submitting');
      setMessage('');

      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          date: selectedDateTime.toISOString(),
          durationMinutes: APPOINTMENT_DURATION,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Не удалось сохранить запись.');
      }

      setStatus('success');
      setMessage('Запись отправлена. Мы сохранили её в календарь.');
      setFullName('');
      setPhone('');
      setSelectedTime(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Что-то пошло не так.';
      setStatus('error');
      setMessage(errorMessage);
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
          <p className="text-charcoal/55 max-w-2xl mx-auto leading-relaxed">
            Сейчас можно пролистать весь текущий месяц и весь следующий, чтобы клиенту было проще выбрать время заранее.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_420px] gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between mb-4 gap-4">
              <h3 className="font-display text-lg flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-bronze" />
                Дата визита
              </h3>
              <div className="text-sm text-charcoal/50 font-medium whitespace-nowrap">
                {format(selectedDate, 'LLLL yyyy', { locale: ru })}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Показать предыдущие даты"
                onClick={() => scrollDays('left')}
                className="shrink-0 w-11 h-11 rounded-full bg-white border border-charcoal/8 shadow-sm flex items-center justify-center text-charcoal hover:border-bronze/40 hover:text-bronze transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div
                ref={daysScrollRef}
                className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-4 no-scrollbar scroll-smooth"
              >
                {days.map((day) => {
                  const disabled = isDayDisabled(day);
                  const selected = isSameDay(day, selectedDate);

                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      data-selected={selected}
                      disabled={disabled}
                      onClick={() => {
                        setSelectedDate(day);
                        setSelectedTime(null);
                        setStatus('idle');
                        setMessage('');
                      }}
                      className={cn(
                        'flex-shrink-0 w-20 h-24 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border',
                        selected
                          ? 'bg-bronze border-bronze text-white shadow-lg shadow-bronze/20 scale-105'
                          : 'bg-white border-charcoal/5 hover:border-bronze/30 text-charcoal',
                        disabled && 'opacity-35 cursor-not-allowed hover:border-charcoal/5 text-charcoal/40'
                      )}
                    >
                      <span className="text-[10px] uppercase tracking-wider mb-1 opacity-70">
                        {format(day, 'eee', { locale: ru })}
                      </span>
                      <span className="text-2xl font-display font-medium">{format(day, 'd')}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                aria-label="Показать следующие даты"
                onClick={() => scrollDays('right')}
                className="shrink-0 w-11 h-11 rounded-full bg-white border border-charcoal/8 shadow-sm flex items-center justify-center text-charcoal hover:border-bronze/40 hover:text-bronze transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <h3 className="font-display text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-bronze" />
                Доступное время
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => {
                      setSelectedTime(time);
                      setStatus('idle');
                      setMessage('');
                    }}
                    className={cn(
                      'py-3 rounded-xl text-sm font-medium transition-all duration-200 border',
                      selectedTime === time
                        ? 'bg-charcoal border-charcoal text-white shadow-md'
                        : 'bg-white border-charcoal/5 hover:border-bronze/30 text-charcoal/70'
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="xl:sticky xl:top-24"
          >
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-charcoal/5 border border-charcoal/5">
              <h3 className="font-display text-xl mb-8">Детали записи</h3>

              <div className="space-y-6 mb-8">
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

              <form className="space-y-4" onSubmit={handleSubmit}>
                <label className="block space-y-2">
                  <span className="text-sm text-charcoal/55">ФИО</span>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Например, Анна Иванова"
                    className="w-full rounded-2xl border border-charcoal/10 bg-sand/40 px-4 py-4 outline-none transition focus:border-bronze"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm text-charcoal/55">Телефон</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="+7 (900) 000-00-00"
                    className="w-full rounded-2xl border border-charcoal/10 bg-sand/40 px-4 py-4 outline-none transition focus:border-bronze"
                  />
                </label>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={cn(
                    'w-full py-5 rounded-2xl font-display font-medium tracking-wider uppercase transition-all duration-500 relative overflow-hidden flex items-center justify-center gap-2',
                    status === 'submitting'
                      ? 'bg-charcoal text-white'
                      : 'bg-bronze text-white hover:bg-bronze/90 shadow-lg shadow-bronze/20 active:scale-95'
                  )}
                >
                  <AnimatePresence mode="wait">
                    {status === 'submitting' ? (
                      <motion.div
                        key="loading"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <LoaderCircle className="w-5 h-5 animate-spin" />
                        Отправляем
                      </motion.div>
                    ) : status === 'success' ? (
                      <motion.div
                        key="confirmed"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Запись создана
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
              </form>

              {message && (
                <p className={cn(
                  'text-sm mt-4 leading-relaxed',
                  status === 'error' ? 'text-red-600' : 'text-emerald-600'
                )}>
                  {message}
                </p>
              )}

              <p className="text-[10px] text-center mt-6 text-charcoal/40 leading-relaxed">
                После отправки заявка сохраняется в календаре студии. Позже можно добавить SMS, Telegram или WhatsApp-уведомления.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
