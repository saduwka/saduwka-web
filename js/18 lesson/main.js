const SERVER_URL = "https://dummyjson.com";
const categoriesItem = document.querySelector(".categories");
const itemList = document.querySelector(".items");

const getCategories = async () => {
	try {
		const res = await fetch(`${SERVER_URL}/products/categories`);

		const data = await res.json();

		return data;
	} catch (error) {
		console.log(error);
	}
};

const getMainPageProducts = async () => {
	try {
		const res = await fetch(`${SERVER_URL}/products`);
		if (!res.ok) throw new Error("Failed to fetch products");
		return await res.json();
	} catch {
		console.error("Error fetching main page products:", error);
	}
};

const insertProductsCards = (products) => {
	itemList.innerHTML = "";
	products.forEach((product) => {
		itemList.insertAdjacentHTML(
			"beforeend",
			`<div class="item">
            <img class="item-img" src="${product.images[0]}" alt="Image">
            <p class="item-title">${product.title}</p>
            <p class="item-description">${product.description}</p>
            <p class="item-price">Price: $${product.price}</p>
            <button class="item-btn">Buy</button>
            </div>`
		);
	});
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
		return products;
	}
};

const getProductsByCategoryName = async (categoryName) => {
	try {
		const res = await fetch(`${SERVER_URL}/products/category/${categoryName}`);
		const data = await res.json();
		console.log(data);

		return data;
	} catch (error) {
		console.log(error);
	}
};

const init = async () => {
	const categories = await getCategories();
	categories.forEach((category) => {
		categoriesItem.insertAdjacentHTML(
			"beforeend",
			`<li class="categories-item" data-category=${category.slug}>${category.name}</li>`
		);
	});
};

categoriesItem.addEventListener("click", handleSelectCategory);

document.addEventListener("DOMContentLoaded", () => {
	init();
	firstPageProducts();
});
