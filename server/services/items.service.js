import {itemStatesConstants} from "../constants/item-states.constants.js"

let items = [];

let count = 0;

export const getAllItems = () => {
    return items
}

export const addItemToList = (item) => {
    items.push({...item, id: count, state: itemStatesConstants.new})

    count++
}

export const toToggleStatusOfItem = (id) => {
    const item = items.find(element => element.id === +id);

    if (item.state === itemStatesConstants.done) {
        item.state = itemStatesConstants.new
    } else if (item.state === itemStatesConstants.new) {
        item.state = itemStatesConstants.done
    }

    return item
}

export const toDeleteItem = (id) => {
    items = items.filter(element => element.id !== +id)

    return items
}

export const isThereSuchItem = (id) => {
    return !!items.find(element => element.id === +id)
}