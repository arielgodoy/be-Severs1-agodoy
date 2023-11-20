Consigna
Desarrollar un servidor basado en express donde podamos hacer consultas a nuestro archivo de productos.
Aspectos a incluir

Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos. 
Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.

Aspectos a incluir
El servidor debe contar con los siguientes endpoints:
ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
Si no se recibe query de límite, se devolverán todos los productos
Si se recibe un límite, sólo devolver el número de productos solicitados

ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos. 
tests

// 2023-11-20
// generamos un ID numerico compuesto por AAAA + MM + DD + XXXX donde AAAA ES EL AÑO,MM ES EL MES, DD ES EL DIA Y XXX ES EL CORRELATIVO DEL ID

http://localhost:8080/products
http://localhost:8080/products/?limit=2
http://localhost:8080/products/5

