
export class ProductView {

  ProductName: string;
  CategoryName: string;
  WarehouseName: string;
  Count: number;
  Price: number;

  constructor(productName: string, categoryName: string, warehouseName: string, count: number, price: number) {
    this.ProductName = productName;
    this.CategoryName = categoryName;
    this.WarehouseName = warehouseName;
    this.Count = count;
    this.Price = price;
  }

}
