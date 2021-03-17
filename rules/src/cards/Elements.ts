import Element from "../types/Element";
import ElementTile from "../types/ElementTile";
import ImgVoid from "../images/ElementVoid.png";
import ImgWind from "../images/ElementWind.png";
import ImgFire from "../images/ElementFire.png";
import ImgWater from "../images/ElementWater.png";
import ImgEarth from "../images/ElementEarth.png";

const {Void, Wind, Fire, Water, Earth} = Element

export const ElementVoid : ElementTile = {
    element : Void,
    image : ImgVoid
}

export const ElementWind : ElementTile = {
    element : Wind,
    image : ImgWind
}

export const ElementFire : ElementTile = {
    element : Fire,
    image : ImgFire
}

export const ElementWater : ElementTile = {
    element : Water,
    image : ImgWater
}

export const ElementEarth : ElementTile = {
    element : Earth,
    image : ImgEarth
}

export const ElementBag : ElementTile[] = [
    ElementVoid, ElementVoid, ElementVoid, ElementVoid, ElementVoid, ElementVoid, ElementVoid, ElementVoid, ElementVoid, ElementVoid, ElementVoid, ElementVoid, ElementVoid, ElementVoid, ElementVoid, ElementVoid, ElementVoid, ElementVoid, ElementVoid, ElementVoid, 
    ElementWind, ElementWind, ElementWind, ElementWind, ElementWind, ElementWind, ElementWind, ElementWind, ElementWind, ElementWind, ElementWind, ElementWind, ElementWind, ElementWind, ElementWind, ElementWind, ElementWind, ElementWind, ElementWind, ElementWind, 
    ElementFire, ElementFire, ElementFire, ElementFire, ElementFire, ElementFire, ElementFire, ElementFire, ElementFire, ElementFire, ElementFire, ElementFire, ElementFire, ElementFire, ElementFire, ElementFire, ElementFire, ElementFire, ElementFire, ElementFire, 
    ElementWater, ElementWater, ElementWater, ElementWater, ElementWater, ElementWater, ElementWater, ElementWater, ElementWater, ElementWater, ElementWater, ElementWater, ElementWater, ElementWater, ElementWater, ElementWater, ElementWater, ElementWater, ElementWater, ElementWater, 
    ElementEarth, ElementEarth, ElementEarth, ElementEarth, ElementEarth, ElementEarth, ElementEarth, ElementEarth, ElementEarth, ElementEarth, ElementEarth, ElementEarth, ElementEarth, ElementEarth, ElementEarth, ElementEarth, ElementEarth, ElementEarth, ElementEarth, ElementEarth
]