const http = require('https');

const requestItem = ()=>{
    const http = require('https');

    const options = {
        method: 'POST',
        hostname: 'edamam-food-and-grocery-database.p.rapidapi.com',
        port: null,
        path: '/api/food-database/v2/nutrients',
        headers: {
            'x-rapidapi-key': 'b1761ca2a5msh55d6c3d438bfac5p19e488jsn34360814de9a',
            'x-rapidapi-host': 'edamam-food-and-grocery-database.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
    };
    
    const req = http.request(options, function (res) {
        const chunks = [];
    
        res.on('data', function (chunk) {
            chunks.push(chunk);
        });
    
        res.on('end', function () {
            const body = Buffer.concat(chunks);
            console.log(body.toString());
        });
    });
    
    req.write(JSON.stringify({
      ingredients: [
        {
          quantity: 0,
          measureURI: '',
          qualifiers: [],
          foodId: ''
        }
      ]
    }));
    req.end();
}

module.exports = requestItem;