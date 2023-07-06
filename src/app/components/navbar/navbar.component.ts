import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private fontSize: number;
  private getFontSize:number;

  constructor() {
    this.fontSize = 12;
    this.getFontSize =  parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-size').toString());
    //this.fontSize = document.getElementsByTagName('body')[0].style.fontSize;
  }

  ngOnInit(): void {
  }

  getFont(){
    this.getFontSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-size').toString());
  }
  
    
  fontUp(){
      console.log("aumentando");
      this.getFont();
      let fontSize = this.getFontSize;
          // aumentamos el valor de esa variable en 1.1
          document.documentElement
              .style.setProperty('--font-size', `${fontSize + 0.1}`);
  }

  fontDown(){
    console.log("disminuyendo");
    this.getFont();
      let fontSize = this.getFontSize;
          // aumentamos el valor de esa variable en 1.1
          document.documentElement
              .style.setProperty('--font-size', `${fontSize - 0.1}`);
  }

  changeFont(operator: any) {

    operator === '+' ? this.fontSize++ : this.fontSize--;
    document.getElementsByTagName('body')[0].style.fontSize = `${this.fontSize}pt`;
    console.log((document.getElementsByTagName('a')))
  }
}
