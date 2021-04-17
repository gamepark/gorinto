import React, {FC, useEffect, useRef} from 'react'

type Props = {
    sounds: string[]
    onSoundLoad?: () => void
  }

const SoundLoader : FC<Props> = ({sounds, onSoundLoad}) => {

    const loadCount = useRef(0)
    const totalLoadCount = sounds.length

    useEffect(() => {
        console.log("loading sound")
        sounds.forEach(sound => {
            let audio = new Audio()
            audio.addEventListener('canplaythrough',onLoad,false)
            audio.src = sound;
        })
    }, [])


    const onLoad = () => {
        loadCount.current++
        if (onSoundLoad && loadCount.current === totalLoadCount){
            onSoundLoad();
        }
    }

    return null

}

export default SoundLoader
