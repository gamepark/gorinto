import goalCard1 from '../images/GoalCard1.jpg';
import goalCard2 from '../images/GoalCard2.jpg';
import goalCard3 from '../images/GoalCard3.jpg';
import goalCard4 from '../images/GoalCard4.jpg';
import goalCard5 from '../images/GoalCard5.jpg';
import goalCard6 from '../images/GoalCard6.jpg';
import goalCard7 from '../images/GoalCard7.jpg';
import goalCard8 from '../images/GoalCard8.jpg';
import goalCard9 from '../images/GoalCard9.jpg';
import goalCard10 from '../images/GoalCard10.jpg';
import goalCard11 from '../images/GoalCard11.jpg';
import goalCard12 from '../images/GoalCard12.jpg';
import Goal from "../types/Goal";

export const Goal1 : Goal = {
    image : goalCard1,
    text : t => t("Score each stack that is the same height as one or more of your other stacks."),
    conflictLetter : "A"
}

export const Goal2 : Goal = {
    image : goalCard2,
    text : t => t("Score each stack that is a different height than all of your other stacks."),
    conflictLetter : "A"
}
export const Goal3 : Goal = {
    image : goalCard3,
    text : t => t("Score each stack with an odd number of tiles."),
    conflictLetter : "B"
}

export const Goal4 : Goal = {
    image : goalCard4,
    text : t => t("Score each stack with an even number of tiles."),
    conflictLetter : "B"
}

export const Goal5 : Goal = {
    image : goalCard5,
    hint : t => t("Resolve the five elements separately"),
    text : t => t("For each element, the player or players with the tallest stack (of at least 1 tile) scores 3."),
    conflictLetter : "C"
}

export const Goal6 : Goal = {
    image : goalCard6,
    hint : t => t("Resolve the five elements separately"),
    text : t => t("For each element, the player or players with the shortest stack (of at least 1 tile) scores 3."),
    conflictLetter : "C"
}

export const Goal7 : Goal = {
    image : goalCard7,
    hint : t => t("Imagine your stacks lined up from shortest to tallest (including stacks of zero)."),
    text : t => t("Score each stack that is a different height than the stack in the middle."),
    conflictLetter : "D"
}

export const Goal8 : Goal = {
    image : goalCard8,
    hint : t => t("Imagine your stacks lined up from shortest to tallest (including stacks of zero)."),
    text : t => t("Score the stack in the middle three times."),
    conflictLetter : "D"
}

export const Goal9 : Goal = {
    image : goalCard9,
    text : t => t("Score your tallest stack and also any stack tied with it. Score your shortest stack and also any stack tied with it."),
    conflictLetter : ""
}

export const Goal10 : Goal = {
    image : goalCard10,
    text : t => t("Score your tallest stack. Score your shortest stack (of at least one tile) twice."),
    conflictLetter : ""
}

export const Goal11 : Goal = {
    image : goalCard11,
    hint : t => t("A stack of zero may be counted as your shorted stack."),
    text : t => t("Score twice the difference between your tallest stack and your shortest stack."),
    conflictLetter : ""
}

export const Goal12 : Goal = {
    image : goalCard12,
    text : t => t("If you have any empty stacks, score zero. Otherwise, score your shortest stack seven times."),
    conflictLetter : ""
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