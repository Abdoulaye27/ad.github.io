import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';

export default function Layout({ children, currentPageName }) {
  const navItems = [
    { name: 'writing', label: 'writing', page: 'Home' },
    { name: 'books', label: 'books', page: 'Books' },
    { name: 'movies', label: 'movies', page: 'Movies' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <div className="md:hidden border-b border-gray-200 p-4">
        <Link to={createPageUrl('About')}>
          <h1 className="text-lg font-medium text-gray-900 mb-3 hover:text-gray-600 transition-colors">Your Name</h1>
        </Link>
        <nav className="flex gap-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={createPageUrl(item.page)}
              className={`text-sm transition-colors ${
                currentPageName === item.page
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-400'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-48 fixed left-0 top-0 h-screen border-r border-gray-200 p-8">
        <div className="mb-12">
          <Link to={createPageUrl('About')}>
            <h1 className="text-xl font-medium text-gray-900 mb-2 hover:text-gray-600 transition-colors cursor-pointer">Your Name</h1>
          </Link>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={createPageUrl(item.page)}
              className={`block text-sm transition-colors ${
                currentPageName === item.page
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="md:ml-48">
        {children}
      </div>
    </div>
  );
}