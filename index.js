const express = require("express");
const dns = require('node:dns');
let fs = require("fs")


const app = express();
app.use(express.json());

app.post("/getmeip",(req,res)=>{
    let {name} = req.body
    dns.lookup(name, (err, address, family) => {
        console.log('address: %j family: IPv%s', address, family);
    });
    
})

app.post("/products/create",(req,res)=>{
    let productsdata  = req.body;
    // console.log(productsdata)
    let products = fs.readFileSync('products.json');
    products = JSON.parse(products)

    products.products.push(productsdata)
    fs.writeFileSync('products.json', JSON.stringify(products), function (err) {
        if (err) throw err;
        
        console.log('Saved!');
    });
    res.send(products.products)
    // fs.writeFile('products.json', json, 'utf8', callback);
    // console.log(products)
})
app.get("/products",(req,res)=>{
    let products = fs.readFileSync('products.json');
    res.send(products)
})

app.delete('/products/:productId', (req, res) => {
    let{ productId} = req.params;
    let index = allData.findIndex(product => product.id == id);
    if (index == -1) {
        return res.status(404).send({
            message: 'Product not found'
        });
    }
    allData.splice(index, 1);
    fs.writeFile("products.json", JSON.stringify(allData), (err) => {
        if (err) throw err;
    }
    );
    return res.status(200).send({
        message: 'Product deleted successfully'
    });
}
);

app.put('/products/:productId', (req, res) => {
    let id = req.params.productId;
    let index = allData.findIndex(product => product.id == id);
    if (index == -1) {
        return res.status(404).send({
            message: 'Product not found'
        });
    }
    allData[index] = req.body;
    fs.writeFile("products.json", JSON.stringify(allData), (err) => {
        if (err) throw err;
    }
    );
    return res.status(200).send({
        message: 'Product updated successfully'
    });
}
);
app.listen(5000,()=>{
    console.log("App is listen on port 5000")
})