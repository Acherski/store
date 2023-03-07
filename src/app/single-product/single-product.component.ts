import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MainService } from '../main.service';
import { Product } from '../nav/nav-api.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
})
export class SingleProductComponent implements OnInit {
  protected productState$ = this.mainService.singleProductState$;

  constructor(private mainService: MainService) {}

  public ngOnInit(): void {
    this.mainService.getSingleProduct(1);
  }
}
