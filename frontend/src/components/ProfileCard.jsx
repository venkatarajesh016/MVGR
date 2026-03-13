import React from 'react';
import { User, Phone, Mail, GraduationCap, Calendar, Building2, CreditCard, BookOpen, Shield } from 'lucide-react';

function ProfileCard({ user }) {
  const getRoleBadgeColor = (role) => {
    const colors = {
      student: 'bg-blue-500',
      guest: 'bg-gray-500',
      admin: 'bg-red-500',
      teacher: 'bg-green-500'
    };
    return colors[role] || 'bg-blue-500';
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 shadow-xl">
      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-white p-1 shadow-lg">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name || user.username}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {getInitials(user.name || user.username)}
                </span>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-4 border-white"></div>
        </div>
        
        {/* Name */}
        <h2 className="text-lg font-bold text-white mt-4 text-center">
          {user.name || user.username}
        </h2>
        
        {/* Role Badge */}
        <span className={`${getRoleBadgeColor(user.role)} text-white text-xs px-3 py-1 rounded-full font-medium mt-2`}>
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </span>
        
        {/* ID */}
        {user.studentId && (
          <p className="text-blue-100 text-sm font-medium mt-1">{user.studentId}</p>
        )}
        {user.employeeId && (
          <p className="text-blue-100 text-sm font-medium mt-1">{user.employeeId}</p>
        )}
      </div>

      {/* Profile Details */}
      <div className="space-y-3">
        {user.college && (
          <div className="flex items-center gap-3 text-white">
            <Building2 className="w-4 h-4 text-blue-200 flex-shrink-0" />
            <span className="text-sm">{user.college}</span>
          </div>
        )}
        
        {user.year && (
          <div className="flex items-center gap-3 text-white">
            <GraduationCap className="w-4 h-4 text-blue-200 flex-shrink-0" />
            <span className="text-sm">{user.year}</span>
          </div>
        )}
        
        {user.department && (
          <div className="flex items-center gap-3 text-white">
            <BookOpen className="w-4 h-4 text-blue-200 flex-shrink-0" />
            <span className="text-sm">{user.department}</span>
          </div>
        )}
        
        {user.subject && (
          <div className="flex items-center gap-3 text-white">
            <GraduationCap className="w-4 h-4 text-blue-200 flex-shrink-0" />
            <span className="text-sm">{user.subject}</span>
          </div>
        )}
        
        {user.phone && (
          <div className="flex items-center gap-3 text-white">
            <Phone className="w-4 h-4 text-blue-200 flex-shrink-0" />
            <span className="text-sm">{user.phone}</span>
          </div>
        )}
        
        {user.email && (
          <div className="flex items-center gap-3 text-white">
            <Mail className="w-4 h-4 text-blue-200 flex-shrink-0" />
            <span className="text-sm truncate">{user.email}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
