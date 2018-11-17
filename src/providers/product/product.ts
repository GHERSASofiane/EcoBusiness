import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../../pages/Class/Reservation';
import { Offer } from '../../pages/Class/Offer';

@Injectable()
export class ProductProvider {

  private lienAEDGProduct = "https://ecobusiness-server.herokuapp.com/AEDGProduct";

  private lienAdDetails: string = 'https://ecobusiness-server.herokuapp.com/AdDetails';

  private lienReservationProduct: string = 'https://ecobusiness-server.herokuapp.com/ReservationProduct';

  private lienMyPubs: string = 'https://ecobusiness-server.herokuapp.com/MyPubs?idUser=';

  private lienReservationValidate = "https://ecobusiness-server.herokuapp.com/ReservationValidate";

  private compareUrl = "https://ecobusiness-server.herokuapp.com/compare";

  prices: any;
 

  constructor(public http: HttpClient) { }
 

  // Ajoute d'une annance
  public AddProduct(product: Offer) {
    return this.http.post<any>(this.lienAEDGProduct, product);
  }

  // Supprimer une annance 
  public DeleteProduct(id: number) {
    return this.http.delete<any>(this.lienAEDGProduct + '?idProduct=' + id);
  }

  // recuperer les annances dans le serveur a distance 
  public GetProducts(product: string, page: number) {

    const lienSerch = this.lienAEDGProduct + '?ProductName=' + product + '&Page=' + page;
    return this.http.get<any>(lienSerch);

  }

  // Modifier une annance
  public EditProduct(product: Offer) {

    return this.http.put<any>(this.lienAEDGProduct, product);

  }

  // recuperer les details de produit
  public GetProductDetails(id: string) {

    return this.http.get<any>(this.lienAdDetails + '?ProductId=' + id);

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

  // comparer les prix
  compareProduct(productName)
  {
    let params = new HttpParams().set('productName', productName);
    return this.http.get<any>(this.compareUrl, {params : params});
  }

  setPrices(prices)
  {
    this.prices = prices;
  }


}
