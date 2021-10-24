/** @jsxImportSource @emotion/react */
import {HTMLAttributes, useEffect, useState} from 'react'

type Props = {
  score: number
} & HTMLAttributes<HTMLDivElement>

export default function ScoreDisplay({score, ...props}: Props) {
  const [displayedScore, setDisplayedScore] = useState(score)

  useEffect(() => {
    let interval: NodeJS.Timer | undefined = undefined

    function updateDisplayedScore(score: number) {
      setDisplayedScore(displayedScore => {
        if (score === displayedScore) {
          if (interval) clearInterval(interval)
          return displayedScore
        } else {
          if (!interval) {
            interval = setInterval(() => updateDisplayedScore(score), 4000 / Math.abs(score - displayedScore))
          }
          return score > displayedScore ? displayedScore + 1 : displayedScore - 1
        }
      })
    }

    updateDisplayedScore(score)

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [score])

  return <div {...props}>{displayedScore}</div>
}