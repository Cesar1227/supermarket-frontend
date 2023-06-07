import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() public page: number;

  @Input() public totalPages: number;

  @Input() public numElements: number;

  @Output() paginaEmitter: EventEmitter<number> =  new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  siguiente(){
    this.page++;
    this.pasarPagina();
    console.log("next page: "+this.page);
  }

  anterior(){
    this.page--;
    this.pasarPagina();
    console.log("previus page: "+this.page);
  }

  pasarPagina(){
    this.paginaEmitter.emit(this.page);
  }

}
