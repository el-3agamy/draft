import React from 'react'
import {
  siFacebook,
  siInstagram,
  siX,
  siMessenger,
  siWhatsapp,
  siTiktok,
} from "simple-icons";

const socialLinks = [
  { name: "Facebook", icon: siFacebook, url: "https://www.facebook.com/mohamed.yaser.5876", hoverColor: "#1877F2" },
  { name: "Instagram", icon: siInstagram, url: "https://www.instagram.com/drmohyaser1/", hoverColor: "#E4405F" },
  { name: "X", icon: siX, url: "https://www.tiktok.com/@dent.moh.yaser?_r=1&_t=ZS-9AbDf4YhNqM", hoverColor: "#000000" },
  { name: "Messenger", icon: siMessenger, url: "https://www.facebook.com/mohamed.yaser.5876", hoverColor: "#0084FF" },
  { name: "WhatsApp", icon: siWhatsapp, url: "https://elagamiabdalla-lgtm.github.io/Dr-Mhmd-Yasser-booking/?source=Instagram&campaign=Bookings&medium=Bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAadWlmzIkBNZ6YIeS_HOt8KUDUOnEkb7xXD7D4_aXAZl5ZNhs9TQ3YV9LpdnZA_aem_bsJT0_PtIdSroIYEfc8BZQ", hoverColor: "#25D366" },
  { name: "TikTok", icon: siTiktok, url: "https://www.tiktok.com/@dent.moh.yaser?_r=1&_t=ZS-9AbDf4YhNqM", hoverColor: "#FE2C55" },
];

export default function SocialMediaLinks() {
  return (
    <>
      <div className="flex items-center gap-4">

        {socialLinks.map(({ name, icon, url, hoverColor }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            style={{ "--hover-color": hoverColor } as React.CSSProperties}
            className=" text-[var(--hover-color)] md:text-gold-300 transition-colors duration-200 hover:text-[var(--hover-color)]"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d={icon.path} />
            </svg>
          </a>

        ))}
      </div>
    </>
  )
}




