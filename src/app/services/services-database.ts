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
}