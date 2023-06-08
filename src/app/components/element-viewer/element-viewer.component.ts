import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MarketsService } from 'src/app/services/markets.service';

@Component({
  selector: 'app-element-viewer',
  templateUrl: './element-viewer.component.html',
  styleUrls: ['./element-viewer.component.css']
})
export class ElementViewerComponent implements OnInit {

  @Input() public elements: Array<any> = []; //Listado de elementos

  @Input() public page: number = 1; //Número de página en la que estamos. Será 1 la primera vez que se carga el componente

  @Input() public totalPages: number = 0; //Número total de páginas

  @Input() public numElements: number = 0; //Total de tiendas existentes

  @Input() public altImgs: string = "";

  @Output() paginaEmitter: EventEmitter<number> =  new EventEmitter();

  @Input() public component:string = "";

  private numResults: number = 6;

  constructor() { }

  ngOnInit(): void {
    //this.getMarketsByPage(1);
  }

  //Función para pasar de página
  //Esta función se ejecuta cada vez que se desencadena
  //un evento sobre el componente hijo (app-pagination)
  goToPage(page: number){
    this.paginaEmitter.emit(page);
    /*this.page = page;
    this.getMarketsByPage(page);*/
  }

  //Este método llama al servicio dónde se obtiene el listado de tiendas
  //Recibe una página concreta
  /*public getMarketsByPage(page: Number) {

    this.marketService.listMarkets(page).subscribe(data =>{
      console.log(data);
      this.elements = data;
      this.numElements = data.length;
      this.totalPages = Math.round(this.numElements / this.numResults);
      console.log("[element_viewer] total_pages: "+this.totalPages);
    });

  }*/
}
