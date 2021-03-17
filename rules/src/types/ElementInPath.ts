type ElementInPath = {
    type:"ElementInPath", 
    path: "horizontal" | "vertical", 
    position: number
    hoverPile: (pileHeight:number) => void
}

export default ElementInPath