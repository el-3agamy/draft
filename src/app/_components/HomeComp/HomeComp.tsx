import React from 'react'
import Hero from "./Hero/Hero";
import Navbar from "./Navbar/Navbar";
export default function HomeComp() {
    return (
        <>
            <main className="flex flex-col  w-full h-screen bg-amber-100" id='#'>
                {/* <Navbar /> */}
                <Hero />
            </main>
        </>
    )
}
