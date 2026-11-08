
import { getServicesObjArr } from "@/data/servicesData";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export default async function Service({ params }: Props) {
  const { id, locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "Services",
  });

  const servicesObjArr = getServicesObjArr(t);
  const service = servicesObjArr.find((ser) => ser.id === Number(id));

  return (
    <main className="min-h-screen bg-ivory-100  mt-44 p-10">
      <h1 className="text-3xl font-bold text-emerald-900">
        {service?.title}
      </h1>

      <div>
        <p>{service?.body}</p>
      </div>
    </main>
  );
}