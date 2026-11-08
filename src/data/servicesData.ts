import { serviceObjType } from "../app/_components/Services/Services";

export const getServicesObjArr = (
    t: (key: string) => string
): serviceObjType[] => [
        {
            id: 1,
            title: t("serviceOne.tit"),
            body: t("serviceOne.desc"),
            img: "/brace.jpg",
            discover: t("serviceOne.discover"),
        },
        // Add the remaining services here
        {
            id: 2,
            title: t("serviceTwo.tit"),
            body: t("serviceTwo.desc"),
            img: "/bridge.jpg",
            discover: t("serviceOne.discover")
        },
        {
            id: 3,
            title: t("serviceThree.tit"),
            body: t("serviceThree.desc"),
            img: "/child.jpg",
            discover: t("serviceOne.discover")
        },
        {
            id: 4,
            title: t("serviceFour.tit"),
            body: t("serviceFour.desc"),
            img: "/rootCare.jpg",
            discover: t("serviceOne.discover")
        },
        {
            id: 5,
            title: t("serviceFive.tit"),
            body: t("serviceFive.desc"),
            img: "/white.png",
            discover: t("serviceOne.discover")
        },
        {
            id: 6,
            title: t("serviceSix.tit"),
            body: t("serviceSix.desc"),
            img: "/pain.jpg",
            discover: t("serviceOne.discover")
        },
    ];