const SERVER_URL = "https://dummyjson.com";

const PRODUCTS_LIMIT = 8;

const categoriesItem = document.querySelector(".categories");
const itemList = document.querySelector(".items");
const productPage = document.querySelector(".product-page");
const cartBtn = document.querySelector(".cart-btn");
const pagination = document.querySelector(".pagination");

const getCategories = async () => {
	try {
		const res = await fetch(`${SERVER_URL}/products/categories`);

		const data = await res.json();

		return data;
	} catch (error) {
		console.log(error);
	}
};

const getMainPageProducts = async (limit = PRODUCTS_LIMIT, skip = 0) => {
	try {
		const res = await fetch(
			`${SERVER_URL}/products?limit=${limit}&skip=${skip}`
		);

		const data = await res.json();

		return data;
	} catch (error) {
		console.log(error);
	}
};

const getProductsByCategoryName = async (
	categoryName,
	limit = PRODUCTS_LIMIT,
	skip = 0
) => {
	try {
		const res = await fetch(
			`${SERVER_URL}/products/category/${categoryName}?limit=${limit}&skip=${skip}`
		);
		const data = await res.json();
		console.log(data);

		return data;
	} catch (error) {
		console.log(error);
	}
};

const getProductById = async (productId) => {
	try {
		const res = await fetch(`${SERVER_URL}/products/${productId}`);
		const data = await res.json();

		return data;
	} catch (error) {
		console.log(error);
	}
};

const insertProductsCards = (products) => {
	itemList.innerHTML = "";
	products.forEach((product) => {
		itemList.insertAdjacentHTML(
			"beforeend",
			`<div class="item" data-product-id=${product.id}>
				<img class="item-img" src="${product.thumbnail}" alt=${product.title}>
				<p class="item-title">${product.title}</p>
				<p class="item-description">${product.description}</p>
				<p class="item-price">Price: $${product.price}</p>
				<button class="item-btn">Buy</button>
            </div>`
		);
	});
};

const goingBack = () => {
	itemList.classList.remove("hide");
	productPage.classList.add("hide");
};

const showProductPage = (product) => {
	productPage.innerHTML = "";
	itemList.classList.add("hide");
	productPage.classList.remove("hide");

	productPage.insertAdjacentHTML(
		"beforeend",
		`
		<div>
			<button class="item-back-btn">&lt;&lt; BACK</button>
			<img
				src=${product.images[0]}
				alt=${product.title}
				class="item-img"
			>
		</div>
		<div class="item-info">
			<span class="item-category"><b>Category: </b>${product.category}</span>
			<span class="item-title"><b>Title: </b>${product.title}</span>
			<span class="item-brand"><b>Brand: </b>${product.brand}</span>
			<span class="item-sku"><b>Sku: </b>${product.sku}</span>
			<span class="item-description"><b>Description: </b>${product.description}</span>
			<span class="item-rate"><b>Rating: </b>${product.rating}</span>
			<span class="item-status"><b>Availability status: </b>${product.availabilityStatus}</span>
			<span class="item-min-order-quantity"><b>Minimum order quantity: </b>${product.minimumOrderQuantity}</span>
			<span class="item-shipping-info"><b>Shipping information: </b>${product.shippingInformation}</span>
			<span class="item-return-policy"><b>Return of the product: </b>${product.returnPolicy}</span>
			<button class="item-buy-btn">Buy</button>
		</div>`
	);
	const btnBack = document.querySelector(".item-back-btn");
	btnBack.addEventListener("click", goingBack);
};

const addToCart = (product) => {
	const cart = JSON.parse(localStorage.getItem("cart"));

	if (cart) {
		cart.push(product);
		localStorage.setItem("cart", JSON.stringify(cart));
	} else {
		localStorage.setItem("cart", JSON.stringify([product]));
	}
};

const createPagination = (totalProducts, categories) => {
	pagination.innerHTML = "";
	const totalPages = Math.ceil(totalProducts / PRODUCTS_LIMIT);

	for (let i = 1; i <= totalPages; i++) {
		pagination.insertAdjacentHTML(
			"beforeend",
			`
			<div class="pagination">
				<span class="pagination-btn" data-page-number="${i}" data-category=${categories}>${i}</span>
			</div>`
		);
	}
};

const handlePageChange = async (e) => {
	const target = e.target;

	if (target.closest(".pagination-btn")) {
		const pageNumber = Number(target.dataset.pageNumber);
		const categoryName = target.dataset.category;
		const skip = (pageNumber - 1) * PRODUCTS_LIMIT;
		const products = await getProductsByCategoryName(
			categoryName,
			PRODUCTS_LIMIT,
			skip
		);

		insertProductsCards(products.products);
	}
};

const firstPageProducts = async () => {
	const data = await getMainPageProducts();
	if (data && data.products) {
		insertProductsCards(data.products);
	} else {
		console.warn("No products found");
	}
};

const handleSelectCategory = async (e) => {
	const target = e.target;
	if (target.closest(".categories-item")) {
		const categoryName = target.dataset.category;
		itemList.innerHTML = "";

		const products = await getProductsByCategoryName(categoryName);

		insertProductsCards(products.products);
		createPagination(products.total, categoryName);
		return products;
	}
};

const handleSelectProductCard = async (e) => {
	const target = e.target;
	const productCard = target.closest(".item");
	const buyBtn = target.closest(".item-btn");
	if (!productCard) {
		return;
	}

	const productId = productCard.dataset.productId;
	const product = await getProductById(productId);

	if (!buyBtn) {
		showProductPage(product);
	} else {
		addToCart(product);
	}
};

const init = async () => {
	const categories = await getCategories();

	const allProducts = await firstPageProducts();
	categories.forEach((category) => {
		categoriesItem.insertAdjacentHTML(
			"beforeend",
			`<li class="categories-item" data-category=${category.slug}>${category.name}</li>`
		);
	});

	firstPageProducts(allProducts);
};

categoriesItem.addEventListener("click", handleSelectCategory);

itemList.addEventListener("click", handleSelectProductCard);

cartBtn.addEventListener("click", () => {
	const cart = JSON.parse(localStorage.getItem("cart"));

	if (cart) {
		insertProductsCards(cart);

		itemList.insertAdjacentHTML(
			"afterbegin",
			`<button class="clear-cart-btn">Clear cart</button>
			<button class="buy-btn">Buy button</button>
			`
		);

		const clearCardBtn = document.querySelector(".clear-cart-btn");
		const buyBtn = document.querySelector(".buy-btn");

		clearCardBtn.addEventListener("click", () => {
			itemList.innerHTML = "<h2>Корзина пуста</h2>";
			localStorage.removeItem("cart");
		});

		buyBtn.addEventListener("click", handleBuy);
		// СОздать функцию handleBuy и вывести в консоль массив корзины
	}
});
pagination.addEventListener("click", handlePageChange);

document.addEventListener("DOMContentLoaded", () => {
	init();
});
