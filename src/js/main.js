// Main JS module
import $ from "jquery";
import { createStore } from "redux";
import { rootReducer } from "./modules/redux/rootReducer";
// objectFitImages polyfill
import objectFitImages from "object-fit-images";
import nav from "./modules/nav";
import scrollContent from "./modules/scrollContent";
import slider from "./modules/slider";
import countTime from "./modules/countTime";
import updateStore from "./modules/updateStore";
import animateContent from "./modules/animateContent";

export const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

$(function () {
	objectFitImages();
	nav();
	scrollContent();
	countTime();
	slider();
	updateStore();
	animateContent();
});
