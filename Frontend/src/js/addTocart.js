const cartUI = document.querySelector('.listCart');
const toatlQuantityInCart = document.querySelector('#totalQuantityInCart');

let cart = [];

const loadCart = () => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateUI(cart);
  }
  console.log(cart); // for debugging purposes
};

const saveToCart = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

//add item to cart
const addToCart = (product) => {
  const existingProd = cart.find((item) => item.id == product.id);
  if (existingProd) {
    existingProd.quantity += 1;
  } else {
    cart.push(product);
    alert('Item successful saved to cart');
  }
  saveToCart();
  updateUI(cart);
};

//updated the cart items
const updateUI = (cart) => {
  cartUI.innerHTML = '';
  const UI = 'New items here: ';
  console.log(UI + cart);
  let totalINCart = 0;

  cart.forEach((item) => {
    const holdCart = document.createElement('div');
    holdCart.innerHTML = `
            <div class="item" id="${item.id}">
                               <div class="image" >
                                   <img src="${item.image}" alt="" class="imageId">
                               </div>
                               <div class="name">
                                   ${item.name}
                               </div>
                               <div class="totalPrice">
                                   Ksh.${item.price}
                               </div>
                               <div class="quantity">
                                   <span class="minus">-</span>
                                   <span class="quantityFromCart">${item.quantity}</span>
                                   <span class="plus">+</span>
                   
                               </div>
                           </div>
        `;
    cartUI.appendChild(holdCart);
    totalINCart += item.quantity;
  });
  toatlQuantityInCart.innerText = totalINCart;
  if (cart == '') {
    const UI = 'No items';
    console.log(UI + cart);
    cartUI.innerHTML = '<p>No ites added yet</p>';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  cartUI.addEventListener('click', (event) => {
    if (event.target.classList.contains('minus')) {
      console.log('minus tapped');
      const productElement = event.target.closest('.item');
      const productId = productElement.id;

      const product = {
        id: productId,
      };

      removeFromCart(product);
    }

    if (event.target.classList.contains('plus')) {
      console.log('plus tapped');
      const productElement = event.target.closest('.item');
      const productId = productElement.id;
      const prodQuant = productElement.quantity;
      const prodPrice = productElement.price;
      const prodName = productElement.name;
      const prodImage = productElement.imageId;

      const product = {
        id: productId,
        name: prodName,
        price: prodPrice,
        quantity: prodQuant,
        image: prodImage,
      };

      addToCart(product);
    }
  });
});


//this funciton helps remove the items that are quantity 0 from our cart
const removeEmpty = () => {
  cart = cart.filter((item) => item.quantity > 0);
  saveToCart();
  updateUI(cart);
};

const removeFromCart = (product) => {
  const existRemove = cart.find((item) => item.id == product.id);
  if (existRemove) {
    existRemove.quantity--;
  }
  if (existRemove.quantity < 0) {
    cart = cart.filter((item) => item !== existRemove.id);
    updateUI(cart);
  }

  saveToCart();
  updateUI(cart);
};

export {
  loadCart,
  saveToCart,
  updateUI,
  removeFromCart,
  addToCart,
  removeEmpty,
};
