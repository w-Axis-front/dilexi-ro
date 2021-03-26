// @ts-check
import _ from "underscore";
import {
    setPrices,
    setProducts,
    addToCart,
    removeFromCart,
    incrementItem,
    decrementItem,
    setItemSize,
    removeItemSize,
    setErrors
} from "./redux/actions";
import {store} from "../main";

export default function updateStore() {
    //set card prices to store
    store.dispatch(setPrices({
        price: +window.price || 0,
        oldPrice: +window.oldPrice || 0,
        currency: window.currency || ""
    }));
    //set cards to store
    const cards = $(".assortment__grid .assortment__card");
    store.dispatch(
        setProducts(
            _.map(cards, (card) => {
                const img = $(card).find(".assortment__card-img");
                return {
                    id: $(card).data("id"),
                    name: $(card).find(".assortment__card-title").text(),
                    img: img.attr("src"),
                    img2x: img.attr("srcset"),
                    imgAlt: img.attr("alt"),
                    count: 1,
                    sizes: [null],
                    added: false
                };
            })
        )
    );

    //get store items (for compare with updated store)
    let {
        products: productsPrev,
        price: pricePrev,
        oldPrice: oldPricePrev,
        currency: currencyPrev,
        hasErrors: hasErrorsPrev
    } = store.getState().cart;

    //card Variables
    let totalItems = 0;
    let sizedItems = 0;

    //get cards DOM elements
    const cardBtns = $(".js_card-btn");
    const incItem = $(".js_inc-item");
    const decItem = $(".js_dec-item");
    const itemSize = $(".assortment__card-sizes span");
    const removeItem = $(".js_card-remove");
    //get cart DOM
    const orderGift = $(".order__gift").hide();
    const orderTable = $(".order__table-wrapper").hide();
    const totalItemsNode = $(".js__total-items");
    const totalPriceNode = $(".js__total-promo-price");
    const totalDiscounrPriceNode = $(".js__total-price");
    const formProducts = $("#order-products");
    const formCount = $("#order-count");
    const orderSubmit = $(".js_order-submit");
    const emptyCartError = $("#order__empty-cart-err");

    //get locale texts from DOM =))
    const orderCountTitle = orderTable.find(".order_count-title").text();
    const orderSizeTitle = orderTable.find(".order_size-title").text();
    const orderPriceTitle = orderTable.find(".order_price-title").text();
    const orderSizeError = orderTable.find(".order_size-error").text();

    //set card events
    cardBtns.on("click", function (e) {
        e.preventDefault();
        //get card
        const card = $(this).parents(".assortment__card");
        if (!card.length) return;
        //dispatch new item
        store.dispatch(addToCart(card.data("id")));
    });

    incItem.on("click", function (e) {
        e.preventDefault();
        //get card
        const card = $(this).parents(".assortment__card");
        if (!card.length) return;

        //dispatch increment item
        store.dispatch(incrementItem(card.data("id")));
    });

    decItem.on("click", function (e) {
        e.preventDefault();
        //get card
        const card = $(this).parents(".assortment__card");
        if (!card.length) return;

        //dispatch decrement item
        store.dispatch(decrementItem(card.data("id")));
    });

    itemSize.on("click", function (e) {
        e.preventDefault();

        const card = $(this).parents(".assortment__card");
        if (!card.length) return;
        const cardID = card.data("id");

        //set first size
        store.dispatch(setItemSize(cardID, $(this).text(), 0));
    });

    removeItem.on("click", function (e) {
        e.preventDefault();
        //get card
        const card = $(this).parents(".assortment__card");
        if (!card.length) return;

        //dispatch decrement item
        store.dispatch(removeFromCart(card.data("id")));
    });

    //set order events
    //add size for product
    $(document).on("click", ".js_order-add", function (e) {
        e.preventDefault();
        const product = $(this).parents("[data-id]");
        if (!product.length) return;

        //dispatch remove from order
        store.dispatch(incrementItem(product.data("id")));
    });

    //remove one size from cart
    $(document).on("click", ".js_order-remove", function (e) {
        e.preventDefault();
        const product = $(this).parents("[data-id]");
        const productRow = $(this).parents("[data-index]");
        if (!product.length || !productRow.length) return;

        //dispatch remove from order
        store.dispatch(
            removeItemSize(product.data("id"), productRow.data("index"))
        );
    });

    //show sizes
    $(document).on("click", ".js_show-size", function (e) {
        e.preventDefault();
        const productRow = $(this).parents(".order__table-subrow");
        if (!productRow.length) return;
        productRow.addClass("sizes-shown");
    });

    //set size from cart
    $(document).on("click", ".js_set-size", function (e) {
        e.preventDefault();
        const product = $(this).parents("[data-id]");
        const productRow = $(this).parents("[data-index]");
        if (!product.length || !productRow.length) return;

        //dispatch set size from order
        store.dispatch(
            setItemSize(product.data("id"), $(this).text(), productRow.data("index"))
        );
    });

    orderSubmit.on("click", function (e) {
        if ($(this).hasClass("disabled")) {
            e.preventDefault();
            emptyCartError.show();
            setTimeout(function () {
                $("html, body").animate(
                    {
                        scrollTop: $("#assortment").offset().top
                    },
                    800
                );
            }, 1000);
        } else if (totalItems != sizedItems) {
            e.preventDefault();
            store.dispatch(setErrors(true));
        } else {
            store.dispatch(setErrors(false));
        }
    });

    //methods
    function changeProductState(product) {
        //find card
        const card = $(`.assortment__card[data-id="${product.id}"]`);
        //set active class
        if (product.added) {
            card.addClass("active");
        } else {
            card.removeClass("active");
        }
        //set count
        card.find(".assortment__card-count-number").text(product.count);
        //set changed size
        const cardSizes = card.find(".assortment__card-sizes span");
        cardSizes.removeClass("active");
        if (product.sizes[0]) {
            cardSizes
                .filter(`.assortment__card-size-${product.sizes[0].toLowerCase()}`)
                .addClass("active");
        }
    }

    //toggle submit btn
    function toggleSubmitBtn(itemsCount) {
        if (itemsCount > 0) orderSubmit.removeClass("disabled");
        else orderSubmit.addClass("disabled");
    }

    //update cart method
    function updateCart(products, oldPrice, price, currency, hasErrors) {
        //reset cart
        orderGift.hide().removeClass("won");
        orderTable.find(".order__table-row").remove();
        emptyCartError.hide();

        const allSizes = ["S", "M", "L", "XL", "XXL", "XXXL", "4XL", "5XL", "6XL"];
        let formProductsVal = "";
        totalItems = 0;
        sizedItems = 0;

        const orderRows = products.reduce((productsRows, product) => {
            if (product.added) {
                // create product row
                const orderProduct = $(
                    `<div class="order__table-row" data-id=${product.id}></div>`
                );
                orderProduct.append(
                    product.sizes.map((size, index) => {
                        totalItems++;
                        if (size) {
                            formProductsVal += `${product.name} - ${size}; `;
                            sizedItems++;
                        }

                        formProducts.val;
                        const productRow = $(
                            `<div class="order__table-subrow ${
                                index ? "order__table-row-same" : "order__table-row-first"
                            }${
                                !size && hasErrors ? " sizes-shown error" : ""
                            }" data-index="${index}"></div>`
                        );

                        //append add button
                        productRow.append(
                            "<div class='order__table-column1'><div class='order__table-add-btn js_order-add'><div class='order__table-add-icon'></div></div></div>"
                        );
                        //append img & title
                        productRow.append(
                            `<div class='order__table-column2'><img class="order__table-product-img" src="${product.img}" srcset="${product.img2x}" alt="${product.imgAlt}" /><p class="order__table-product-title">${product.name}</p></div>`
                        );

                        //append count & size
                        productRow.append(
                            `<div class="order__table-column-group"><div class="order__table-column3"><p><span>${orderCountTitle}:</span> <span>1</span></p></div><div class="order__table-column4"><p class="order__table-column4-content"><span>${orderSizeTitle}:</span> <span class="js_show-size"><span class="order__table-product-size">${
                                size ? size : orderSizeTitle.toLowerCase()
                            }</span> <svg class="order__table-arrow-down-img" width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="stroke" d="M1.49264 1.28902L6.44238 6.23877L11.3921 1.28902" stroke-width="2"></path></svg></span></p><div class="order__table-product-sizes-wrapper"><div class="order__table-product-sizes">${allSizes.reduce(
                                (a, s) =>
                                    a +
                                    `<p class="order__table-product-size-item${
                                        s == size ? " active" : ""
                                    } js_set-size">${s}</p>`,
                                ""
                            )}</div></div><p class="order__no_size-err">${orderSizeError}</p></div><div class='order__table-column5'><span>${orderPriceTitle}:</span> <span>${price} ${currency}</span></div></div></div>`
                        );

                        //append delet btn
                        productRow.append(
                            "<div class='order__table-column6'><div class='order__table-bin-btn js_order-remove'><svg class='order__table-bin-img' width='22' height='25' viewBox='0 0 22 25' fill='none' xmlns='http://www.w3.org/2000/svg'><g id='trash'><rect class='stroke' x='3.89334' y='4.37292' width='13.7502' height='18.877' stroke-width='2'></rect><path class='stroke' d='M0.00762939 4.08069H21.5922' stroke-width='2'></path><path class='stroke' d='M8.08713 8.09106V19.8859' stroke-width='2'></path><path class='stroke' d='M14.3227 3.27302V3.27302C14.3227 2.15574 13.4169 1.25 12.2996 1.25H9.23725C8.11997 1.25 7.21423 2.15574 7.21423 3.27302V3.27302' stroke-width='2'></path><path class='stroke' d='M13.1589 8.09106V19.8859' stroke-width='2'></path></g></svg></div></div>"
                        );

                        return productRow;
                    })
                );

                productsRows.push(orderProduct);
            }

            return productsRows;
        }, []);

        totalItemsNode.text(totalItems);
        totalPriceNode.text(totalItems * oldPrice + " " + currency);
        formCount.val(totalItems);
        totalDiscounrPriceNode.text(totalItems * price + " " + currency);
        toggleSubmitBtn(totalItems);

        if (totalItems > 0) {
            orderTable.append(orderRows).show();
            formProducts.val(formProductsVal);
            if (totalItems > 1) {
                orderGift.addClass("won");
            }
            orderGift.show();
        } else {
            orderTable.hide();
        }
    }

    //subscribe store
    store.subscribe(() => {
        const {
            products,
            price,
            oldPrice,
            currency,
            hasErrors
        } = store.getState().cart;

        if (!_.isEqual(products, productsPrev) || hasErrors != hasErrorsPrev) {
            updateCart(products, oldPrice, price, currency, hasErrors);
            products.forEach((product, index) => {
                if (_.isEqual(product, productsPrev[index])) return;
                changeProductState(product);
            });
        }

        productsPrev = products;
        pricePrev = price;
        oldPricePrev = oldPrice;
        currencyPrev = currency;
        hasErrorsPrev = hasErrors;
    });
}
