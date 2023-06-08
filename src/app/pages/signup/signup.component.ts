import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  myForm: FormGroup;

  public validacion:string='';

  constructor(private userServices:UserService, private snack:MatSnackBar, public fb: FormBuilder, public router:Router) {
    this.myForm = this.fb.group({
      username: ['', [Validators.pattern(/^([a-zA-Z0-9_])*$/)]],
      email: ['',[Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password:['',[Validators.pattern(/^[a-zA-Z0-9_*.\-#!$]+$/)]],
      result: ['', [Validators.pattern(/^[0-9-]+$/)]]
    });
  }

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
    if(this.operador=="*" && n1==0 && n1==n2){
      oper = Math.floor(Math.random()*3);
      this.operador=this.operadores[oper];
      n1 = Math.floor(Math.random()*10);
      n2 = Math.floor(Math.random()*10);
      this.num1=n1;
      this.num2=n2;
    }
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
          console.log(this.user.username+"-"+this.user.email+"-"+this.user.password+"-"+this.validacion);
      this.snack.open('Todos los campos son requeridos','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      })
      this.generarOperacion();
      //alert('Username is required');
      return;
    }else if(this.myForm.invalid){
      this.snack.open('Asegurese de digitar los campos adecuadamente','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      })
      this.generarOperacion();
      return;
    }

    if(this.validarResultado()){
      this.router.navigate(['markets']);
      return;
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
          this.generarOperacion();
          //alert('An error has occurred in the system')
        }
      )
    }
  }
}
