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
    replaceData<tipo>(data: tipo,enlace: string,coleccion: string){
        this.database.list(enlace).set(coleccion,data);
    }

    recuperarDato(enlace: string){
        return this.database.list(enlace);
    }

    getCollection<tipo>(path:string){
      const collection = this.database.object<tipo>(path);
      collection.valueChanges().subscribe(a => {
          console.log(a);
      })
      return collection.valueChanges();
    }
    updateData<tipo>(data: tipo,enlace: string,coleccion: string){
      this.database.list(enlace).update(coleccion,data);
    }

    generateId(){
       let idGenerate:string =  this.database.createPushId();
       const data = {id: idGenerate}
       this.database.list("/Estimaciones").set(idGenerate, data);
       return idGenerate;
    }

    // addCuotaOne(enlase:string, num:number, valor:number){
    //   this.database.list(enlase).push("").child("c"+num).set(valor);
    //   //child("c"+num).set(valor);
    // }
}

