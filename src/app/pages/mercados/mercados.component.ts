import { Component, OnInit } from '@angular/core';
import { MarketsService } from 'src/app/services/markets.service';

@Component({
  selector: 'app-mercados',
  templateUrl: './mercados.component.html',
  styleUrls: ['./mercados.component.css']
})
export class MercadosComponent implements OnInit {

  public elements: Array<any> = []; //Listado de tiendas

  public page: number = 1; //Número de página en la que estamos. Será 1 la primera vez que se carga el componente

  public totalPages: number = 0; //Número total de páginas

  public numElements: number = 0; //Total de tiendas existentes

  public altImgs:string = "Imagen de referencia del supermercado";

  private numResults: number = 6;
  private elementPerPage: number = 6;

  constructor(private marketService:MarketsService) { }

  ngOnInit(): void {
    this.getMarketsByPage(this.page);
  }

  goToPage(page: number){
    this.page = page;
    this.getMarketsByPage(page);
  }

  //Este método llama al servicio dónde se obtiene el listado de tiendas
  //Recibe una página concreta
  public getMarketsByPage(page: number) {

    this.marketService.listMarkets().subscribe(data =>{
      //console.log(data);
      //this.elements = data;
      this.numElements = data.length;
      this.totalPages = Math.round(this.numElements / this.numResults);
      //console.log("[element_viewer] total_pages: "+this.totalPages);
      this.managePages(data,page);
    });
  }

  private managePages(data:any,page:number){
    if (this.elementPerPage*page>this.numElements) {
      this.elements = data.slice((this.elementPerPage*(page-1)));
      //console.log("[mercados] elementos secondPage: "+data.slice((this.elementPerPage*(page-1)))+" - "+this.numElements);
    }else{
      this.elements = data.slice((this.elementPerPage*(page-1)),this.elementPerPage*page);
      //console.log("[mercados] elementos FirstPage: "+data.slice((this.elementPerPage*(page-1)),this.elementPerPage*page)+" - "+this.numElements);
    }
    //console.log("[mercados] elementos page "+page+" : "+this.elements);
  }
}
