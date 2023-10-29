import { Component, OnInit } from '@angular/core';
import { Product } from './shared/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  //Data fields
  title = 'Skinet';
  products: Product[] = []

  constructor() {}

  ngOnInit(): void {
  }
}
