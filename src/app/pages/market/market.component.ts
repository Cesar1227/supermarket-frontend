import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketsService } from 'src/app/services/markets.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {

  public elements: Array<any> = []; //Listado de productos

  public page: number = 1; //Número de página en la que estamos. Será 1 la primera vez que se carga el componente

  public totalPages: number = 0; //Número total de páginas

  public numElements: number = 0; //Total de tiendas existentes

  public altImgs:string = "Imagen de referencia del producto";

  private elementPerPage: number = 6;
  private numResults: number = this.elementPerPage;
  public nameMarket: string | null;
  public market: any | null;

  constructor(private marketService:MarketsService, private rutaActiva: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.nameMarket = this.rutaActiva.snapshot.paramMap.get('market');
    if (this.nameMarket == null) {
      console.log("[market] navigate from ngOnInit nameMarket==null");
      this.router.navigate(['/']);
    }else{
      this.market = this.getMarket(this.nameMarket);
      if(this.market != null){
        this.getProductsByPage(this.page);
      }else{
        console.log("[market] navigate from ngOnInit market==null");
        this.router.navigate(['/']);
      }
    }
  }

  goToPage(page: number){
    this.page = page;
    this.getProductsByPage(page);
  }

  public getMarket(name:string):any{
    this.market = this.marketService.getMarket(name);
    return this.market;
    /*this.marketService.getMarket(name).subscribe((data:any) =>{
      this.market = data;
    });*/
  }

  public getProductsByPage(page: number) {

    if(this.nameMarket!=null){
      this.marketService.listProducts(this.nameMarket).subscribe((data:any) =>{
        console.log(data);
        //this.elements = data;
        this.numElements = data.length;
        this.totalPages = Math.ceil(this.numElements / this.numResults);
        console.log("[market] total_pages: "+this.totalPages);
        this.managePages(data,page);
      });
    }else{
      console.log("[market] navigate from productByPage");
      this.router.navigate(['/']);
    }
  }

  private managePages(data:any,page:number){
    if (this.elementPerPage*page>this.numElements) {
      this.elements = data.slice((this.elementPerPage*(page-1)));
      console.log("[market] elementos secondPage: "+data.slice((this.elementPerPage*(page-1)))+" - "+this.numElements);
    }else{
      this.elements = data.slice((this.elementPerPage*(page-1)),this.elementPerPage*page);
      console.log("[market] elementos FirstPage: "+data.slice((this.elementPerPage*(page-1)),this.elementPerPage*page)+" - "+this.numElements);
    }
    console.log("[market] elementos page "+page+" : "+this.elements);
  }
}
