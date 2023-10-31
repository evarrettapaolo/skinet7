import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  //property
  product?: Product;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute) {}

  //executed upon page load
  ngOnInit(): void {
    this.loadProduct();
  }

  //Initialize the product type variable by subscribing to the request
  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    
    //id casted
    if(id) this.shopService.getProduct(+id).subscribe ({
      next: product => this.product = product,
      error: error => console.log(error),
      complete: () => {}
    })
  }

}