import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    // selector:'pm-products',
    templateUrl:'./product-list.component.html',
    styleUrls:['./product-list.component.css']
    //providers:[ProductService]
})

export class ProductListComponent implements OnInit{

    pageTitle:string = 'Product List';
    imageWidth:number =35;
    imageMargin:number = 2;
    showImage:boolean = false;
    errorMessage:string;
    _listFilter = '';
    get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value: string) {
      this._listFilter = value;
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
  
    filteredProducts: IProduct[] = [];
    
  
    products:IProduct[] = [];

      toggleImage():void{

        this.showImage = !this.showImage;
      }
      
      constructor(private productSerivce:ProductService){
        
        // this.listFilter = 'cart';
      }
      performFilter(filterBy:string): IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product:IProduct) =>
             product.productName.toLocaleLowerCase().indexOf(filterBy)!==-1);
      }
      ngOnInit():void{
        // this.products = this.productSerivce.getProducts();
        // this.filteredProducts = this.products;
        // console.log("Life Cycle Hook");
        this.productSerivce.getProducts().subscribe({
          next: products => {
            this.products = products;
            this.filteredProducts = this.products;
          },
          error: err => this.errorMessage = err
        });
      }
      onRatingClicked(message:string):void{

        this.pageTitle = 'Product List' + message;
      }
}