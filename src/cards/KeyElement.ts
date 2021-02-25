import Element from "../types/Element";
import KeyElementCard from "../types/KeyElementCard";
import keyElement1 from '../images/KeyElement1.jpg';
import keyElement2 from '../images/KeyElement2.jpg';
import keyElement3 from '../images/KeyElement3.jpg';
import keyElement4 from '../images/KeyElement4.jpg';
import keyElement5 from '../images/KeyElement5.jpg';

const {Void, Wind, Fire, Water, Earth} = Element

export const VoidCard : KeyElementCard = {
    image:keyElement1,
    element : Void 
}

export const WindCard : KeyElementCard = {
    image:keyElement2,
    element : Wind
}

export const FireCard : KeyElementCard = {
    image:keyElement3,
    element : Fire
}

export const WaterCard : KeyElementCard = {
    image:keyElement4,
    element : Water
}

export const EarthCard : KeyElementCard = {
    image:keyElement5,
    element : Earth
}

export const keyElementCards : KeyElementCard[] = [
    VoidCard,
    WindCard,
    FireCard,
    WaterCard,
    EarthCard
]  