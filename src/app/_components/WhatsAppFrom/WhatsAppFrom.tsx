// "use client"
// export default function WhatsAppFrom() {
//   return (
//     <>
//       <section className='w-screen py-16 flex flex-col gap-7 justify-center items-center bg-emerald-50'>
//         <h2 className='mb-11 text-2xl font-bold text-emerald-800
//               relative
//               after:absolute
//               after:bottom-0
//               after:left-0
//               after:h-[2px]
//               after:w-[70px]
//              after:bg-amber-200
//          '>
//           Contact Us.
//         </h2>
//         <div className='  flex justify-center items-center w-screen '>
//           <form action=""
//             className='mx-auto w-[80%] h-56 border border-emerald-300 rounded-2xl
//                     hover:border-emerald-500 hover:cursor-pointer
//                       flex flex-col justify-center items-center gap-4
//                       relative
//                       bg-white
//            '>
//             <div className='w-[90%] '>
//               <input type="text" placeholder='Enter Your Full Name'
//                 className='bg-white w-full border  border-emerald-200 rounded-[5px] py-[3px] px-[10px] focus:border-emerald-500 outline-0 focus:border-[2px]'
//               />
//             </div>
//             <div className='w-[90%] '>
//               <input type="tel" inputMode='numeric' placeholder="Enter Your What's App Number"
//                 className='bg-white w-full border border-emerald-200 rounded-[5px] py-[3px] px-[10px] focus:border-emerald-500 outline-0 focus:border-[2px]'
//                 onInput={(e) => {
//                   e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
//                 }}
//               />
//             </div>
//           </form>
//         </div>
//       </section>
//     </>
//   )
// }


"use client"

import { useState, useTransition } from 'react'
import { submitToSheets } from '../../actions'
import { useTranslations } from 'next-intl'

export default function WhatsAppFrom() {
  const t = useTranslations("Contact");
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatusMessage('')
    setIsSuccess(null)

    startTransition(async () => {
      const result = await submitToSheets({ name, whatsapp })

      if (result.success) {
        setIsSuccess(true)
        setStatusMessage(t("sucessStatusMsg"))
        setName('')
        setWhatsapp('')
      } else {
        setIsSuccess(false)
        setStatusMessage(t("faildStatusMsg"))
      }

      setTimeout(() => {
        setStatusMessage("")
      }, 3000);

    })
  }

  return (
    <>
      <section className='w-screen py-16 flex flex-col gap-7 justify-center items-center bg-ivory-50' id='contact'>
        <h1 className='
               mb-11 
               font-black
               text-2xl
               md:text-5xl
               text-emerald-900
               
               
               '>
          <span
            className=' relative
                          pb-2
                          after:absolute
                          after:bottom-0
                          after:start-0
                          after:h-0.5
                          after:w-full
                          after:bg-amber-400'
          >
            {t("titleLined")}
          </span>
          {t("titleRest")}
        </h1>
        <div className='flex justify-center items-center w-screen'>
          <form
            onSubmit={handleSubmit}
            className='mx-auto w-[80%] min-h-56 p-6 border border-emerald-300 rounded-2xl
                    hover:border-emerald-500
                    flex flex-col justify-center items-center gap-4
                    relative
                    bg-white
           '>
            <div className='w-[90%]'>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("userNameInputPlaceholder")}
                className='bg-white w-full border border-emerald-200 rounded-[5px] py-[3px] px-[10px] focus:border-emerald-500 outline-0 focus:border-[2px]'
              />
            </div>

            <div className='w-[90%]'>
              <input

                type="tel"
                required
                inputMode='numeric'
                dir="auto"
                value={whatsapp}
                placeholder={t("whatsAppInputPlaceholder")}
                className='bg-white w-full border border-emerald-200 rounded-[5px] py-[3px] px-[10px] focus:border-emerald-500 outline-0 focus:border-[2px] text-right rtl:text-right'
                onInput={(e) => {
                  const cleaned = e.currentTarget.value.replace(/\D/g, '');
                  setWhatsapp(cleaned);
                }}
              />
            </div>

            <div className='w-[90%] mt-2'>
              <button
                type="submit"
                disabled={isPending}
                className='w-full bg-emerald-700 hover:cursor-pointer hover:bg-emerald-800 text-white font-medium py-2 px-4 rounded-[5px] transition-colors disabled:opacity-50'
              >
                {isPending ? 'Sending...' : t("btn")}
              </button>
            </div>

            {statusMessage && (
              <p  className={`text-[18px] mt-2 font-medium absolute bg-ivory-100  w-[110%] h-[150%] md:text-3xl  flex justify-center items-center  ${isSuccess ? 'text-emerald-700' : 'text-red-600'}`}>
                {statusMessage}
              </p>
            )}


            {/* {statusMessage && (
              <div
                role="status"
                aria-live="polite"
                className="fixed inset-0 z-9999999999999999999999999999999 flex items-center justify-center bg-black/40 p-4"
              >
                <div
                  className={`rounded-2xl bg-white w-[300px] h-[300px] md:w-[450px] md:h-[450px]  p-8 text-center text-xl font-bold shadow-2xl
        ${isSuccess ? 'text-emerald-700' : 'text-red-600'}`}
                >
                  { statusMessage}
                </div>
              </div>
            )} */}

          </form>
        </div>
      </section>
    </>
  )
}