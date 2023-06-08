import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public num1:number;
  public num2:number;
  public operador:string;
  private operadores:string[] = ['+','-','*'];
  private result:number;

  loginData = {
    "username" : '',
    "password" : ''
  }

  myForm: FormGroup;
  public validacion:string='';

  constructor(private snack:MatSnackBar, private loginService:LoginService, public fb: FormBuilder, public router:Router) { 
    this.myForm = this.fb.group({
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
    if(this.loginData.username.trim()== '' || this.loginData.username.trim == null){
      this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
        duration:3000
      })
      return;
    }

    if(this.loginData.password.trim()== '' || this.loginData.password.trim == null){
      this.snack.open('La contraseña es requerida !!','Aceptar',{
        duration:3000
      })
      return;
    }

    if(this.myForm.invalid){
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
      /*this.loginService.generateToken(this.loginData).subscribe(
        (data:any)=>{
          console.log(data);
          this.loginService.loginUser(data.token);
          this.loginService.getCurrentUser().subscribe((user:any) =>{
            console.log(user);
          })
        },(error: any) => {
          console.log(error);
        }
      )*/
    }
    
  }

}
