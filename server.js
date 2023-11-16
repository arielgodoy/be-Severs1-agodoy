const express = require("express");
const ProductManager = require("./ProductManager"); // Importamos  ProductManager.js de la pre emtrega anterior
const app = express();
app.use(express.urlencoded({ extended: true }));
const productManager = new ProductManager("json1.json"); // Instanciamos json1.json inlcuido en el repo
app.get('/products', (req, res) => {
    const limit = parseInt(req.query.limit);// lo pasamos a integer por qiue viene como str
    try {
        const allProducts = productManager.getProducts(); //leemos todo

        if (!isNaN(limit)) {
            const limitedProducts = allProducts.slice(0, limit);//si hay limite cortamos el Objeto desde cero hasta el limite
            res.json(limitedProducts);
        } else {
            res.json(allProducts);//devolvemos todo
        }
    } catch (error) {
        res.status(500).send('Error interno del servidor');
    }
});

app.get('/products/:pid', (req, res) => {
    const id = parseInt(req.params.pid);
    console.log(id);
    const producto = productManager.getProductById(id);

    if (producto) {
        res.json(producto);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

app.listen(8080, () => {
    console.log('Escuchando en el puerto 8080');
});
