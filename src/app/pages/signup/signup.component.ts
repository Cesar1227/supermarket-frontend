import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public num1:number;
  public num2:number;
  public operador:string;
  private operadores:string[] = ['+','-','*'];
  private result:number;

  public user = {
    username : '',
    password : '',
    email : ''
  }

  public validacion:string='';

  constructor(private userServices:UserService, private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.generarOperacion();
  }

  private generarOperacion(){
    let oper = Math.floor(Math.random()*3);
    let n1 = Math.floor(Math.random()*10);
    this.num1=n1;
    let n2 = Math.floor(Math.random()*10);
    this.num2=n2;
    this.operador=this.operadores[oper];
    switch (this.operador) {
      case '+':
        this.result = n1+n2;
        break;
      case '-':
        this.result = n1-n2;
        break;
      case '*':
        this.result = n1*n2;
        break;    
      default:
        break;
    }
    this.validacion='';
  }

  private validarResultado(){
    let resulUser = Number(this.validacion);
    if (resulUser!=this.result) {
      this.snack.open('Verificación incorrecta','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      })
      this.generarOperacion();
      return false;
    }
    return true;
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null
        || this.user.email == '' || this.user.email == null
        || this.user.password == '' || this.user.password == null
        || this.validacion == '' || this.validacion == null){
      this.snack.open('Todos los campos son requeridos','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      })
      this.generarOperacion();
      //alert('Username is required');
      return;
    }

    if(this.validarResultado()){
      this.userServices.addUser(this.user).subscribe(
        (data) => {
          console.log(data);
          Swal.fire('Usuario creado','Usuario creado exitosamente','success');
          /*this.snack.open('User save successfully','Accept',{
            duration : 3000,
            verticalPosition : 'top',
            horizontalPosition : 'right'
          })*/
          //alert('User save successfully');
        }, (error) => {
          console.log(error);
          this.snack.open('Ha ocurrido un error en el sistema','Aceptar',{
            duration : 3000,
            verticalPosition : 'top',
            horizontalPosition : 'right'
          })
          //alert('An error has occurred in the system')
        }
      )
    }
  }
}
