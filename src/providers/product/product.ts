import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../../pages/Class/Reservation';
import { Offer } from '../../pages/Class/Offer';

@Injectable()
export class ProductProvider {

  private lienADSProduct = "https://ecobusiness-server.herokuapp.com/ADSProduct";

  private lienEDProduct: string = 'https://ecobusiness-server.herokuapp.com/EDProduct';

  private lienReservationProduct: string = 'https://ecobusiness-server.herokuapp.com/ReservationProduct';

  private lienMyPubs: string = 'https://ecobusiness-server.herokuapp.com/MyPubs?idUser=';

  private lienReservationValidate = "https://ecobusiness-server.herokuapp.com/ReservationValidate";
 

  constructor(public http: HttpClient) { }
 

  // Ajoute d'une annance
  public AddProduct(product: Offer) {
    return this.http.post<any>(this.lienADSProduct, product);
  }

  // Supprimer une annance 
  public DeleteProduct(id: number) {
    return this.http.delete<any>(this.lienADSProduct + '?idProduct=' + id);
  }

  // recuperer les annances dans le serveur a distance 
  public GetProducts(product: string, page: number) {

    const lienSerch = this.lienADSProduct + '?ProductName=' + product + '&Page=' + page;
    return this.http.get<any>(lienSerch);

  }

  // Modifier une annance
  public EditProduct(product: Offer) {

    return this.http.post<any>(this.lienEDProduct, product);

  }

  // recuperer les details de produit
  public GetProductDetails(id: string) {

    return this.http.get<any>(this.lienEDProduct + '?ProductId=' + id);

  }

  // Envoie d'une demande de reservation 
  public SendReservation(Reservation: Reservation) {
    return this.http.post<any>(this.lienReservationProduct, Reservation);
  }

  // Recuperer les demandes de reservation pour un produit donner
  public GetReservationReq(id: number) {
    return this.http.get<any>(this.lienReservationProduct + '?id=' + id);
  }

  // Recuperer les annance poster par l'utilisateur acctuel 
  public MyPubs(id: number) {
    return this.http.get<any>(this.lienMyPubs + id);
  }

  // valider une demande de reservation
  public ReservationValidate(Reservation: Reservation) {
    return this.http.post<any>(this.lienReservationValidate, Reservation);
  }

}
