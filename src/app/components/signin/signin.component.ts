import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewUser } from 'src/app/classes/view-user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

    title = 'bootstrap-popup';
    loginForm!: FormGroup;
    rememberCheckbox: FormControl;
    isCheckboxDisabled: boolean = false;
    httpClient : HttpClient = inject(HttpClient);
    viewUser: ViewUser;
    
    constructor(private router: Router) { 

      this.rememberCheckbox = new FormControl(false);
    }

    ngOnInit(): void {
      this.loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        rememberCheckbox: new FormControl('')
      })
    }

    get usernameField(): any {
      return this.loginForm.get('username')?.value;
    }
    get passwordField(): any {
      return this.loginForm.get('password')?.value;
    }

    loginFormSubmit(): void {
        console.log(this.loginForm.value);
        // Call Api
      //  if (this.rememberCheckbox.value)
      //  {
      //      console.log('Checkbox is checked');
            localStorage.setItem("username", this.usernameField);
            localStorage.setItem("password", this.passwordField);
            this.router.navigate(['/BootstrapForm']);
      /*  } 
        else 
        {
          console.log('Checkbox is unchecked');
        }
        */
    }
  
    registerFormSubmit(): void {

      console.log(this.loginForm.value);

      this.viewUser = new ViewUser(
        this.loginForm.get('username')?.value.toString(),
        this.loginForm.get('password')?.value.toString()
        );
      
      const url = 'https://localhost:7166/api/User/CreateUser'; // Replace with your API endpoint

      this.httpClient.post(url, this.viewUser).subscribe(
        (response) => {
          console.log('POST request was successful', response);
        },
        (error) => {
          console.error('Error occurred while making POST request:', error);
        }
      );

      // Call Api
      //if (this.rememberCheckbox.value) {
        console.log('Successfully registered');
        localStorage.setItem("username", this.usernameField);
        localStorage.setItem("password", this.passwordField);
        this.router.navigate(['/BootstrapForm']);
        /*
      } else {
        console.log('Checkbox is unchecked');
      }
      */
    }

    onCheckboxChange(event: Event) {    
      const isChecked = (event.target as HTMLInputElement).checked;
      this.rememberCheckbox.setValue(isChecked);
      console.log('onCheckboxChange');
    }
}
