import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navItems = [
    { to: '/planets', label: 'Planets' },
    { to: '/tracker', label: 'ISS' },
    { to: '/networks', label: 'Satellites' },
    { to: '/observatory', label: 'Observatory' },
    { to: '/facts', label: 'Facts' },
  ];

  return (
    <nav className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-start md:justify-center gap-4 md:gap-8 lg:gap-16 px-6 md:px-16 py-3 md:py-5 rounded-full bg-white shadow-xl border border-gray-100 w-[95%] md:w-auto max-w-full overflow-x-auto no-scrollbar">
      <NavLink to="/" className="flex items-center shrink-0">
        <span className="text-[12px] md:text-[14px] font-black uppercase tracking-[0.2em] text-black">DeepSpace</span>
      </NavLink>
      
      <div className="flex items-center gap-4 md:gap-10 shrink-0">
        {navItems.map((item) => (
          <NavLink 
            key={item.to} 
            to={item.to} 
            className={({ isActive }) => `text-[9px] md:text-[11px] font-medium tracking-[0.05em] transition-all duration-300 ${isActive ? 'text-black border-b border-black pb-1' : 'text-slate-500 hover:text-black'}`}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
