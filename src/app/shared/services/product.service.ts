import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Products } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Products>{

  constructor(http : HttpClient) {
    super(http, 'Products');
  }
}