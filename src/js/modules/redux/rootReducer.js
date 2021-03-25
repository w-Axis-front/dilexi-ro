import { combineReducers } from "redux";
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

const initialCartState = {
	products: [],
	price: 0,
	oldPrice: 0,
	currency: "",
	hasErrors: false
};

function cartReducer(state = initialCartState, action) {
	switch (action.type) {
		case SET_PRICES:
			return {
				...state,
				price: action.payload.price,
				oldPrice: action.payload.oldPrice,
				currency: action.payload.currency
			};
		case SET_PRODUCTS:
			return {
				...state,
				products: action.payload
			};
		case ADD_TO_CART:
			return {
				...state,
				products: state.products.map((product) => {
					const p = { ...product };
					if (p.id == action.payload) p.added = true;
					return p;
				})
			};
		case REMOVE_FROM_CART:
			return {
				...state,
				products: state.products.map((product) => {
					const p = { ...product };
					if (p.id == action.payload) p.added = false;
					return p;
				})
			};
		case INCREMENT_ITEM:
			return {
				...state,
				products: state.products.map((product) => {
					const p = { ...product };
					if (p.id == action.payload) {
						p.count++;
						const pSizes = [...p.sizes];
						pSizes.push(null);
						p.sizes = pSizes;
					}
					return p;
				})
			};
		case DECREMET_ITEM:
			return {
				...state,
				products: state.products.map((product) => {
					const p = { ...product };
					if (p.id == action.payload) {
						if (p.count > 1) {
							p.count--;
							const pSizes = [...p.sizes];
							pSizes.pop();
							p.sizes = pSizes;
						} else {
							p.added = false;
						}
					}
					return p;
				})
			};
		case SET_ITEM_SIZE:
			return {
				...state,
				products: state.products.map((product) => {
					const p = { ...product };
					if (p.id == action.payload.id) {
						const pSizes = [...p.sizes];
						pSizes[action.payload.position] = action.payload.size;
						p.sizes = pSizes;
					}
					return p;
				})
			};
		case REMOVE_ITEM_SIZE:
			return {
				...state,
				products: state.products.map((product) => {
					const p = { ...product };
					if (p.id == action.payload.id) {
						if (p.count == 1) {
							p.added = false;
						} else {
							const pSizes = p.sizes.filter(
								(s, i) => i != action.payload.position
							);
							p.sizes = pSizes;
							p.count = pSizes.length;
						}
					}
					return p;
				})
			};
		case SET_ERRORS:
			return {
				...state,
				hasErrors: action.payload
			};
		default:
			return state;
	}
}

export const rootReducer = combineReducers({
	cart: cartReducer
});
