import { Component } from '@angular/core';
import { Product } from '../models/Product';
import { ProductCategory } from '../models/ProductCategory';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.produkte.html',
  styleUrls: ['./app.produkte.css']
})
export class Produkte {
  showProductCategoryEditor = false;
  showProductEditor = false;

  productCategorys = [];
  productCategory: ProductCategory = new ProductCategory();
  product = {};

  constructor(private http: HttpClient) {
    this.loadProductsCategorys();

  }

  // ProductCategory
  public cmdAddProductCategory(){
    var newProductCategory = new ProductCategory;
    this.productCategorys.push(newProductCategory);
    this.productCategory = newProductCategory;
    console.log(newProductCategory);

    //show productCategoryEditor
    this.hideEditors();
    this.showProductCategoryEditor = true;
  }

  public showProductCategory(event, productCategory) {
    this.productCategory = productCategory;

    this.hideEditors();
    this.showProductCategoryEditor = true;
  }

    // Table
  public cmdAddProduct(event, productCategory){
    var newProduct = new Product;
    this.productCategory = productCategory
    this.productCategory.addProduct(newProduct);
    this.product = newProduct;

    //show productEditor
    this.hideEditors();
    this.showProductEditor = true;

    this.hideEditors();
    this.showProductEditor = true;
  }

  private showProduct(event, productCategory, product){
    this.productCategory = productCategory;
    this.product = product;

    this.hideEditors();
    this.showProductEditor = true;
  }

  private hideEditors(){
    this.showProductCategoryEditor = false;
    this.showProductEditor = false;
  }

    public cmdDeleteProduct(event, productCategory, product) {
     var index = this.productCategory.products.indexOf(product);
     console.log(productCategory);
     console.log(product);
     if (index > -1) {
        this.productCategory.products.splice(index, 1);
        this.deleteProductFromServer(productCategory, product);
    }
      this.hideEditors();
  }

  public cmdFinishProduct(event, productCategory, product){
    this.hideEditors();
    console.log("!!!!!!!!!!!!");
    console.log(productCategory);
    console.log(product);
    for(var i = 0; i < productCategory.products.length; i++){
      if(product == productCategory.products[i]){
        this.changeExistingProduct(productCategory, product);
        break;
      }
    }
    this.addProductToServer(productCategory, product);
  }

  public cmdDeleteProductCategory(event, productCategory){
    var index = this.productCategorys.indexOf(productCategory);
    if (index > -1){
      this.productCategorys.splice(index, 1);
      this.deleteProductCategoryFromServer(productCategory);
    }
    this.hideEditors();
  }

  public cmdFinishProductCategory(event, productCategory){
    this.hideEditors();
    for(var i = 0; i < this.productCategorys.length; i++){
      if(productCategory == this.productCategorys[i]){
        console.log("In IF !!!!!");
        this.changeExistingProductCategory(productCategory);
        break;
      }
    }
    this.addProductCategoryToServer(productCategory);
  }

  private loadProductsCategorys() {
    this.http.get('http://localhost:3000/api/ProductCategories').subscribe(data => {
        // Read the result field from the JSON response.
        setTimeout(() => {
        let productCategories = data as [any]
        for(var i = 0; i < productCategories.length; i++) {
          let productCategory = productCategories[i];
          // umwandeln
          console.log(productCategory);
          var newProductCategory = new ProductCategory();
          newProductCategory.name = productCategory.name;
          newProductCategory.productImage = productCategory.productImage;
          newProductCategory.id = productCategory.id;

          // push to array
          this.productCategorys.push(newProductCategory);
          this.loadProducts(newProductCategory);
        }
      });
    });
  }

  private loadProducts(productCategory: ProductCategory) {
  
      this.http.get('http://localhost:3000/api/ProductCategories/' + productCategory.id + '/products').subscribe(data => {
        setTimeout(() => {
        let products = data as [any]
        for(var i = 0; i < products.length; i++) {
          let product = products[i];
          // umwandeln
          console.log(product);
          var newProduct = new Product();
          newProduct.name = product.name;
          newProduct.price = product.price;
          newProduct.comment = product.comment;
          newProduct.id = product.id;
          console.log(newProduct);
          // push to array
          productCategory.addProduct(newProduct);
        }
      });
    });
  }

  //Server ProductCategory
    addProductCategoryToServer(productCategory: ProductCategory) {
    this.http.post('http://localhost:3000/api/ProductCategories',productCategory).subscribe();
  }

  changeExistingProductCategory(productCategory: ProductCategory){
    this.http.put('http://localhost:3000/api/ProductCategories/'+productCategory.id, productCategory).subscribe();
  }

    deleteProductCategoryFromServer(productCategory: ProductCategory){
    this.http.delete('http://localhost:3000/api/ProductCategories/'+productCategory.id).subscribe();
  }


  //Server Product
    addProductToServer(productCategory: ProductCategory, product: Product){
    this.http.post('http://localhost:3000/api/ProductCategories/'+productCategory.id+'/products',product).subscribe();
  }

  changeExistingProduct(productCategory: ProductCategory, product: Product){
    this.http.put('http://localhost:3000/api/ProductCategories/'+productCategory.id+'/products/'+product.id, product).subscribe();
  }

  deleteProductFromServer(productCategory: ProductCategory, product: Product){
    this.http.delete('http://localhost:3000/api/ProductCategories/'+productCategory.id+'/products/'+product.id).subscribe();
  }
  
}
