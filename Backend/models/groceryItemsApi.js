const getProducts = async (req, res) => {
  try {
      // Dynamically import node-fetch
      const fetch = (await import('node-fetch')).default;

      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();

      res.status(200).json({ data });
      
  } catch (error) {
      console.error("An error occurred: " + error);
      res.status(500).send("Internal Server Error");
  }
}

module.exports = getProducts;