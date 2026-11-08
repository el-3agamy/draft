'use client'

import "./Education.css";
import Certificate from './Certificate/Certificate';

const certificates = [
  { id: 1, title: 'Dental Implantology', src: "/1.webp" },
  { id: 2, title: 'TMD Orafacial Pain', src: "/2.webp" },
  { id: 3, title: 'Wire Bending Orthodontic', src: "/3.webp" },
  { id: 4, title: 'Advaned Periodontics', src: "/4.jpg" },
  { id: 5, title: 'Orthodontics Dental Expo', src: "/5.png" },
  { id: 6, title: 'Orthopedic Orthodontic', src: "/6.png" },
  { id: 7, title: 'Orthodontics Dental Expo', src: "/7.png" }
]

export default function Education() {
  // Duplicate the array so the loop has seamless continuity
  const carouselItems = [...certificates, ...certificates]

  return (
    <section className="w-full overflow-hidden bg-emerald-900 py-8">
      {/* Scroll track container */}
      <div className="flex w-max animate-infinite-scroll">
        {carouselItems.map((item, index) => (
          <Certificate key={index} item={item} />
        ))}
      </div>
    </section>
  )
}