import Goal from '../types/Goal'

export const Goal1 : Goal = {
    text : t => t("Score each stack that is the same height as one or more of your other stacks."),
    conflictLetter : "A"
}

export const Goal2 : Goal = {
    text : t => t("Score each stack that is a different height than all of your other stacks."),
    conflictLetter : "A"
}
export const Goal3 : Goal = {
    text : t => t("Score each stack with an odd number of tiles."),
    conflictLetter : "B"
}

export const Goal4 : Goal = {
    text : t => t("Score each stack with an even number of tiles."),
    conflictLetter : "B"
}

export const Goal5 : Goal = {
    hint : t => t("Resolve the five elements separately"),
    text : t => t("For each element, the player or players with the tallest stack (of at least 1 tile) scores 3."),
    conflictLetter : "C"
}

export const Goal6 : Goal = {
    hint : t => t("Resolve the five elements separately"),
    text : t => t("For each element, the player or players with the shortest stack (of at least 1 tile) scores 3."),
    conflictLetter : "C"
}

export const Goal7 : Goal = {
    hint : t => t("Imagine your stacks lined up from shortest to tallest (including stacks of zero)."),
    text : t => t("Score each stack that is a different height than the stack in the middle."),
    conflictLetter : "D"
}

export const Goal8 : Goal = {
    hint : t => t("Imagine your stacks lined up from shortest to tallest (including stacks of zero)."),
    text : t => t("Score the stack in the middle three times."),
    conflictLetter : "D"
}

export const Goal9 : Goal = {
    text : t => t("Score your tallest stack and also any stack tied with it. Score your shortest stack and also any stack tied with it."),
}

export const Goal10 : Goal = {
    text : t => t("Score your tallest stack. Score your shortest stack (of at least one tile) twice."),
}

export const Goal11 : Goal = {
    hint : t => t("A stack of zero may be counted as your shorted stack."),
    text : t => t("Score twice the difference between your tallest stack and your shortest stack."),
}

export const Goal12 : Goal = {
    text : t => t("If you have any empty stacks, score zero. Otherwise, score your shortest stack seven times."),
}

export const Goals : Goal[] = [
    Goal1,Goal2,
    Goal3, Goal4,
    Goal5, Goal6,
    Goal7, Goal8,
    Goal9,
    Goal10,
    Goal11,
    Goal12

]