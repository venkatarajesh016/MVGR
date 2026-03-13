import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Calendar, Users, AlertCircle } from 'lucide-react';
import { useTriggerStore } from '../store/triggerStore';
import { useAuth } from '../context/AuthContext';
import { useToast } from './Toast';

const AdminDashboard = ({ onClose }) => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const { triggers, createTrigger, updateTrigger, deleteTrigger, fetchTriggers } = useTriggerStore();
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    triggerType: 'announcement',
    targetAudience: 'campus_wide',
    department: '',
    batch: '',
    roomChange: { fromRoom: '', toRoom: '', subject: '' },
    fromDate: '',
    toDate: ''
  });

  useEffect(() => {
    fetchTriggers();
  }, [fetchTriggers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('roomChange.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        roomChange: { ...prev.roomChange, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.message || !formData.fromDate || !formData.toDate) {
      addToast('Please fill all required fields', 'error');
      return;
    }

    const result = editingId
      ? await updateTrigger(editingId, formData)
      : await createTrigger(formData);

    if (result.success) {
      addToast(editingId ? 'Trigger updated successfully' : 'Trigger created successfully', 'success');
      setShowForm(false);
      setEditingId(null);
      setFormData({
        title: '',
        message: '',
        triggerType: 'announcement',
        targetAudience: 'campus_wide',
        department: '',
        batch: '',
        roomChange: { fromRoom: '', toRoom: '', subject: '' },
        fromDate: '',
        toDate: ''
      });
    } else {
      addToast(result.message, 'error');
    }
  };

  const handleEdit = (trigger) => {
    setFormData({
      title: trigger.title,
      message: trigger.message,
      triggerType: trigger.triggerType,
      targetAudience: trigger.targetAudience,
      department: trigger.department || '',
      batch: trigger.batch || '',
      roomChange: trigger.roomChange || { fromRoom: '', toRoom: '', subject: '' },
      fromDate: trigger.fromDate.split('T')[0],
      toDate: trigger.toDate.split('T')[0]
    });
    setEditingId(trigger._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trigger?')) {
      const result = await deleteTrigger(id);
      if (result.success) {
        addToast('Trigger deleted successfully', 'success');
      } else {
        addToast(result.message, 'error');
      }
    }
  };

  const isAdmin = user?.role === 'admin';
  const isTeacher = user?.role === 'teacher';

  if (!isAdmin && !isTeacher) {
    return (
      <div className="p-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-gray-600">You don't have permission to access this dashboard</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Create Button */}
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="mb-6 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-5 h-5" />
              Create New Trigger
            </button>
          )}

          {/* Form */}
          {showForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmit}
              className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200"
            >
              <h3 className="text-lg font-semibold mb-4">
                {editingId ? 'Edit Trigger' : 'Create New Trigger'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Room Change Notification"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Trigger Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    name="triggerType"
                    value={formData.triggerType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="announcement">Announcement</option>
                    <option value="room_change">Room Change</option>
                    <option value="alert">Alert</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter notification message"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Target Audience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Audience
                  </label>
                  <select
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="campus_wide">Campus Wide</option>
                    <option value="department">Department</option>
                    <option value="batch">Batch</option>
                    <option value="specific_users">Specific Users</option>
                  </select>
                </div>

                {/* Department (conditional) */}
                {formData.targetAudience === 'department' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      placeholder="e.g., Computer Science"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                {/* Batch (conditional) */}
                {formData.targetAudience === 'batch' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Batch
                    </label>
                    <input
                      type="text"
                      name="batch"
                      value={formData.batch}
                      onChange={handleInputChange}
                      placeholder="e.g., 2024-2025"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                {/* Room Change Fields */}
                {formData.triggerType === 'room_change' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        From Room
                      </label>
                      <input
                        type="text"
                        name="roomChange.fromRoom"
                        value={formData.roomChange.fromRoom}
                        onChange={handleInputChange}
                        placeholder="e.g., Room 101"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        To Room
                      </label>
                      <input
                        type="text"
                        name="roomChange.toRoom"
                        value={formData.roomChange.toRoom}
                        onChange={handleInputChange}
                        placeholder="e.g., Room 202"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="roomChange.subject"
                        value={formData.roomChange.subject}
                        onChange={handleInputChange}
                        placeholder="e.g., Mathematics"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </>
                )}

                {/* From Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valid From *
                  </label>
                  <input
                    type="datetime-local"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* To Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valid Until *
                  </label>
                  <input
                    type="datetime-local"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  {editingId ? 'Update Trigger' : 'Create Trigger'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({
                      title: '',
                      message: '',
                      triggerType: 'announcement',
                      targetAudience: 'campus_wide',
                      department: '',
                      batch: '',
                      roomChange: { fromRoom: '', toRoom: '', subject: '' },
                      fromDate: '',
                      toDate: ''
                    });
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}

          {/* Triggers List */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Active Triggers</h3>
            {triggers.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No triggers created yet</p>
            ) : (
              <div className="space-y-3">
                {triggers.map(trigger => (
                  <motion.div
                    key={trigger._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{trigger.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{trigger.message}</p>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {trigger.triggerType}
                          </span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            {trigger.targetAudience}
                          </span>
                          {trigger.roomChange?.fromRoom && (
                            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                              {trigger.roomChange.fromRoom} → {trigger.roomChange.toRoom}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(trigger.fromDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            By {trigger.createdBy?.name || 'Unknown'}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(trigger)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {isAdmin && (
                          <button
                            onClick={() => handleDelete(trigger._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
