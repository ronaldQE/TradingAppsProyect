import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class serviceDataBase {

  private enlaseMain = "/Estimaciones/estimacion-"

  private pathMain = "/Estimaciones"
  constructor(public database: AngularFireDatabase) { }

  actualizarDatos<tipo>(data: tipo, enlace: string, coleccion: string) {
    this.database.list(enlace).set(coleccion, data);
  }
  replaceData<tipo>(data: tipo, enlace: string, coleccion: string) {
    this.database.list(enlace).set(coleccion, data);
  }

  recuperarDato(enlace: string) {
    return this.database.list(enlace);
  }

  getCollection<tipo>(path: string) {
    const collection = this.database.object<tipo>(path);
    collection.valueChanges().subscribe(a => {
      //console.log(a);
    })
    return collection.valueChanges();
  }
  updateData<tipo>(data: tipo, enlace: string, coleccion: string) {
    this.database.list(enlace).update(coleccion, data);
  }

  // addCuotaOne(enlase:string, num:number, valor:number){
  //   this.database.list(enlase).push("").child("c"+num).set(valor);
  //   //child("c"+num).set(valor);
  // }



  //Nuevo metodos con ID de estimaciones
  getCollectionNew<tipo>(idEstim: number) {
    let url = `${this.enlaseMain}${idEstim}`

    const collection = this.database.object<tipo>(url);
    collection.valueChanges().subscribe(a => {

    })
    return collection.valueChanges();
  }
  getCollectionInside<tipo>(idEstim: number, path: string) {
    let url = `${this.enlaseMain}${idEstim}${path}`
    //console.log(url)
    const collection = this.database.object<tipo>(url);
    collection.valueChanges().subscribe(a => {

    })
    return collection.valueChanges();
  }


  updateDataInside<tipo>(idEstim: number, data: tipo, path: string, coleccion: string) {
    let url = `${this.enlaseMain}${idEstim}${path}`

    this.database.list(url).update(coleccion, data);
  }
  replaceDataInside<tipo>(idEstim: number, data: tipo, path: string, coleccion: string) {
    let url = `${this.enlaseMain}${idEstim}${path}`

    this.database.list(url).set(coleccion, data);
  }

  //----------------------------  NUEVO METODO CON ID--------//
  getCollectionEstim<tipo>(idEstim: number) {
    let url = `${this.enlaseMain}${idEstim}`

    const collection = this.database.object<tipo>(url);
    collection.valueChanges().subscribe(a => {

    })
    return collection.valueChanges();
  }

  createEstimacion() {
    let idGenerate: string = this.database.createPushId()
    const data = { id: idGenerate }
    this.database.list("/Estimaciones").set(idGenerate, data);

  }

  getEstimacionesList() {
    const list = this.database.list("/Estimaciones");
    list.valueChanges().subscribe(a => {

    })
    return list.valueChanges();
  }
  getEstimacion(idEstim: string) {
    const collection = this.database.object(`/Estimaciones/${idEstim}`);
    collection.valueChanges().subscribe(a => {

    })
    return collection.valueChanges();
  }
  getDataCollectionList(idEstim: string, path:string) {
    const collection = this.database.list(`/Estimaciones/${idEstim}/${path}`);
    collection.valueChanges().subscribe(a => {

    })
    return collection.valueChanges();
  }
  getDataCollection<tipo>(idEstim: string, path:string) {
    const collection = this.database.object<tipo>(`/Estimaciones/${idEstim}/${path}`);
    collection.valueChanges().subscribe(a => {

    })
    return collection.valueChanges();
  }
  getProductList<tipo>(idEstim: string) {
    const collection = this.database.list<tipo>(`/Estimaciones/${idEstim}/productos`);
    collection.valueChanges().subscribe(a => {

    })
    return collection.valueChanges();
  }
  getInsumosList<tipo>(idEstim: string, idProduct: string) {
    const collection = this.database.list<tipo>(`/Estimaciones/${idEstim}/productos/${idProduct}/insumos`);
    collection.valueChanges().subscribe(a => {

    })
    return collection.valueChanges();
  }

  generateId():string {
    return this.database.createPushId()
  }
  createProdutCollection<tipo>(data: tipo, idEstim: string, coleccion: string) {

    this.database.list(`/Estimaciones/${idEstim}/productos`).update(coleccion, data);
  }
  addCollection<tipo>(data: tipo, idEstim: string, coleccion: string) {

    this.database.list(`/Estimaciones/${idEstim}`).update(coleccion, data);
  }

  createInsumoCollection<tipo>(data: tipo, idEstim: string, idProduct:string, coleccion: string) {

    this.database.list(`/Estimaciones/${idEstim}/productos/${idProduct}/insumos`).update(coleccion, data);
  }
  updateDataCollection<tipo>(data: tipo, idEstim: string, path:string, coleccion: string) {

    this.database.list(`/Estimaciones/${idEstim}/${path}`).update(coleccion, data);
  }


  deleteCollection(idEstim: string, path: string){
    this.database.list(`/Estimaciones/${idEstim}/${path}`).remove()

  }


}


// export class serviceDataBase{
//     constructor(public database: AngularFireDatabase) {}

//     actualizarDatos<tipo>(data: tipo,enlace: string,coleccion: string){
//         this.database.list(enlace).set(coleccion,data);
//     }
//     replaceData<tipo>(data: tipo,enlace: string,coleccion: string){
//         this.database.list(enlace).set(coleccion,data);
//     }

//     recuperarDato(enlace: string){
//         return this.database.list(enlace);
//     }

//     getCollection<tipo>(path:string){
//       const collection = this.database.object<tipo>(path);
//       collection.valueChanges().subscribe(a => {
//           console.log(a);
//       })
//       return collection.valueChanges();
//     }
//     updateData<tipo>(data: tipo,enlace: string,coleccion: string){
//       this.database.list(enlace).update(coleccion,data);
//     }

//     generateId(){
//        let idGenerate:string =  this.database.createPushId();
//        const data = {id: idGenerate}
//        this.database.list("/Estimaciones").set(idGenerate, data);
//        return idGenerate;
//     }

//     // addCuotaOne(enlase:string, num:number, valor:number){
//     //   this.database.list(enlase).push("").child("c"+num).set(valor);
//     //   //child("c"+num).set(valor);
//     // }
// }

