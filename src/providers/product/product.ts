import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../../pages/Class/Reservation';
import { Offer } from '../../pages/Class/Offer';
 
@Injectable()
export class ProductProvider {

  private lienAddProduct = "https://wastless.herokuapp.com/AddProduct";  

  private lienReservation = "https://wastless.herokuapp.com/ReservationProduct";

  private lienDetail: string = 'https://wastless.herokuapp.com/ProductDetail?ProductId=';

  private lienSearch = 'https://wastless.herokuapp.com/ProductSearch?ProductName=';

  private lienMyPubs = 'https://wastless.herokuapp.com/MyPubs?idUser=';

  private lienEditProduct = 'https://wastless.herokuapp.com/EditProduct';

  private lienDeleteProduct = 'https://wastless.herokuapp.com/DeleteProduct?idProduct=';

  constructor(public http: HttpClient) { }


  public GetProducts(product: string, page: number){

    const lienSerch = this.lienSearch+product+'&Page='+page
    return this.http.get<any>(lienSerch);

  }

  public GetProductDetails(id: string){

    return this.http.get<any>(this.lienDetail+id);

  }

  public SendReservation(Reservation: Reservation){
    return this.http.post<any>(this.lienReservation, Reservation);
  }

  public AddProduct(product: Offer){
    return this.http.post<any>(this.lienAddProduct, product);
   }
  
  public MyPubs(id: number){
    return this.http.get<any>(this.lienMyPubs+id);
  }

  public EditProduct(product: Offer){

    return this.http.post<any>(this.lienEditProduct, product);
 
   }

   public DeleteProduct(id: number){
    return this.http.delete<any>(this.lienDeleteProduct+id);
  }

  public GetReservationReq(id: number){

  }

}
