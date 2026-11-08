"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Smile() {
  const t = useTranslations("Smile");
  const [position, setPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);

  const updatePosition = (clientX: number) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();

    const newPosition =
      ((clientX - rect.left) / rect.width) * 100;

    setPosition(Math.min(100, Math.max(0, newPosition)));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const handleMouseMove = (event: MouseEvent) => {
      updatePosition(event.clientX);
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    updatePosition(e.touches[0].clientX);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-y-4 py-24 bg-gold-50">

      {/* TITLE */}
      <h1
        className="
          mb-11
          font-black
          text-2xl
          md:text-5xl
          text-emerald-900

        "
      >
        <span className="
          relative
          pb-2
          after:absolute
          after:bottom-0
          after:start-0
          after:h-[2px]
          after:w-full
          after:bg-amber-400" >
          {t("titleLined")}
        </span>
        {t("titleRest")}
      </h1>

      {/* DESCRIPTION */}
      <p
        className="
          text-center
          md:text-[18px]
          text-[12px]
          font-bold
          p-2
          md:p-0 
        "
      >


        {t("desc1")}
        <br />
        {t("desc2")}

      </p>


      {/* BEFORE / AFTER BUTTONS */}
      <div className="mt-6 flex items-center gap-x-10">

        <button
          type="button"
          onClick={() => setPosition(0)}
          className={`
            text-2xl
            hover:cursor-pointer
            font-bold
            transition-all
            duration-300
            ${position < 50
              ? "text-emerald-900"
              : "text-emerald-400"
            }
          `}
        >
          {t("before")}
        </button>

        <button
          type="button"
          onClick={() => setPosition(100)}
          className={`
            text-2xl
            hover:cursor-pointer
            font-bold
            transition-all
            duration-300
            ${position >= 50
              ? "text-emerald-900"
              : "text-emerald-400"
            }
          `}
        >
          {t("after")}
        </button>

      </div>




      {/* ========================================================================================= */}

      {/* IMAGE COMPARISON */}
      <div
        ref={sliderRef}
        onTouchMove={handleTouchMove}
        className="
          relative
          mt-4
          h-[450px]
          w-[450px]
          max-w-[90vw]
          overflow-hidden
          rounded-xl
          select-none
          touch-none
          shadow-lg
        "
      >

        {/* =========================
            BEFORE IMAGE
        ========================== */}

        <Image
          src="/beforeWhite.jpg"
          alt="Smile before treatment"
          fill
          priority
          draggable={false}
          className="pointer-events-none object-cover"
        />

        {/* =========================
            AFTER IMAGE
        ========================== */}

        <div
          className="
            absolute
            left-0
            top-0
            h-full
            overflow-hidden
          "
          style={{
            width: `${position}%`,
          }}
        >
          <div className="relative h-[450px] w-[450px]">
            <Image
              src="/afterWhite.jpg"
              alt="Smile after treatment"
              fill
              priority
              draggable={false}
              className="pointer-events-none object-cover"
            />
          </div>
        </div>


        {/* ========================================================================== */}







        {/* =========================
            DIVIDER
        ========================== */}

        <div
          className="
            absolute
            top-0
            h-full
            w-[2px]
            -translate-x-1/2
            cursor-ew-resize
            bg-white
            shadow-md
          "
          style={{
            left: `${position}%`,
          }}
          onMouseDown={handleMouseDown}
        >

          {/* HANDLE */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              flex
              h-12
              w-12
              -translate-x-1/2
              -translate-y-1/2
              cursor-ew-resize
              items-center
              justify-center
              rounded-full
              border-2
              border-white
              bg-white
              text-lg
              font-bold
              text-emerald-800
              shadow-lg
            "
          >
            ↔
          </div>

        </div>

      </div>

    </section>
  );
}