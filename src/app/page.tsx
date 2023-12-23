"use client"
import { Button } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'

const HeroSection = () => {
  const createStudent=()=>{
    axios.post('https://localhost:7069/api/Student/Student', {
      name: 'Fred'   
     })
      .then(function (response) {
        const result= response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className=' grid gap-[60px] items-center grid-cols-1 md:grid-cols-2'>
      <div>
        <p className='text-6xl -tracking-[-1.5px] font-extrabold leading-[60px]'>
          Harmony in Learning <span className='text-primary'>Uniting Curiosty and Knowledge</span>
        </p>
        <p className='mt-5'>Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
        <div className=' flex gap-6 mt-10 py-[13] px-[25] items-center font-medium leading-6'>
          <Button className="bg-primary capitalize shadow-sm py-[9px] pl-[11px] pr-[13px] text-sm text-white font-medium  leading-4">Explore</Button>
          <Button className='bg-white text-black shadow-sm capitalize'>Watch video</Button>
        </div>
      </div>
      <div>
        <Image src={"/hero.png"} alt='Hero Image' className='object-fill' height={577} width={580} />
      </div>
      <Button onClick={createStudent}>Add Student</Button>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <HeroSection />
    </>
  )
}
