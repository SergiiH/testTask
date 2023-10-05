if (document.readyState !== "loading") {
  setTimeout(function () {
    const productUrl = "https://blank-sunglasses.com/products/john.js";
    fetch(productUrl)
      .then((response) => response.json())
      .then((productData) => {
        console.log(productData);
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
          <div class="cart-item-container">
              <div class="product-image">
                <img class="img" src="${
                  productData.media[0].src
                }" alt="Product Image">
              </div>
              <div class="product-details">
                <h3 class="product-details-title">${productData.title}</h3>
                <p class="product-details-price">Price: ${
                  productData.price / 100
                }</p>
                <select class="variantSelector"></select>
                <div class="product-control"> 
                  <button type="button" class="add-to-cart-button">Add to Cart</button>
                  <div class="quantity-container">
                      <button type="button" class="quantity-add">+</button>
                          <p class="quantity">1</p>
                      <button type="button" class="quantity-minus">-</button>
                  </div>
                </div>
                
              </div>
          </div>
          `;

        const drawer = document.querySelectorAll(".Drawer__Main")[1];
        drawer.appendChild(cartItem);
      });
  }, 300);
  setTimeout(function () {
    const productUrl = "https://blank-sunglasses.com/products/john.js";
    fetch(productUrl)
      .then((response) => response.json())
      .then((productData) => {
        const drawer = document.querySelectorAll(".Drawer__Main")[1];
        const variantDropdown = document.querySelector(".variantSelector");

        productData.variants.forEach((variant) => {
          const option = document.createElement("option");
          option.value = variant.id;
          option.text = variant.title;
          variantDropdown.appendChild(option);
        });

        variantDropdown.addEventListener("change", (e) => {
          console.log("asdas");
          const img = document.querySelector(".img");
          console.log(e.target.value);
          img.src = productData.variants.find(
            (el) => el.id === Number(e.target.value)
          ).featured_image.src;
        });

        const buttonAdd = document.querySelector(".quantity-add");

        buttonAdd.addEventListener("click", () => {
          const quantity = document.querySelector(".quantity");
          quantity.innerHTML = Number(quantity.innerHTML) + 1;
        });

        const buttonMinus = document.querySelector(".quantity-minus");

        buttonMinus.addEventListener("click", () => {
          const quantity = document.querySelector(".quantity");
          if (Number(quantity.innerHTML) !== 1)
            quantity.innerHTML = Number(quantity.innerHTML) - 1;
        });

        const button = document.querySelector(".add-to-cart-button");
        button.addEventListener("click", () => {
          const quantity = Number(
            document.querySelector(".quantity").innerHTML
          );
          console.log(variantDropdown.value);
          fetch("/cart/add.js", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: [
                {
                  id: variantDropdown.value,
                  quantity,
                },
              ],
            }),
          }).then((response) => {
            // Check the response and handle success or errors
            if (response.status === 200) {
              // Product added to cart successfully
              console.log("Selected variant added to cart.");
            } else {
              // Handle errors
              console.error("Error adding product to cart.");
            }
          });
        });
      });
  }, 350);
}
