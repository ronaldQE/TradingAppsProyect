import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class serviceDataBase{
    constructor(public database: AngularFireDatabase) {}

    actualizarDatos<tipo>(data: tipo,enlace: string,coleccion: string){
        this.database.list(enlace).set(coleccion,data);
    }

    recuperarDato(enlace: string){
        return this.database.list(enlace);
    }

    getCollection<tipo>(path:string){
      const collection = this.database.object<tipo>(path);
      return collection.valueChanges();
    }
    updateData<tipo>(data: tipo,enlace: string,coleccion: string){
      this.database.list(enlace).update(coleccion,data);
    }

    // addCuotaOne(enlase:string, num:number, valor:number){
    //   this.database.list(enlase).push("").child("c"+num).set(valor);
    //   //child("c"+num).set(valor);
    // }
}

