import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const SimpleTimetable = () => {
  const { user } = useAuth();
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTimetable();
    }
  }, [user]);

  const fetchTimetable = async () => {
    try {
      setLoading(true);
      const response = await api.getTimetable();
      setTimetable(response);
    } catch (error) {
      console.error('Error fetching timetable:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4 text-gray-500">Loading...</div>;
  }

  if (!timetable || !timetable.entries || timetable.entries.length === 0) {
    return <div className="text-center py-4 text-gray-500">No classes added</div>;
  }

  // Sort entries by day and time
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const sortedEntries = timetable.entries.sort((a, b) => {
    const dayDiff = days.indexOf(a.day) - days.indexOf(b.day);
    if (dayDiff !== 0) return dayDiff;
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">My Timetable</h3>
      <div className="overflow-x-auto border border-gray-300 rounded">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border-r border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">Day</th>
              <th className="border-r border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">Time</th>
              <th className="border-r border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">Subject</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-700">Room</th>
            </tr>
          </thead>
          <tbody>
            {sortedEntries.map((entry, index) => (
              <tr key={index} className="border-t border-gray-300 hover:bg-gray-50">
                <td className="border-r border-gray-300 px-3 py-2 text-gray-700">{entry.day}</td>
                <td className="border-r border-gray-300 px-3 py-2 text-gray-700">{entry.startTime} - {entry.endTime}</td>
                <td className="border-r border-gray-300 px-3 py-2 text-gray-700">{entry.subject}</td>
                <td className="px-3 py-2 text-gray-700">{entry.roomCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SimpleTimetable;
