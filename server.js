const express = require("express");
const ProductManager = require("./ProductManager");
const fs = require('fs').promises; // Utilizamos fs.promises para operaciones de archivos asíncronas
const app = express();
app.use(express.urlencoded({ extended: true }));
const productManager = new ProductManager("json1.json");

app.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit);

    try {
        await productManager.readFromFile(); // Leer desde el archivo (asíncrono)

        const allProducts = productManager.getProducts();

        if (!isNaN(limit)) {
            const limitedProducts = allProducts.slice(0, limit);
            res.json(limitedProducts);
        } else {
            res.json(allProducts);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

app.get('/products/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);

    try {
        await productManager.readFromFile(); // Leer desde el archivo (asíncrono)      
        const producto = productManager.getProductById(id);
        //console.log(id)

        if (producto) {
            res.json(producto);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

app.listen(8080, () => {
    console.log('Escuchando en el puerto 8080');
});
