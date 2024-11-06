window.onload = () => {
  const images = [
    'images/logo.jpg',
    'images/basil.jpg',
    'images/lemon.jpg',
    'images/sugar.jpg',
    '/Frontend/public/images/cookiiee.jpg',
    '/Frontend/public/images/donut.jpg',
    '/Frontend/public/images/grilled fish.jpg',
    '/Frontend/public/images/lime.jpg',
    '/Frontend/public/images/cinamon.jpg',
    '/Frontend/public/images/olive.jpg',
    '/Frontend/public/images/burg.jpg',
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
};

const fetchItems = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/items');

    if (!response.ok) {
      return console.error('Unable to fetch items');
    }
    const data = await response.json();

    console.log(data);

    const limitedData = data.data.products.slice(0, 20);
    const dataForPopolarProds = data.data.products.slice(30, 40);

    const itemContainers = document.getElementById('category-container');
    const popItemContainers = document.getElementById('popular-prods');

    itemContainers.innerHTML = '';

    limitedData.forEach((element) => {
      const itemElement = document.createElement('div');
      itemElement.className = 'categories';
      const popularElement = document.createElement('div');
      popularElement.className = 'container';

      itemElement.innerHTML = `
                    <div class="category">
                            <a href="#">
                                <img src="${element.images[0]}" alt="${
        element.title
      }">
                            </a>
                                <h3>${element.title}</h3>
                                <p>Ksh${(element.price * 129) | 0}</p>
                                <button>Add to Cart</button>

                            
                        </div>
                `;

      popularElement.innerHTML = `
                    <div class="products">
                    <div class="product">
                        <img src="${element.image[1]}" alt="${element.title}">
                        <h3>${element.title}</h3>
                        <p>${(element.price * 129) | 0}</p>
                        <button>Add to Cart</button>
                    </div>
                `;
      itemContainers.appendChild(itemElement);
      popItemContainers.appendChild(popularElement);
    });
  } catch (error) {
    console.error('An error occured: ' + error);
  }
};
