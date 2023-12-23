"use client";
import * as React from 'react';
import { Logo } from '@/app/icons/logo';
import Link from 'next/link';
import { Select, MenuItem } from '@mui/material';

export default function NavBar() {
  const [selectedLanguage, setSelectedLanguage] = React.useState('En');

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <div className='static shadow-sm w-full flex items-center justify-start gap-10 py-4 px-8  self-stretch bg-white'>
      <div>
        <Logo />
      </div>
      <div className='flex items-center gap-1 '>
        <Link className='text-[#6B7280  px-3' href={""}>
          Courses
        </Link>
        <Link className='text-[#6B7280]  px-3' href={""}>
          Subjects
        </Link>
        <Link className='text-[#6B7280]  px-3' href={""}>
          Grades
        </Link>
        <Link className='text-[#6B7280]  px-3' href={""}>
          Analytics
        </Link>
      </div>
      <div className='flex justify-end items-center gap-4 flex-1'>
        <span>{selectedLanguage}</span>
        <select className='flex justify-center  border-0  w-7 h-7 rounded-md'
          value=""
          onChange={(e) => handleLanguageChange(e.target.value)}
        >
          <option value="En">English</option>
          <option value="Fr">French</option>
          <option value="Es">Spanish</option>
        </select>
      </div>
    </div>
  );
}