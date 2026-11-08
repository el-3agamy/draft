

import About from "../_components/About/About";
import Education from "../_components/Education/Education";
import Footer from "../_components/Footer/Footer";
import HomeComp from "../_components/HomeComp/HomeComp";
import Locations from "../_components/Locations/Locations";
import Services from "../_components/Services/Services";
import Smile from "../_components/Smile/Smile";
import WhatsAppFrom from "../_components/WhatsAppFrom/WhatsAppFrom";

export default function Home() {
  return (
    <>
      <div className="relative">
        <HomeComp />
        <About />
        <Education />
        <Smile />
        <Services />
        <WhatsAppFrom />
        <Locations />
        {/* <Footer /> */}
      </div>
    </>
  );
}