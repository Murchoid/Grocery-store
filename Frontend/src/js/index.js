window.onload = () => {
  const images = [
    '../src/images/logo.jpg',
    '../src/images/basil.jpg',
    '../src/images/lemon.jpg',
    '../src/images/sugar.jpg',
    '../src/images/cookiiee.jpg',
    '../src/images/donut.jpg',
    '../src/images/grilled fish.jpg',
    '../src/images/lime.jpg',
    '../src/images/cinamon.jpg',
    '../src/images/olive.jpg',
    '../src/images/burg.jpg',
  ];

  let i = 0;

  document.querySelector('.Home').style.backgroundImage = `url(${images[i]})`;

  function changeBackground() {
    i++;
    if (i === images.length) i = 0;

    document.querySelector('.Home').style.backgroundImage = `url(${images[i]})`;
  }
  setInterval(changeBackground, 7000);
  fetchItems();
  removeEmpty();
};

import { addToCart, saveToCart, removeFromCart, updateUI, loadCart, removeEmpty } from "./addTocart.js";



let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let checkout = document.querySelector('.checkout');
let body = document.querySelector('.body');

iconCart.addEventListener('click',() => {
    body.classList.toggle('showCart')
});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
});

checkout.addEventListener('click',() => {
  window.location.href='./checkout.html';
});



const cartDets =  ()=>{
  loadCart();

  const cartBtn = document.querySelectorAll('.container');

  cartBtn.forEach(button => button.addEventListener('click', (event)=>{
    console.log('add to cart clicked');
            const productElement = event.target.closest('.product-item');
            const productId = productElement.id;
            const productName = productElement.querySelector('.product-name').innerText;
            const productPrice = parseFloat(productElement.querySelector('.product-price').innerText.replace('Ksh', ''));
            const productQuantity = 1;
            const productImage = productElement.querySelector('.product-image').src;

             const product = {
                id: productId,
                name: productName,
                price: productPrice,
                quantity: productQuantity,
                image: productImage
            };

            addToCart(product);


  }))
}

cartDets();

const fetchItems = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/items');

    if (!response.ok) {
      return console.error('Unable to fetch items');
    }
    const data = await response.json();

    console.log(data);

    const limitedData = data.data.products.slice(0, 20);
    const dataForPopularProds = data.data.products.slice(0, 10);

    const itemContainers = document.getElementById('category-container');
    const popItemContainers = document.getElementById('popular-prods');

    itemContainers.innerHTML = '';
    popItemContainers.innerHTML='';



    limitedData.forEach((element) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'categories product-item';
      itemElement.innerHTML += `
                    <div class="category product-item" id='${element.id}'>
                            <a href="">
                                <img src="${element.images[0]}" alt="${
        element.title
      }" class="product-image">
                            </a>
                                <h3 class="product-name">${element.title}</h3>
                                <p class="product-price">Ksh${(element.price * 129) | 0}</p>
                              
                                <button class='add-to-cart'>Add to Cart</button>

                            
                        </div>
                `;
                itemContainers.appendChild(itemElement);


                const popularElement = document.createElement('div');
        popItemContainers.className = 'products';
      popularElement.innerHTML += `
                      <div class="product product-item" id='${element.id}' >
                          <img src="${element.images[0]}" alt="${
        element.title
      }" class="product-image">
                          <h3 class="product-name>${element.title}</h3>
                          <p class="product-price">Ksh${(element.price * 129) | 0}</p>
                         
                          <button class='add-to-cart'>Add to Cart</button>
                      </div>
                  `;

                  popItemContainers.appendChild(popularElement);
    });

    

  } catch (error) {
    console.error('An error occured: ' + error);
  }
};
