import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MapPin, BookOpen, Plus, Edit2, Trash2, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const StudentTimetable = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [timetable, setTimetable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [formData, setFormData] = useState({
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    subject: '',
    roomCode: '',
    buildingCode: '',
    floor: ''
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayColors = {
    Monday: 'from-blue-500 to-blue-600',
    Tuesday: 'from-purple-500 to-purple-600',
    Wednesday: 'from-pink-500 to-pink-600',
    Thursday: 'from-green-500 to-green-600',
    Friday: 'from-orange-500 to-orange-600',
    Saturday: 'from-red-500 to-red-600'
  };

  useEffect(() => {
    if (isOpen && user) {
      fetchTimetable();
    }
  }, [isOpen, user]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.roomCode) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      if (editingEntry) {
        // Update entry
        const updatedEntries = timetable.entries.map(entry =>
          entry._id === editingEntry._id ? { ...formData, _id: entry._id } : entry
        );
        await api.updateTimetable({ entries: updatedEntries });
      } else {
        // Add new entry
        const newEntries = [...(timetable?.entries || []), formData];
        await api.updateTimetable({ entries: newEntries });
      }
      
      fetchTimetable();
      setShowForm(false);
      setEditingEntry(null);
      setFormData({
        day: 'Monday',
        startTime: '09:00',
        endTime: '10:00',
        subject: '',
        roomCode: '',
        buildingCode: '',
        floor: ''
      });
    } catch (error) {
      console.error('Error saving timetable entry:', error);
      alert('Failed to save timetable entry');
    }
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setFormData(entry);
    setShowForm(true);
  };

  const handleDelete = async (entryId) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;

    try {
      const updatedEntries = timetable.entries.filter(entry => entry._id !== entryId);
      await api.updateTimetable({ entries: updatedEntries });
      fetchTimetable();
    } catch (error) {
      console.error('Error deleting timetable entry:', error);
      alert('Failed to delete timetable entry');
    }
  };

  const getTodayClasses = () => {
    if (!timetable) return [];
    return timetable.entries.filter(entry => entry.day === selectedDay);
  };

  const sortedClasses = getTodayClasses().sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">My Timetable</h2>
                  <p className="text-blue-100 text-sm mt-1">
                    {user?.name} • {user?.batch || 'Batch not set'}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <>
                    {/* Day Selector */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Select Day
                      </label>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                        {days.map(day => (
                          <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`py-2 px-3 rounded-lg font-medium transition ${
                              selectedDay === day
                                ? `bg-gradient-to-r ${dayColors[day]} text-white`
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {day.slice(0, 3)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Classes for Selected Day - Simple Table */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {selectedDay}'s Classes
                        </h3>
                        <button
                          onClick={() => {
                            setEditingEntry(null);
                            setFormData({
                              day: selectedDay,
                              startTime: '09:00',
                              endTime: '10:00',
                              subject: '',
                              roomCode: '',
                              buildingCode: '',
                              floor: ''
                            });
                            setShowForm(true);
                          }}
                          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                          <Plus className="w-4 h-4" />
                          Add Class
                        </button>
                      </div>

                      {sortedClasses.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-lg">
                          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-500">No classes scheduled for {selectedDay}</p>
                        </div>
                      ) : (
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="border-r border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Time</th>
                                <th className="border-r border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Subject</th>
                                <th className="border-r border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Room</th>
                                <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sortedClasses.map((classItem, index) => (
                                <tr key={classItem._id || index} className="border-t border-gray-300">
                                  <td className="border-r border-gray-300 px-4 py-2 text-sm text-gray-700">{classItem.startTime} - {classItem.endTime}</td>
                                  <td className="border-r border-gray-300 px-4 py-2 text-sm text-gray-700">{classItem.subject}</td>
                                  <td className="border-r border-gray-300 px-4 py-2 text-sm text-gray-700">{classItem.roomCode}</td>
                                  <td className="px-4 py-2 text-center">
                                    <button
                                      onClick={() => handleEdit(classItem)}
                                      className="text-blue-600 hover:text-blue-800 mr-3"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDelete(classItem._id)}
                                      className="text-red-600 hover:text-red-800"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* Add/Edit Form */}
                    <AnimatePresence>
                      {showForm && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6"
                        >
                          <h4 className="text-lg font-semibold text-gray-800 mb-4">
                            {editingEntry ? 'Edit Class' : 'Add New Class'}
                          </h4>
                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Day */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Day *
                                </label>
                                <select
                                  name="day"
                                  value={formData.day}
                                  onChange={handleInputChange}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  {days.map(day => (
                                    <option key={day} value={day}>{day}</option>
                                  ))}
                                </select>
                              </div>

                              {/* Subject */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Subject *
                                </label>
                                <input
                                  type="text"
                                  name="subject"
                                  value={formData.subject}
                                  onChange={handleInputChange}
                                  placeholder="e.g., Mathematics"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>

                              {/* Start Time */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Start Time *
                                </label>
                                <input
                                  type="time"
                                  name="startTime"
                                  value={formData.startTime}
                                  onChange={handleInputChange}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>

                              {/* End Time */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  End Time *
                                </label>
                                <input
                                  type="time"
                                  name="endTime"
                                  value={formData.endTime}
                                  onChange={handleInputChange}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>

                              {/* Room Code */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Room Code *
                                </label>
                                <input
                                  type="text"
                                  name="roomCode"
                                  value={formData.roomCode}
                                  onChange={handleInputChange}
                                  placeholder="e.g., Room 101"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>

                              {/* Building Code */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Building Code
                                </label>
                                <input
                                  type="text"
                                  name="buildingCode"
                                  value={formData.buildingCode}
                                  onChange={handleInputChange}
                                  placeholder="e.g., Building A"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>

                              {/* Floor */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Floor
                                </label>
                                <input
                                  type="number"
                                  name="floor"
                                  value={formData.floor}
                                  onChange={handleInputChange}
                                  placeholder="e.g., 2"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>

                            {/* Form Actions */}
                            <div className="flex gap-3 pt-4">
                              <button
                                type="submit"
                                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                              >
                                {editingEntry ? 'Update Class' : 'Add Class'}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setShowForm(false);
                                  setEditingEntry(null);
                                }}
                                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition font-medium"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Weekly Overview */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Overview</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {days.map(day => {
                          const dayClasses = timetable?.entries.filter(e => e.day === day) || [];
                          return (
                            <div
                              key={day}
                              className={`bg-gradient-to-br ${dayColors[day]} text-white p-4 rounded-lg`}
                            >
                              <h4 className="font-semibold mb-2">{day}</h4>
                              <p className="text-sm opacity-90">
                                {dayClasses.length} class{dayClasses.length !== 1 ? 'es' : ''}
                              </p>
                              {dayClasses.length > 0 && (
                                <div className="mt-2 text-xs opacity-75">
                                  {dayClasses.map((c, i) => (
                                    <div key={i}>{c.startTime} - {c.subject}</div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StudentTimetable;
