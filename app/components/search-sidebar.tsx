'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/inputs/input';

interface SearchSidebarProps {
  filters: {
    search: string;
    budget: number;
    duration: string;
    themes: string[];
  };
  onFilterChange: (key: string, value: any) => void;
  locations: string[];
}

export function SearchSidebar({ filters, onFilterChange, locations }: SearchSidebarProps) {
  const themeOptions = ['Honeymoon', 'Culture', 'Adventure', 'Offbeat', 'Family', 'Luxury'];

  const toggleTheme = (theme: string) => {
    const newThemes = filters.themes.includes(theme)
      ? filters.themes.filter(t => t !== theme)
      : [...filters.themes, theme];
    onFilterChange('themes', newThemes);
  };

  return (
    <aside className="w-full lg:w-80 space-y-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-blue-900/5 h-fit lg:sticky lg:top-32">
      <div className="space-y-6">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
          Filters
        </h3>

        {/* Search */}
        <div className="space-y-3">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Search Destination</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input 
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              placeholder="Where to?" 
              className="pl-10 h-12 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Themes */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Travel Themes</label>
          <div className="grid grid-cols-1 gap-2">
            {themeOptions.map((theme) => (
              <button
                key={theme}
                onClick={() => toggleTheme(theme)}
                className={`flex items-center gap-3 p-2 rounded-xl transition-all ${
                  filters.themes.includes(theme) 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'hover:bg-slate-50 border-transparent'
                } border`}
              >
                <div className={`h-5 w-5 rounded border flex items-center justify-center transition-all ${
                  filters.themes.includes(theme) 
                    ? 'bg-blue-600 border-blue-600' 
                    : 'bg-white border-slate-300'
                }`}>
                  {filters.themes.includes(theme) && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className={`text-sm font-bold ${
                  filters.themes.includes(theme) ? 'text-blue-600' : 'text-slate-600'
                }`}>
                  {theme}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Duration (Nights)</label>
            <span className="text-xs font-bold text-blue-600">{filters.duration || 'All'}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {['1-3 Nights', '4-6 Nights', '7+ Nights'].map((d) => (
              <button
                key={d}
                onClick={() => onFilterChange('duration', filters.duration === d ? '' : d)}
                className={`text-xs font-bold py-2 rounded-lg border transition-all ${
                  filters.duration === d 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-slate-600 border-slate-100 hover:border-blue-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Max Budget</label>
            <span className="text-xs font-bold text-blue-600">₹{filters.budget.toLocaleString('en-IN')}</span>
          </div>
          <input 
            type="range" 
            min="5000" 
            max="200000" 
            step="5000"
            value={filters.budget}
            onChange={(e) => onFilterChange('budget', Number(e.target.value))}
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            <span>₹5k</span>
            <span>₹2L+</span>
          </div>
        </div>

        {/* Quick Links / Locations */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Popular Destinations</label>
          <div className="flex flex-wrap gap-2">
            {locations.slice(0, 8).map((loc) => (
              <button
                key={loc}
                onClick={() => onFilterChange('search', loc)}
                className="text-[11px] font-bold px-3 py-1.5 bg-slate-50 text-slate-600 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors border border-slate-100"
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
