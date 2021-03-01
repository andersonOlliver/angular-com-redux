import { Add } from './../../actions/cart.action';
import { DataService } from './../../services/data.service';
import { CartModel } from './../../models/cart.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: any[] = null;

  constructor(
    private store: Store<{cart: CartModel}>,
    private toastCtrl: ToastController,
    private service: DataService) {

   }

  ngOnInit() {
    this.service
    .getProducts()
    .subscribe((data) => {
      this.products = data;
    })
  }

  async add(product){
    this.store.dispatch(Add(product));
    const toast = await this.toastCtrl.create({
      message: `${product.title} adicionado ao carrinho`,
      duration: 2000,
      buttons:[
        {
          text: 'OK',
        }
      ]
    });
    toast.present();
  }
}
