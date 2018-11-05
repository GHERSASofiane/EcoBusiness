import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../../pages/Class/Reservation';
import { Offer } from '../../pages/Class/Offer';
 
@Injectable()
export class ProductProvider {

  private lienAddProduct = "https://wastless.herokuapp.com/AddProduct";  

  private lienReservation = "https://wastless.herokuapp.com/ReservationProduct";

  private lienReservationValidate = "https://wastless.herokuapp.com/ReservationValidate";

  private lienGetReservation = "https://wastless.herokuapp.com/ReservationProduct?id=";

  private lienDetail: string = 'https://wastless.herokuapp.com/ProductDetail?ProductId=';

  private lienSearch = 'https://wastless.herokuapp.com/ProductSearch?ProductName=';

  private lienMyPubs = 'https://wastless.herokuapp.com/MyPubs?idUser=';

  private lienEditProduct = 'https://wastless.herokuapp.com/EditProduct';

  private lienDeleteProduct = 'https://wastless.herokuapp.com/DeleteProduct?idProduct=';

  constructor(public http: HttpClient) { }

  // recuperer les annances dans le serveur a distance 
  public GetProducts(product: string, page: number){

    const lienSerch = this.lienSearch+product+'&Page='+page
    return this.http.get<any>(lienSerch);

  }

  // recuperer les details de produit
  public GetProductDetails(id: string){

    return this.http.get<any>(this.lienDetail+id);

  }

  // Envoie d'une demande de reservation 
  public SendReservation(Reservation: Reservation){
    return this.http.post<any>(this.lienReservation, Reservation);
  }

  // Ajoute d'une annance
  public AddProduct(product: Offer){
    return this.http.post<any>(this.lienAddProduct, product);
   }
  
  // Recuperer les annance poster par l'utilisateur acctuel 
  public MyPubs(id: number){
    return this.http.get<any>(this.lienMyPubs+id);
  }

  // Modifier une annance
  public EditProduct(product: Offer){

    return this.http.post<any>(this.lienEditProduct, product);
 
   }

  // Supprimer une annance 
  public DeleteProduct(id: number){
    return this.http.delete<any>(this.lienDeleteProduct+id);
  }

  // Recuperer les demandes de reservation pour un produit donner
  public GetReservationReq(id: number){
    return this.http.get<any>(this.lienGetReservation+id);
  }

  // valider une demande de reservation
  public ReservationValidate(Reservation: Reservation) {
    return this.http.post<any>(this.lienReservationValidate, Reservation);
  }

}
