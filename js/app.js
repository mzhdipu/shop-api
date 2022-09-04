const loadAllProducts = async () => {
    productUrl = `https://fakestoreapi.com/products`;

    const res = await fetch(productUrl);
    const data = await res.json();
    return data;
}
const setAllMenus = async () => {
    const data = await loadAllProducts();

    // SET MENU
    const menu = document.getElementById("menu");

    const uniqArray = [];

    data.forEach(products => {

        if ((uniqArray.lastIndexOf(products.category) == -1)) {
            uniqArray.push(products.category);

            const div = document.createElement("div");
            div.innerHTML = `
            <ul class="menu w-56 bg-secondary text-secondary-content p-2 rounded-box">
                <li><a>${products.category}</a></li>
            </ul>
        `;
            menu.appendChild(div)
        }


    })
}
setAllMenus();



// ADDED SEARCH 
const searchField = document.getElementById("search-field");
searchField.addEventListener("keypress", async (event) => {

    if (event.key == "Enter") {
        // searchField.value
        const searchText = searchField.value;
        const allProduct = await loadAllProducts();

        const findProduct = allProduct.filter(product => product.category.includes(searchText))

        const notFound = document.getElementById("not-found")
        if (findProduct.length === 0) {
            notFound.classList.remove("hidden");
        } else {
            notFound.classList.add("hidden")
            console.log(findProduct.length)
        }

        // display all product
        const showAllProduct = document.getElementById("show-all-product");
        showAllProduct.innerText = ""

        findProduct.forEach(showProducts => {
            //console.log(showProducts);

            const div = document.createElement("div");
            div.innerHTML = `
            <div class="card w-96 bg-base-100 shadow-xl">
                <figure><img src="${showProducts.image}" alt="Shoes" /></figure>
                <div class="card-body">
                <h2 class="card-title">${showProducts.title}</h2>
                <p>${showProducts.description.length > 15 ? showProducts.description.slice(0, 20) + "..." : showProducts.description}</p>
                <div class="card-actions justify-end">
                <label onclick="showModal('${showProducts.image}','${showProducts.title}', '${showProducts.description}');" for="my-modal-3" class="btn btn-primary modal-button">View Details</label>
                </div>
                </div>
            </div>
            `;

            showAllProduct.appendChild(div);
        })
    }
})


const showModal = (image, title, description) => {
    const showModal = document.getElementById("show-modal");
    showModal.innerText = ""
    const div = document.createElement("div");
    div.innerHTML = `
   <div class="modal-box relative">
        <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <img src="${image}" alt="">
        <h3 class="text-lg font-bold">${title}</h3>
        <p class="py-4">${description}</p>
    </div>
   `;
    showModal.appendChild(div)
}