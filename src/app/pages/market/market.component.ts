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
  public product: any;
  public API_KEY:string = "AIzaSyBaZRCGQVcs8bopxYhYMpgyLczyGBF5BBc";

  public dataFilter:any;
  public filter:boolean = false;

  constructor(private marketService:MarketsService, private rutaActiva: ActivatedRoute, private router:Router) { }

  public center = {lat: 24, lng: 12};
  public zoom = 15;
  public display?: google.maps.LatLngLiteral;

  async ngOnInit(): Promise<void> {
    this.nameMarket = this.rutaActiva.snapshot.paramMap.get('market');
    if (this.nameMarket == null) {
      console.log("[market] navigate from ngOnInit nameMarket==null");
      this.router.navigate(['/']);
    }else{
       this.market = await this.getMarket(this.nameMarket);
      if(this.market == null){
        this.getProductsByPage(this.page);
        let element : HTMLElement | null = document.getElementById("container");
        /*if(element!=null){
          element.style.backgroundColor=
        }*/
        this.product = document.getElementById("productToSearch");
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
    //let data:any[] = [];
    let data = this.marketService.getMarket(name).subscribe((supermar:any[]) =>{
      //console.log(mercados);
      data = Object.values(supermar);
      //this.elements = data;  
      this.market = data[0];
    }); 
    return data[0];
    //return data[0]; 
    //return this.market;
    /*this.marketService.getMarket(name).subscribe((data:any) =>{
      this.market = data;
    });*/
  }

  public getProductsByPage(page: number) {
    if(this.filter){
      this.searchProduct(this.product);
    }else{
      if(this.nameMarket!=null){

        this.marketService.listProducts(this.nameMarket).subscribe((productos:any[]) =>{
          //console.log(mercados);
          let data = Object.values(productos);
          //this.elements = data;
          console.log(data[0]);
          this.numElements = data[0].length;
          this.totalPages = Math.round(this.numElements / this.numResults);
          //console.log("[element_viewer] total_pages: "+this.totalPages);
          this.managePages(data[0],page);
        });

      }else{
        console.log("[market] navigate from productByPage");
        this.router.navigate(['/']);
      }
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

  public searchProduct(product:any){
    
    let nameProduct:string = product.value;
    if(nameProduct!=null && nameProduct!=''){
      this.filter=true;
      let search=this.marketService.searchByProduct(nameProduct,this.nameMarket);
      this.dataFilter = search;
      this.numElements = search.length;
      this.totalPages = Math.ceil(this.numElements / this.numResults);
      this.managePages(search,1);
    }else{
      this.filter=false;
      this.getProductsByPage(1);
    }
  }
}
