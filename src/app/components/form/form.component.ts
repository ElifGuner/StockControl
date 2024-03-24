import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductView } from 'src/app/classes/product-view';

@Component({
  selector: 'app-form',
  //templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  template:`
  <h3>Stock Control</h3>

    <!--<form [formGroup] ="frm" (ngSubmit)="onSubmit()">-->
    <form [formGroup] ="frm">
        <!-- <label for="productName">Product Name: </label>-->
        <input type="text" placeholder="ProductName" formControlName="productName"> <br>
        <input type="text" placeholder="CategoryName" formControlName="categoryName"> <br>
        <!--<input type="text" placeholder="WarehouseName" formControlName="warehouseName"> <br>-->
        <select formControlName="selectedValueWarehouseName" placeholder="WarehouseName" (change)="onSelect($event)" >
            <option *ngFor="let city of Cities" [value]="city.value">{{ city.label }}</option>
        </select><br>
        <input type="text" placeholder="Count" formControlName="count"> <br>
        <input type="text" placeholder="Price" formControlName="price"> <br>

       <br>
       <div style="padding-left: 10px;">
        <button style="padding: 5px 10px; font-size: 16px;" (click)="onRetrieve()">Retrieve</button>
        <button style="padding: 5px 18px; font-size: 16px;" (click)="onInsert()">Insert</button> <br>
        <button style="padding: 5px 12px; font-size: 16px;" (click)="onUpdate()">Update</button>
        <button style="padding: 5px 10px; font-size: 16px;" (click)="onDelete()">Remove</button>
        </div>
   </form>
  `

})


export class FormComponent {
  isSubmitted = false;
	frm : FormGroup;  

  Cities: any[] = [
    { value: 'Ankara', label: 'Ankara' },
    { value: 'İstanbul', label: 'İstanbul' },
    { value: 'İzmir', label: 'İzmir' }
  ];
  selectedValueWarehouseName: string;
  isLargeComboBox: any;

  //City: any = ['Ankara', 'İstanbul', 'İzmir'];
  constructor (private formBuilder : FormBuilder) {
		this.frm = formBuilder.group({
			productName: ["", Validators.required],   
			categoryName: [""],
			//warehouseName: [""],
      selectedValueWarehouseName: '',
			count: [""],
      price: [""],
		});
	}
	/*
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      selectedValue: ''
    });
  }*/
  onSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedValueWarehouseName = target.value;
    console.log('Selected value:', this.selectedValueWarehouseName);
  }

  httpClient : HttpClient = inject(HttpClient);
  //onSubmit(): void {
  onRetrieve(): void {
    console.log(this.frm);
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    this.isSubmitted = true;
    if (!this.frm.valid) {
      console.log('Validation Failed');
      false;
    } else {
      const params = new HttpParams()
      .set("productName", this.frm.get["productName"]);
     // console.log("params =" + params);
     // console.log(JSON.stringify(this.frm.value));
    //this.httpClient.get("https://localhost:7166/api/Stock/GetProductByName/",  {params})
    // this.httpClient.get("https://localhost:7166/api/Stock/GetProductByName/casper")
    console.log('xxxxxxxxxxxx' , this.frm.get('productName')?.value);
    console.log('Form value:', this.frm.value);
    this.httpClient.get("https://localhost:7166/api/Stock/GetProductByName/" + this.frm.get('productName')?.value)
     .subscribe({
       next : (datas) => {
        console.log('zzzzzzzzzzz' ,datas);      
        //Object { productName: "Casper", categoryName: "Bilgisayar", warehouseName: "Ankara", count: 3, price: 1000 }
        console.log('yyyyyyyyyy' , datas['productName']);
       
        this.frm.patchValue({
          //productName: 'John',
          categoryName: datas['categoryName'],         
          //warehouseName: datas['warehouseName'],
          selectedValueWarehouseName: datas['warehouseName'],
          count:datas['count'],
          price:datas['price']
          
        });
      } ,  //-> bu istek neticesinde başarılı bir şekilde veri elde edildiyse next tetiklenecek.
       error : error => console.log(error)  //-> hata oluşursa error tetiklenecek.
      })

    }
  }

  productView : ProductView;

  onInsert(): void {
    console.log("yyyyyyyyyyyyyyyyyyyyyyyy");

    if (!this.frm.valid) {
      console.log('Validation Failed');
      false;
    } else {
      this.productView = new ProductView(
        this.frm.get('productName')?.value.toString(),
        this.frm.get('categoryName')?.value.toString(), 
       // this.frm.get('warehouseName')?.value.toString(),
       this.frm.get('selectedValueWarehouseName')?.value.toString(),
        this.frm.get('count')?.value,
        this.frm.get('price')?.value,
        );

        console.log(this.productView);
      const url = 'https://localhost:7166/api/Stock/CreateProduct'; // Replace with your API endpoint
    
      this.httpClient.post(url, this.productView).subscribe(
        (response) => {
          console.log('POST request was successful', response);
        },
        (error) => {
          console.error('Error occurred while making POST request:', error);
        }
      );

    }
  }


  onUpdate(): void {
    console.log("zzzzzzzzzzzzzzzzzz");

    if (!this.frm.valid) {
      console.log('Validation Failed');
      false;
    } else {
      this.productView = new ProductView(
        this.frm.get('productName')?.value,
        this.frm.get('categoryName')?.value, 
        //this.frm.get('warehouseName')?.value,
        this.frm.get('selectedValueWarehouseName')?.value,
        this.frm.get('count')?.value,
        this.frm.get('price')?.value,
        );

        console.log(this.productView);

      const url = 'https://localhost:7166/api/Stock/UpdateProduct'; 
    
      this.httpClient.put(url, this.productView).subscribe(
        (response) => {
          console.log('PUT request was successful', response);
        },
        (error) => {
          console.error('Error occurred while making PUT request:', error);
        }
      );
    }
  }

  onDelete(): void {
    console.log("aaaaaaaaaaaa");

    if (!this.frm.valid) {
      console.log('Validation Failed');
      false;
    } else {

      const url = 'https://localhost:7166/api/Stock/RemoveProduct/'; 
    
      this.httpClient.delete(url + this.frm.get('productName')?.value).subscribe(
        (response) => {
          console.log('DELETE request was successful', response);
        },
        (error) => {
          console.error('Error occurred while making DELETE request:', error);
        }
      );
    }
  }
}
