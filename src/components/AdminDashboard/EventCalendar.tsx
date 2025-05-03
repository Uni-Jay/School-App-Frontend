import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Dialog } from "@headlessui/react";

// Nigerian public holidays (can be fetched from an API if needed)
const nigerianHolidays = [
  { title: "New Year's Day", date: "2025-01-01" },
  { title: "Good Friday", date: "2025-04-18" },
  { title: "Easter Monday", date: "2025-04-21" },
  { title: "Worker's Day", date: "2025-05-01" },
  { title: "Democracy Day", date: "2025-06-12" },
  { title: "Independence Day", date: "2025-10-01" },
  { title: "Christmas Day", date: "2025-12-25" },
  { title: "Boxing Day", date: "2025-12-26" },
];

const EventCalendar: React.FC = () => {
  const [events, setEvents] = useState([...nigerianHolidays]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ title: "", date: "" });

  const handleDateClick = (arg: any) => {
    setForm({ title: "", date: arg.dateStr });
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEventClick = ({ event }: any) => {
    setForm({ title: event.title, date: event.startStr });
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (selectedEvent) {
      selectedEvent.setProp("title", form.title);
    } else {
      setEvents([...events, { title: form.title, date: form.date }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (selectedEvent) {
      selectedEvent.remove();
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Event Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
        eventColor="#3B82F6"
      />

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <Dialog.Title className="text-lg font-bold mb-2">
              {selectedEvent ? "Edit Event" : "Add Event"}
            </Dialog.Title>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-2 border rounded mb-4"
              placeholder="Event Title"
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-between">
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
                Save
              </button>
              {selectedEvent && (
                <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">
                  Delete
                </button>
              )}
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded border">
                Cancel
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default EventCalendar;
