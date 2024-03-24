import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductView } from 'src/app/classes/product-view';

@Component({
  selector: 'app-bootstrap-form',
  templateUrl: './bootstrap-form.component.html',
  styleUrls: ['./bootstrap-form.component.scss']
})
export class BootstrapFormComponent {
  frm : FormGroup;
  
  constructor (private formBuilder : FormBuilder) {
		this.frm = formBuilder.group({
			productName: ["", Validators.required],   
			categoryName: [""],
			//WarehouseName: [""],
      selectedValueWarehouseName: '',
			count: [""],
      price: [""],
		});
	}

  /*
  Cities: any[] = [
    { value: 'Ankara', label: 'Ankara' },
    { value: 'İstanbul', label: 'İstanbul' },
    { value: 'İzmir', label: 'İzmir' }
  ];
  

  onSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedValueWarehouseName = target.value;
    console.log('Selected value:', this.selectedValueWarehouseName);
  }

  selectedValueWarehouseName: string;
  isLargeComboBox: any;

*/
  httpClient : HttpClient = inject(HttpClient);
  //onSubmit(): void {
  onRetrieve(): void {

    if (!this.frm.valid) {
      console.log('Validation Failed');
      false;
    } else {
    //  const params = new HttpParams()
     // .set("productName", this.frm.get["productName"]);
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
        //  WarehouseName: datas['warehouseName'],
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

