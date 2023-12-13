import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit{
  order? : Order;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute, private bcService: BreadcrumbService) {
    this.bcService.set('@orderDetailed', ' ');
  }

  ngOnInit(): void {
    this.loadOrder();
  }


  loadOrder() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      this.orderService.getOrderDetailed(+id).subscribe({
        next: order => {
          this.order = order;
          // console.log(order);
          this.bcService.set('@orderDetailed', `Order# ${order.id} - ${order.status}`)
        },
        error: err => console.log(err)
      })
    }
  }
}
