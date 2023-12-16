import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../shared/models/brand';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { Type } from '../shared/models/type';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';
  product: Product[] = []; //cached products, for template
  brands: Brand[] = []; //cached brands, for template
  types: Type[] = []; //cached types, for template
  pagination?: Pagination<Product[]>;
  shopParams = new ShopParams();
  productCache = new Map<string, Pagination<Product[]>>(); //cached object, for component

  constructor(private http: HttpClient) { }

  getProducts(useCache = true): Observable<Pagination<Product[]>> {
    if(!useCache) this.productCache = new Map();

    //check cache
    if(this.productCache.size > 0 && useCache) {
      // check the request string signature if there is a match in cache
      if(this.productCache.has(Object.values(this.shopParams).join('-'))) {
        // pass the value
        this.pagination = this.productCache.get(Object.values(this.shopParams).join('-'));
        if(this.pagination) return of(this.pagination);
      }
    }

    //new request, cache failed
    let params = new HttpParams();

    if (this.shopParams.brandId > 0) params = params.append('brandId', this.shopParams.brandId);
    if (this.shopParams.typeId) params = params.append('typeId', this.shopParams.typeId);
    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber);
    params = params.append('pageSize', this.shopParams.pageSize);
    if (this.shopParams.search) params = params.append('search', this.shopParams.search);

    return this.http.get<Pagination<Product[]>>(this.baseUrl + 'products', { params }).pipe(
      map(response => {
        //store new key and value to the cache
        this.productCache.set(Object.values(this.shopParams).join('-'), response);
        this.pagination = response;
        return response;
      })
    )
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  getProduct(id: number) {
    const product = [...this.productCache.values()]
      .reduce((acc, paginatedResult) => {
        return {...acc, ...paginatedResult.data.find(x => x.id === id)}
      }, {} as Product)

    if (Object.keys(product).length !== 0) return of(product); //returned as observable

    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getBrands() {
    if (this.brands.length > 0) return of(this.brands); //check cache

    return this.http.get<Brand[]>(this.baseUrl + 'products/brands').pipe(
      map(brands => this.brands = brands)
    )
  }

  getTypes() {
    if (this.types.length > 0) return of(this.types); //check cache

    return this.http.get<Type[]>(this.baseUrl + 'products/types').pipe(
      map(types => this.types = types)
    );
  }
}
