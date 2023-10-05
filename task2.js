if (document.readyState !== "loading") {
  setTimeout(() => {
    const products = [];
    let currentPage = 1;
    let loading = false;

    // Function to fetch products for the given page
    function fetchProducts(page) {
      if (loading) return; // Prevent multiple concurrent requests

      loading = true;

      // Make an AJAX request to fetch products for the given page
      const url = `https://blank-sunglasses.com/collections/most-wanted?page=${page}`;

      fetch(url)
        .then((response) => response.text())
        .then((html) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");

          const newProducts = doc.querySelectorAll(".Grid__Cell");

          if (newProducts.length === 0) {
            const productList = document.querySelector(".ProductListWrapper");
            const newDiv = document.createElement("h1");
            newDiv.className = "loaded";
            newDiv.innerHTML = `All product loaded`;
            productList.appendChild(newDiv);
            console.log(productList);
            console.log(newDiv);
            window.removeEventListener("scroll", handleScroll); // Remove scroll event listener
          } else {
            const productList = document.querySelector(".ProductList");
            newProducts.forEach((product) => {
              productList.appendChild(product);
              console.log(product);
            });

            currentPage++;
            loading = false; // Reset loading flag
          }
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          loading = false; // Reset loading flag
        });
    }

    // Function to check if the user has scrolled to the bottom of the page
    function isAtBottom() {
      const productList = document.querySelector(".ProductList");

      const scrollPosition = window.innerHeight + window.scrollY;
      const productListBottom =
        productList.offsetTop + productList.clientHeight;

      return scrollPosition >= productListBottom;
    }

    // Function to handle the scroll event
    function handleScroll() {
      if (isAtBottom()) {
        fetchProducts(currentPage);
      }
    }

    // Add a scroll event listener to trigger infinite scroll
    window.addEventListener("scroll", handleScroll);
  }, 3000);
}
