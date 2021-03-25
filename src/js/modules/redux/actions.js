import {
	SET_PRICES,
	SET_PRODUCTS,
	ADD_TO_CART,
	REMOVE_FROM_CART,
	INCREMENT_ITEM,
	DECREMET_ITEM,
	SET_ITEM_SIZE,
	REMOVE_ITEM_SIZE,
	SET_ERRORS
} from "./types";

export function setPrices({ price, oldPrice, currency }) {
	return {
		type: SET_PRICES,
		payload: { price, oldPrice, currency }
	};
}

export function setProducts(products) {
	return {
		type: SET_PRODUCTS,
		payload: products
	};
}

export function addToCart(id) {
	return {
		type: ADD_TO_CART,
		payload: id
	};
}

export function removeFromCart(id) {
	return {
		type: REMOVE_FROM_CART,
		payload: id
	};
}

export function incrementItem(id) {
	return {
		type: INCREMENT_ITEM,
		payload: id
	};
}

export function decrementItem(id) {
	return {
		type: DECREMET_ITEM,
		payload: id
	};
}

export function setItemSize(id, size, position) {
	return {
		type: SET_ITEM_SIZE,
		payload: { id, size, position }
	};
}

export function removeItemSize(id, position) {
	return {
		type: REMOVE_ITEM_SIZE,
		payload: { id, position }
	};
}

export function setErrors(hasErrors) {
	return {
		type: SET_ERRORS,
		payload: hasErrors
	};
}
