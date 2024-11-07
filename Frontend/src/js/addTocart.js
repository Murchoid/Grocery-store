let cart = [];

const loadCart = ()=>{
    const storedCart = localStorage.getItem('cart');
    if(storedCart){
        cart = JSON.parse(storedCart);
    }
    console.log(cart);
}

const saveToCart = ()=>{
 localStorage.setItem('cart', JSON.stringify(cart));
}

const addToCart = (product)=>{
    const existingProd = cart.find(item => item.id==product.id);
    if(existingProd){
        existingProd.quantity += product.quantity;
    }
    else{
        cart.push(product)
    }
    saveToCart();
    updateUI();
}

const updateUI = ()=>{
   const newUI = localStorage.getItem('cart');

   if(newUI){
        const UI = "New items here: ";
        console.log(UI + cart)
   }
   else{
    const UI = "No items";
    console.log(UI + cart);
   }
   }

   const removeFromCart = (product)=>{
   const existRemove = cart.find(item => item.id==product.id);
   if(existRemove){
        existRemove.quantity--;
        if(existRemove.quantity == 0){
            cart.pop(existRemove);
        }
   }

   saveToCart();
   updateUI();
   }
   

   export {loadCart,saveToCart,updateUI,removeFromCart, addToCart};
   