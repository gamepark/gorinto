import Element from "../types/Element";
import KeyElementCard from "../types/KeyElementCard";

const {Void, Wind, Fire, Water, Earth} = Element

export const VoidCard : KeyElementCard = {
    image:"url(../images/KeyElement1.jpg)",
    element : Void 
}

export const WindCard : KeyElementCard = {
    image:"url(../images/KeyElement2.jpg)",
    element : Wind
}

export const FireCard : KeyElementCard = {
    image:"url(../images/KeyElement3.jpg)",
    element : Fire
}

export const WaterCard : KeyElementCard = {
    image:"url(../images/KeyElement4.jpg)",
    element : Water
}

export const EarthCard : KeyElementCard = {
    image:"url(../images/KeyElement5.jpg)",
    element : Earth
}

export const keyElementCards : KeyElementCard[] = [
    VoidCard,
    WindCard,
    FireCard,
    WaterCard,
    EarthCard
]  