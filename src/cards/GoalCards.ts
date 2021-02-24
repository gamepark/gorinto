import GoalCard from "../types/GoalCard";

export const GoalCard1 : GoalCard = {
    image : "url(../images/GoalCard1.jpg)",
    goal : "Score each stack that is the same height as one or more of your other stacks.",
    conflictLetter : "A"
}

export const GoalCard2 : GoalCard = {
    image : "url(../images/GoalCard2.jpg)",
    goal : "Score each stack that is a different height than all of your other stacks.",
    conflictLetter : "A"
}
export const GoalCard3 : GoalCard = {
    image : "url(../images/GoalCard3.jpg)",
    goal : "Score each stack with an odd number of tiles.",
    conflictLetter : "B"
}

export const GoalCard4 : GoalCard = {
    image : "url(../images/GoalCard4.jpg)",
    goal : "Score each stack with an even number of tiles.",
    conflictLetter : "B"
}

export const GoalCard5 : GoalCard = {
    image : "url(../images/GoalCard5.jpg)",
    goalSubtitle : "Resolve the five elements separately",
    goal : "For each element, the player or players with the tallest stack (of at least 1 tile) scores 3.",
    conflictLetter : "C"
}

export const GoalCard6 : GoalCard = {
    image : "url(../images/GoalCard6.jpg)",
    goalSubtitle : "Resolve the five elements separately",
    goal : "For each element, the player or players with the shortest stack (of at least 1 tile) scores 3.",
    conflictLetter : "C"
}

export const GoalCard7 : GoalCard = {
    image : "url(../images/GoalCard7.jpg)",
    goalSubtitle : "Imagine your stacks lined up from shortest to tallest (including stacks of zero).",
    goal : "Score each stack that is a different height than the stack in the middle.",
    conflictLetter : "D"
}

export const GoalCard8 : GoalCard = {
    image : "url(../images/GoalCard8.jpg)",
    goalSubtitle : "Imagine your stacks lined up from shortest to tallest (including stacks of zero).",
    goal : "Score the stack in the middle three times.",
    conflictLetter : "D"
}

export const GoalCard9 : GoalCard = {
    image : "url(../images/GoalCard9.jpg)",
    goal : "Score your tallest stack and also any stack tied with it. Score your shortest stack and also any stack tied with it.",
    conflictLetter : ""
}

export const GoalCard10 : GoalCard = {
    image : "url(../images/GoalCard10.jpg)",
    goal : "Score your tallest stack. Score your shortest stack (of at least one tile) twice.",
    conflictLetter : ""
}

export const GoalCard11 : GoalCard = {
    image : "url(../images/GoalCard11.jpg)",
    goalSubtitle : "A stack of zero may be counted as your shorted stack.",
    goal : "Score twice the difference between your tallest stack and your shortest stack.",
    conflictLetter : ""
}

export const GoalCard12 : GoalCard = {
    image : "url(../images/GoalCard12.jpg)",
    goal : "If you have any empty stacks, score zero. Otherwise, score your shortest stack seven times.",
    conflictLetter : ""
}

export const GoalCards : GoalCard[] = [
    GoalCard1,GoalCard2,
    GoalCard3, GoalCard4,
    GoalCard5, GoalCard6,
    GoalCard7, GoalCard8,
    GoalCard9,
    GoalCard10,
    GoalCard11,
    GoalCard12
]