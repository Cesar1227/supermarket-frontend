import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableDataSource} from '@angular/material/table';
import { MarketsService } from 'src/app/services/markets.service';

export interface ProductData {
  id: string;
  name: string;
  description: string;
  type: string;
  picture: string
}

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
})
export class ManageProductsComponent implements OnInit, AfterViewInit {

  public supermarket:string;
  public displayedColumns: string[] = ['id', 'name', 'description', 'type', 'picture'];
  public dataSource: MatTableDataSource<ProductData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private marketService:MarketsService,) {
    this.supermarket = "Éxito";
    this.marketService.listProducts(this.supermarket).subscribe((data:any) =>{
      //console.log(data);
      //this.elements = data;
      //this.numElements = data.length;
      //this.totalPages = Math.ceil(this.numElements / this.numResults);
      //console.log("[market] total_pages: "+this.totalPages);
      //this.managePages(data,page);

      let products = Array.from(data);

      this.dataSource = new MatTableDataSource(data); 
    });
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }

  getProductosMarket():any{



  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
