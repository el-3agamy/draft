import { useTranslations } from "next-intl";



type Branch = {
  name: string;
  address: string;
  phone: string;
  mapUrl: string;
};

export default function BranchCard({
  name,
  address,
  phone,
  mapUrl,
}: Branch) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  const t = useTranslations("Locations");
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <iframe
        src={mapUrl}
        title={`Map of ${name}`}
        width="100%"
        height="280"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full border-0"
      />

      <div className="space-y-3 p-5">
        <h3 className="text-xl font-bold">{name}</h3>

        <p className="text-gray-600">{address}</p>

        <a href={`tel:${phone}`} className="block text-blue-600">
          {phone}
        </a>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-emerald-700 hover:bg-emerald-500  px-5 py-3 text-white"
        >
          {t("getDir")}
        </a>
      </div>
    </article>
  );
}
