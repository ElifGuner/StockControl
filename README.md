---------------------------------------------------------------------
		        Angular ve WebAPI ile Stok Kontrol Uygulaması			
					
							Elif Güner
							
							25.01.2024
---------------------------------------------------------------------					

Projede frontend olarak Angular, backend olarak WebAPI kullanılmıştır.
WebAPI, MSSQL DB'den Entity Framework Core ile veri okuma-yazma amacıyla kullanılmıştır.

---------------------------------------------------------------------

1. Projenin angular kısmını açmak için powershell ile projenin olduğu dizine gidilir
   ve code . komutu ile proje Visual Studio Code ile açılır :

	PS C:\Users\husey> cd C:\Users\husey\Desktop\Elif-workspace\Angular\StockControl
	PS C:\Users\husey\Desktop\Elif-workspace\Angular\StockControl> code .

2. F12 ile console açılır ve 'ng serve' komutu ile proje çalıştırılır ve web browserda açılır.
	
3. C:\Users\husey\Desktop\Elif-workspace\StockControlAPI projesinde Angular arayüzünün
   haberleştiği WebApi bulunur.
   
   StockControl.sln projesi Visual Studio'da açılır ve çalıştırılır.
   
   Bu proje Entity Framework Core ORM altyapısını kullanır.
   
   MS SQL Server'a bağlanarak StockControllerAPIDB isimli bir DB ve içine aşağıdaki tabloları ve kayitlari oluşturur:
   
 select * from [StockControllerAPIDB].[dbo].[Users]
 
Id          UserName      Password
----------- ------------- ----------
1           elif          elif1
2           ege           ege1

 select * from [StockControllerAPIDB].[dbo].[Categories]

Id          CategoryName
----------- --------------
1           Bilgisayar
2           Beyaz Eşya
3           Ayakkabı

 select * from [StockControllerAPIDB].[dbo].[Warehouses]

Id          WarehouseName
----------- ---------------
1           Ankara
2           İstanbul
3           İzmir

 select * from [StockControllerAPIDB].[dbo].[Products]

Id          CategoryId  WarehouseId ProductName   Count       Price
----------- ----------- ----------- ------------- ----------- ---------
1           1           1           Casper        3           1000.00
2           1           2           Lenovo        5           1500.00
3           2           2           Buzdolabı     4           3000.00
4           2           3           Fırın         6           2000.00

   
4. angular projesi çalıştırıldığında web browserda gelen sign in sayfasına Users tablosundaki
   username\password'ler ile "login" olunur ve stock kontrol sayfasına yönlendirme yapılır.
   İki sayfa da bootstrap ile yapılmıştır.

5. Var olan username\password'ler yerine yenisi kullanılmak isteniyorsa "Register" butonuna 
   tıklanarak kayıt yapılır ve stock kontrol sayfasına yönlendirme yapılır.

6. Stok kontrol sayfasından ürün ekleme, silme, getirme ve güncelleme işlemleri yapılabilir.
   Ürün getirmek için, ürün adı girilip "Retrieve"  butonuna tıklanmalıdır.
   Ekleme sırasında, DB'de yer almayan kategori bilgisi girilirse bu bilgi Categories tablosuna 
   da eklenir.
   Update işlemi için ürün adı girilmesi zorunludur. Diğer alanlardan yalnızca değer girilen 
   alanlar güncellenir.
   
7. Stok kontrol işlemlerini yalnızca kayıtlı kullanıcıların yapabilmesi için, angular tarafında 
   HttpInterceptor ile bütün requestlerin header kısmına username\password eklendi.
   WebApi kısmında ise Basic Authentication kullanıldı.
   
   


# StockControl

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
