
import Link from "next/link";
import Image from "next/image";
import { serviceObjType } from "../Services";

export default function ServiceCard({
    obj,
    //   href,
}: {
    obj: serviceObjType;
    //   href: string;
}) {
    return (
        // <Link href={href} className=" w-[350px] h-[400px] md:h-[350px]  " > 
        <article className="overflow-hidden h-full  w-full  md:w-[350px] md:h-[350px] border rounded-3xl border-emerald-400 hover:cursor-pointer hover:border-emerald-700">
            {/* <article className="overflow-hidden w-[450px] h-[400px] md:w-[350px] md:h-[350px] border rounded-3xl border-emerald-400 hover:cursor-pointer hover:border-emerald-700"> */}
            <figure className="flex flex-col h-full w-full">
                {/* Image + Overlay */}
                <div className="relative group w-full h-[250px]  overflow-hidden cursor-pointer [perspective:1000px]">
                    {/* <Image
                        src={obj.img}
                        fill
                        className="object-cover"
                        alt={obj.title}
                    /> */}

                    <Image
                        src={obj.img}
                        width={700}
                        height={500}
                        className="object-cover w-full h-full"
                        alt={obj.title}
                    />

                    <div className="absolute inset-0 flex items-center justify-center
                            bg-gradient-to-br from-emerald-900/90 via-emerald-800/80 to-emerald-600/70
                            opacity-0 [transform:rotateY(90deg)]
                            group-hover:opacity-100 group-hover:[transform:rotateY(0deg)]
                            transition-all duration-700 ease-in-out
                            [backface-visibility:hidden]">
                        <span className="text-white text-lg font-semibold">

                            {obj.discover}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <figcaption className="w-full flex flex-1 items-center justify-center bg-ivory-300">
                    <h2 className="py-5 text-center text-2xl md:text-3xl font-bold text-emerald-800">
                        {obj.title}
                    </h2>
                </figcaption>
            </figure>
        </article>
        // </Link>
    );
}