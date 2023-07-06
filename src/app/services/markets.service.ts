import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from "rxjs";
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class MarketsService {

  private resultPerPage: number = 6;

  public market1 = {
    id: '001',
    name: 'Carrefour',
    description: 'Encuentra tus productos al mejor precio',
    schedule: '',
    id_picture: 'img_carrefour001',
    picture: '../../../assets/Carrefour.jpg'
  }

  public market2 = {
    id: '002',
    name: 'Ara',
    description: 'Encuentra tus productos con un precio justo',
    schedule: '',
    id_picture: 'img_ara001',
    picture: '../../../assets/Ara.jpg'
  }

  public market3 = {
    id: '003',
    name: 'Éxito',
    description: 'Si buscas lo mejor y al mejor precio, aquí lo tenemos',
    schedule: '',
    id_picture: 'img_exito001',
    picture: '../../../assets/Exito.jpg'
  }

  public market4 = {
    id: '004',
    name: 'D1',
    description: 'D1 de todos',
    schedule: '',
    id_picture: 'img_D1001',
    picture: '../../../assets/D1.jpg'
  }

  public market5 = {
    id: '005',
    name: 'Carulla',
    description: 'Encuentra tus productos con un precio justo',
    schedule: '',
    id_picture: 'img_carulla001',
    picture: '../../../assets/Carulla.png'
  }

  public market6 = {
    id: '006',
    name: 'Makro',
    description: 'Ven, tenemos lo que necesitas',
    schedule: '',
    id_picture: 'img_makro001',
    picture: '../../../assets/Makro.jpg'
  }

  private product1 = {
    id: '0001',
    name: 'Arroz Diana',
    description: ' Arroz Diana x 250gr',
    type: 'Alimento',
    market: this.market3,
    picture: '../../../assets/ArrozDiana_exito.jpg'
    //picture: '../../../assets/Exito.jpg'
  }

  private product2 = {
    id: '0002',
    name: 'Nuggets de pollo',
    description: ' Nuggets x 10U',
    type: 'Alimento',
    market: this.market3,
    picture: '../../../assets/Nuggets-exito.jpg'
    //picture: '../../../assets/Carulla.png'
  }

  private product3 = {
    id: '0003',
    name: 'Huevos',
    description: 'Huevos x 30U',
    type: 'Alimento',
    market: this.market3,
    picture: '../../../assets/Huevos-exito.webp'
    //picture: '../../../assets/Ara.jpg'
  }

  //private market4 = this.market2;
  //private market5 = this.market3;
  //private market6 = this.market1;
  private market7 = this.market3;
  private market8 = this.market2;

  private _markets = of([this.market1, this.market2, this.market3, this.market4, this.market5, this.market6, this.market7, this.market8, this.market5]);
  private _products = of([this.product1, this.product2, this.product3, this.product2, this.product1, this.product3, this.product2, this.product1])
  constructor(private httpClient: HttpClient) { }

  public listMarkets() {
    return this.httpClient.get(`${baseURL}/api/supermarket/find`);
    //http://localhost:8085/api/supermarket/find
    //return this._markets;
  }

  public getMarket(name: string): any {
    return this.httpClient.get(`${baseURL}/api/supermarket/find/${name}`);
    /*
    let market:any;
    this._markets.forEach(value =>{
      market = value.find(ele => ele.name==name);
    });
    if (market != undefined) {
      console.log("[market Service] market found: "+market.name);
      return market;
    }else{
      return null;
    }*/
  }

  public listProducts(market: string): any {
    //let products_:any[] = [];
    //console.log("data bakcend: ", data);
    return this.httpClient.get(`${baseURL}/api/product/find`);
    
    /*.subscribe(data => {
      console.log("data backend: ", data);
      
      let productos = Object.values(data);
      console.log("object: ",productos);
      productos = productos[0];
      productos.forEach(producto => {
        if (producto.market_name == market) {
          console.log(producto.name);
          console.log(products_.push(producto));
        }
      })
      console.log("product: "+(products_[0].name));
      
    });
    return of([products_]);*/
    
    //return this._products;
  }

  public searchByProduct(product: string, market: any): any {
    let arrayProducts: any[] = [];

    this._products.subscribe(products => {
      arrayProducts = products as Array<any>
    });
    let products: any[] = arrayProducts.filter(prod_ => prod_.name.includes(product));
    console.log(products);
    return products;
  }
}
