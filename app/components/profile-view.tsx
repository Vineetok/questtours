'use client';

import { useState, useEffect, useCallback } from 'react';
import { User, Shield, LogOut, Camera, Check } from 'lucide-react';
import { Card } from '@/components/ui/display/card';
import { Button } from '@/components/ui/inputs/button';
import { userService } from '@/services/userService';
import { removeAuthToken, updateUserAvatar, getFullAvatarUrl, updateUserData } from '@/lib/auth';
import { useUser } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';

export function ProfileView() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [saving, setSaving] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const data = await userService.getProfile();
      if (data) {
        const updatedUser = updateUserData(data);
        setUser(updatedUser);
        setFormData({ name: updatedUser.name, email: updatedUser.email });
      }
    } catch {
      // Error handled by toast if needed, but fetchProfile is usually silent on background refresh
    }
  }, [setUser]);

  useEffect(() => {
    // Sync form data once when user is loaded
    if (user && !formData.name) {
      const timer = setTimeout(() => {
        setFormData({ name: user.name, email: user.email });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [user, formData.name]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProfile();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchProfile]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Check file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setUploading(true);
    const avatarFormData = new FormData();
    avatarFormData.append('avatar', file);

    try {
      const data = await userService.uploadAvatar(avatarFormData);
      toast.success('Profile picture updated successfully');
      const avatarUrl = getFullAvatarUrl(data.avatarUrl);
      updateUserAvatar(avatarUrl!);
      if (user) {
        setUser({ ...user, avatar: avatarUrl! });
      }
    } catch {
      toast.error('An error occurred during upload');
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email) {
      toast.error('Name and email are required');
      return;
    }

    setSaving(true);
    try {
      const data = await userService.updateProfile(formData);
      toast.success('Profile updated successfully');
      const updatedUser = updateUserData(data.user);
      setUser(updatedUser);
      setIsEditing(false);
    } catch {
      toast.error('An error occurred during update');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    removeAuthToken();
    router.push('/');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 italic">Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      {/* Header Banner */}
      <div className="relative h-48 rounded-3xl bg-gradient-to-r from-teal-500 to-blue-600 flex flex-col justify-center px-10 text-white overflow-hidden shadow-lg">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold">My Profile</h2>
          <p className="text-blue-50/80 mt-1">Manage your account settings and personal information.</p>
        </div>
        {/* Subtle decorative circle */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Contact Quick Info */}
        <Card className="border-none shadow-sm rounded-3xl overflow-hidden flex flex-col items-center p-10 bg-white">
          <div className="relative group cursor-pointer">
            <div className="h-32 w-32 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 p-1 shadow-md transition-transform group-hover:scale-105">
              <div className="h-full w-full rounded-2xl bg-white flex items-center justify-center text-teal-600 border border-gray-100 overflow-hidden relative">
                {user.avatar ? (
                  <Image 
                    src={user.avatar} 
                    alt={user.name} 
                    fill 
                    className="object-cover"
                  />
                ) : (
                  <User size={64} className="opacity-80" />
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                  </div>
                )}
              </div>
            </div>
            <label htmlFor="photo-upload" className={`absolute -bottom-2 -right-2 h-10 w-10 bg-teal-500 rounded-xl flex items-center justify-center text-white shadow-lg border-4 border-white cursor-pointer hover:bg-teal-600 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <Camera size={18} />
              <input 
                type="file" 
                id="photo-upload" 
                className="hidden" 
                aria-label="Upload Profile Picture"
                onChange={handleImageChange}
                disabled={uploading}
                accept="image/*"
              />
            </label>
          </div>

          <div className="text-center mt-6">
            <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
            <p className="text-sm text-teal-600 font-semibold mt-1 capitalize">{user.role}</p>
          </div>

          <div className="w-full mt-10 space-y-6 text-sm">
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mobile Number</p>
              <p className="font-medium text-gray-900">+91 98765 43210</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email Address</p>
              <p className="font-medium text-gray-900 truncate">{user.email}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Location</p>
              <p className="font-medium text-gray-600 italic">Not updated</p>
            </div>
          </div>
        </Card>

        {/* Right Column: Personal Details Form */}
        <Card className="lg:col-span-2 border-none shadow-sm rounded-3xl p-8 bg-white">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-gray-900">Personal Details</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50">
                <Shield size={16} className="mr-2" /> Password
              </Button>
              {isEditing ? (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
                    onClick={() => setIsEditing(false)}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-teal-600 hover:bg-teal-700 rounded-xl px-6"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </Button>
                </>
              ) : (
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                {isEditing ? (
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-2xl bg-gray-50/80 border border-gray-100 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                    placeholder="Enter your name"
                  />
                ) : (
                  <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 text-gray-900 font-medium">
                    {user.name}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Mobile Number</label>
                <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 text-gray-900 font-medium opacity-60">
                  +91 98765 43210 (ReadOnly)
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              {isEditing ? (
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-2xl bg-gray-50/80 border border-gray-100 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                  placeholder="Enter your email"
                />
              ) : (
                <div className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 text-gray-900 font-medium flex justify-between items-center">
                  <span>{user.email}</span>
                  <div className="h-5 w-5 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                    <Check size={12} strokeWidth={3} />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6">
              <Button onClick={handleLogout} variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl">
                <LogOut size={18} className="mr-2" /> Logout Account
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
