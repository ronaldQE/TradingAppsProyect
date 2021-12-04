import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class serviceDataBase{

    private enlaseMain="/Estimaciones/estimacion-"
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
          //console.log(a);
      })
      return collection.valueChanges();
    }
    updateData<tipo>(data: tipo,enlace: string,coleccion: string){
      this.database.list(enlace).update(coleccion,data);
    }

    // addCuotaOne(enlase:string, num:number, valor:number){
    //   this.database.list(enlase).push("").child("c"+num).set(valor);
    //   //child("c"+num).set(valor);
    // }



    //Nuevo metodos con ID de estimaciones
    getCollectionNew<tipo>( idEstim:number){
      let url = `${this.enlaseMain}${idEstim}`

      const collection = this.database.object<tipo>(url);
      collection.valueChanges().subscribe(a => {

      })
      return collection.valueChanges();
    }
    getCollectionInside<tipo>( idEstim:number, path:string){
      let url = `${this.enlaseMain}${idEstim}${path}`
       //console.log(url)
      const collection = this.database.object<tipo>(url);
      collection.valueChanges().subscribe(a => {

      })
      return collection.valueChanges();
    }


    updateDataInside<tipo>(idEstim:number, data: tipo,path: string,coleccion: string){
      let url = `${this.enlaseMain}${idEstim}${path}`

      this.database.list(url).update(coleccion,data);
    }
    replaceDataInside<tipo>(idEstim:number, data: tipo,path: string, coleccion: string){
      let url = `${this.enlaseMain}${idEstim}${path}`

      this.database.list(url).set(coleccion,data);
  }

}

