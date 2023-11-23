const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];    
    this.readFromFile();
  }

  readFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  writeToFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    //validamos TODOS los campos antes de continuar... 
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son requeridos.");
      return;
    }
    //Validamos el codigo de producto no exista antes de continuar...
    if (this.getProductByCode(code)) {
      console.log("El código del producto ya existe.");
      return;
    }
    const product = {
      id: this.generaIdcompuesto(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(product);
    this.writeToFile();
    console.log("Producto agregado con éxito.");
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index !== -1) {
      this.products.splice(index, 1);
      this.writeToFile();
      console.log(`Producto con ID ${id} eliminado con éxito.`);
    } else {
      console.log(`No se encontró un producto con ID ${id}.`);
    }
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index !== -1) {
      // Validar que los campos necesarios estén presentes en updatedProduct antes de actualizar
      if (
        updatedProduct.title &&
        updatedProduct.description &&
        updatedProduct.price &&
        updatedProduct.thumbnail &&
        updatedProduct.code &&
        updatedProduct.stock
      ) {
        this.products[index] = {
          id: id,
          title: updatedProduct.title,
          description: updatedProduct.description,
          price: updatedProduct.price,
          thumbnail: updatedProduct.thumbnail,
          code: updatedProduct.code,
          stock: updatedProduct.stock,
        };

        this.writeToFile();
        console.log(`Producto con ID ${id} actualizado con éxito.`);
      } else {
        console.log("Todos los campos son requeridos para la actualización.");
      }
    } else {
      console.log(`No se encontró un producto con ID ${id}.`);
    }
  }  

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }
  getProductByCode(code) {
    return this.products.some((product) => product.code === code);
  }

  generaIdcompuesto() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const idCorrelative = this.products.length + 1;    
    const combinedId = year * 1000000 + month * 10000 + day * 100 + idCorrelative;
    return combinedId; // Convertir a cadena si es necesario
  }
}

//  const productManager = new ProductManager('json1.json');
//  console.log('Lista de productos:', productManager.getProducts());
//  productManager.addProduct('Producto 1', 'Descripción 1', 10.99, 'imagen1.jpg', 'CODE14', 100);
//  productManager.addProduct('Producto 2', 'Descripción 2', 19.99, 'imagen2.jpg', 'CODE15', 50);
//  productManager.addProduct('Producto 3', 'Descripción 3', 5.99, 'imagen3.jpg', 'CODE16', 200);
// console.log('Lista de productos:', productManager.getProducts());
// productManager.deleteProduct(8);
// console.log('Lista de productos:', productManager.getProducts());
// const updatedProductData = {
//   title: 'Producto actualizado',
//   description: 'Descripción actualizada',
//   price: 19.99,
//   thumbnail: 'nueva_imagen.jpg',
//   code: 'TEST02',
//   stock: 100,
// };
// productManager.updateProduct(7, updatedProductData);
// console.log('Lista de productos:', productManager.getProducts());

module.exports = ProductManager; // si no exportamos da error!!




