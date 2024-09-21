// Fetch data from  API and set it to array
let products = []

axios.get("https://fakestoreapi.com/products")
.then(res => {
    products = res.data
    displayProducts(products)
    attachWishlistListeners()
})


// showing fetched data on the screen

function displayProducts (productsDisplay) {

    const cardsContent = document.querySelector('.cards-contentt');
    cardsContent.innerHTML="";

    if (productsDisplay.length === 0) {
        cardsContent.innerHTML = `<p class="no-data">No data found...</p>`;
    }

    productsDisplay.forEach(product => {
        cardsContent.innerHTML +=`
           <div class="card-container" data-price=${product.price}>
                <div class="card-image1">
                    <img src="${product.image}" class="card-image"></img>
                </div>
                <div class="card-text">
                    <h3 onclick="getDetail(${product.id})" class="card-title">${product.title}</h3>
                    <div style="overflow: hidden; width: 290px; height: 100px;">
                        <p class="card-description">${product.description}</p>
                    </div>
                    <div class="rating">
                        <span class="rating-rate">${product.rating.rate}</span>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star-half-stroke"></i>
                        <span class="rating-count">(${product.rating.count})</span>
                        <p class="card-price">${product.price} TL</p>
                    </div>
                </div>
                <div class="card-badges">
                    <div class="badge-left">
                        <img src="https://cdn.dsmcdn.com/web/production/campaign-coupon-icon.svg" alt="">
                        <span>Kupon Fırsatı</span>
                    </div>
                    <div class="badge-right">
                        <img src="https://cdn.dsmcdn.com/web/production/campaign-product-promotion-icon.svg" alt="">
                        <span>Çok Al Az Öde</span>
                    </div>
                </div>
               <i id="wishlist-icon" style="color: red;"  class="fa-solid fa-heart fa-wishlist"></i>
            </div>
        `
    })
}


function getDetail (id) {
    window.location.href =`./assets/pages/detail.html?id=${id}`
}



// add search functionality 

function searchProducts () {
    document.querySelector(".searchInput").addEventListener("input",(e)=>{
        const searchItems = e.target.value.toLowerCase()
        const filteredItems = products.filter(item => item.title.toLowerCase().includes(searchItems))
        displayProducts(filteredItems)
       })
}

searchProducts() 




// header scroll functionality 

   function scrollMenu () {
    window.addEventListener("scroll", () => {
        let header = document.querySelector(".header-bottom")
        if (window.scrollY > 150) {
            header.classList.add("headerAnime")
        } else {
            header.classList.remove("headerAnime")
        }
    })
   }

   scrollMenu ()
  

  // Function to add the product to the wishlist
  function addToWishlist(card) {
    const product = {
      image: card.querySelector('.card-image').src,
      title: card.querySelector('.card-title').innerText,
      description: card.querySelector('.card-description').innerText,
      price: card.querySelector('.card-price').innerText,
      rating: card.querySelector('.rating-rate').innerText,
      count: card.querySelector('.rating .rating-count').innerHTML
    };

    // Retrieve existing wishlist from localStorage or create an empty array if none exists
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Check if the product already exists in the wishlist
    const isProductInWishlist = wishlist.some(item => item.title === product.title);

    if (!isProductInWishlist) {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    //   alert('Product added to wishlist!');
    } else {
      alert('This product is already in your wishlist.');
    }
  }


// Function to attach click listeners to heart icons
function attachWishlistListeners() {
    document.querySelectorAll('.card-container .fa-heart').forEach((heartIcon, index) => {
        heartIcon.addEventListener('click', function() {
          const card = this.closest('.card-container');
          addToWishlist(card);
        });
      });
}



// sort products by price
function sortProductsByPrice() {
    const productList = document.querySelector('.cards-contentt');
    const products = Array.from(document.getElementsByClassName('card-container'));

    const sortOption = document.getElementById('sort').value;

    const sortedProducts = products.sort((a, b) => {
        const priceA = parseInt(a.getAttribute('data-price'));
        const priceB = parseInt(b.getAttribute('data-price'));

        if (sortOption === 'cheap') {
            return priceA - priceB;  
        } else {
            return priceB - priceA;  
        }
    });

    productList.innerHTML = '';
    

    sortedProducts.forEach(product => {
        productList.appendChild(product);
    });
}





















 
  





 
