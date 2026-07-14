import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, User } from 'lucide-react';
import { calendarEvents } from '../data/mockData';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 4, 15));
  const [view, setView] = useState('month');

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const today = () => setCurrentDate(new Date(2024, 4, 15));

  const getEventsForDay = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarEvents.filter(e => e.date === dateStr);
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const eventTypeColors = {
    meeting: '#3B86F0',
    call: '#00A78E',
    deadline: '#E52E33',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">Calendar</h1>
          <p className="text-sm text-[#757575]">{calendarEvents.length} events this month</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex border border-[#E5E5E5] rounded-lg overflow-hidden">
            {['month', 'week'].map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 text-sm capitalize ${view === v ? 'bg-[#FF7A59] text-white' : 'bg-white text-[#757575] hover:bg-[#F5F5F5]'}`}
              >
                {v}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#FF7A59] text-white rounded-lg hover:bg-[#E85A3C] transition-colors text-sm font-medium">
            <Plus size={18} />
            Add Event
          </button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="bg-white rounded-lg border border-[#E5E5E5] p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">{monthName}</h2>
          <div className="flex items-center gap-2">
            <button onClick={today} className="px-3 py-1.5 text-sm border border-[#E5E5E5] rounded-lg hover:bg-[#F5F5F5]">
              Today
            </button>
            <button onClick={prevMonth} className="p-1.5 border border-[#E5E5E5] rounded-lg hover:bg-[#F5F5F5]">
              <ChevronLeft size={18} />
            </button>
            <button onClick={nextMonth} className="p-1.5 border border-[#E5E5E5] rounded-lg hover:bg-[#F5F5F5]">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-xs font-semibold text-[#757575] py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 border-t border-l border-[#E5E5E5]">
          {days.map((day, idx) => {
            const events = day ? getEventsForDay(day) : [];
            const isToday = day === 15 && currentDate.getMonth() === 4;
            
            return (
              <div
                key={idx}
                className={`min-h-[100px] border-r border-b border-[#E5E5E5] p-2 ${!day ? 'bg-[#F5F5F5]' : ''}`}
              >
                {day && (
                  <>
                    <div className={`text-sm font-medium mb-1 ${isToday ? 'w-6 h-6 bg-[#FF7A59] text-white rounded-full flex items-center justify-center' : ''}`}>
                      {day}
                    </div>
                    <div className="space-y-1">
                      {events.slice(0, 3).map(event => (
                        <div
                          key={event.id}
                          className="text-xs px-1.5 py-0.5 rounded truncate cursor-pointer hover:opacity-80"
                          style={{ backgroundColor: eventTypeColors[event.type] || '#3B86F0', color: 'white' }}
                        >
                          {event.title}
                        </div>
                      ))}
                      {events.length > 3 && (
                        <div className="text-xs text-[#757575]">+{events.length - 3} more</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg border border-[#E5E5E5] p-6">
        <h3 className="text-base font-semibold mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {calendarEvents.slice(0, 5).map(event => (
            <div key={event.id} className="flex items-center gap-4 p-3 bg-[#F5F5F5] rounded-lg">
              <div className="w-12 h-12 bg-white rounded-lg flex flex-col items-center justify-center border border-[#E5E5E5]">
                <span className="text-xs font-medium text-[#757575]">{new Date(event.date).toLocaleDateString('en', { weekday: 'short' })}</span>
                <span className="text-lg font-bold">{new Date(event.date).getDate()}</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{event.title}</p>
                <p className="text-xs text-[#757575] flex items-center gap-1 mt-0.5">
                  <Clock size={12} />
                  {event.time} ({event.duration} min)
                  {event.contactId && <><User size={12} className="ml-2" /> Contact</>}
                </p>
              </div>
              <span
                className="px-2 py-1 rounded-full text-xs text-white capitalize"
                style={{ backgroundColor: eventTypeColors[event.type] || '#3B86F0' }}
              >
                {event.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
