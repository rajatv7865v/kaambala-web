'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotions: false,
    language: 'en',
    theme: 'light',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Notification Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Notification Preferences</h2>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-semibold text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                className="w-12 h-6 rounded-full appearance-none cursor-pointer transition-colors"
                style={{
                  backgroundColor: settings.emailNotifications ? '#e56481' : '#d1d5db',
                }}
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-semibold text-gray-900">SMS Notifications</p>
                <p className="text-sm text-gray-500">Receive updates via SMS</p>
              </div>
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })}
                className="w-12 h-6 rounded-full appearance-none cursor-pointer transition-colors"
                style={{
                  backgroundColor: settings.smsNotifications ? '#e56481' : '#d1d5db',
                }}
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-semibold text-gray-900">Order Updates</p>
                <p className="text-sm text-gray-500">Get notified about order status changes</p>
              </div>
              <input
                type="checkbox"
                checked={settings.orderUpdates}
                onChange={(e) => setSettings({ ...settings, orderUpdates: e.target.checked })}
                className="w-12 h-6 rounded-full appearance-none cursor-pointer transition-colors"
                style={{
                  backgroundColor: settings.orderUpdates ? '#e56481' : '#d1d5db',
                }}
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-semibold text-gray-900">Promotions & Offers</p>
                <p className="text-sm text-gray-500">Receive special offers and discounts</p>
              </div>
              <input
                type="checkbox"
                checked={settings.promotions}
                onChange={(e) => setSettings({ ...settings, promotions: e.target.checked })}
                className="w-12 h-6 rounded-full appearance-none cursor-pointer transition-colors"
                style={{
                  backgroundColor: settings.promotions ? '#e56481' : '#d1d5db',
                }}
              />
            </label>
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">General Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#e56481] focus:border-transparent outline-none transition-all"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#e56481] focus:border-transparent outline-none transition-all"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Email</span>
              <span className="font-semibold text-gray-900">{user?.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Phone</span>
              <span className="font-semibold text-gray-900">{user?.phone}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Member Since</span>
              <span className="font-semibold text-gray-900">
                {new Date(user?.createdAt || '').toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            style={{ backgroundColor: isSaving ? '#d45471' : '#e56481' }}
            onMouseEnter={(e) => !isSaving && (e.currentTarget.style.backgroundColor = '#d45471')}
            onMouseLeave={(e) => !isSaving && (e.currentTarget.style.backgroundColor = '#e56481')}
          >
            {isSaving ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        {saveStatus === 'success' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
            Settings saved successfully!
          </div>
        )}
      </div>
    </div>
  );
}

