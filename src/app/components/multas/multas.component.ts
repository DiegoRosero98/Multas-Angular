import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MultaService } from 'src/app/services/multa.service';

@Component({
  selector: 'app-multas',
  templateUrl: './multas.component.html',
  styleUrls: ['./multas.component.css']
})
export class MultasComponent implements OnInit {

  multas: any[] = [];
  fechaActual: any[] = [];

  constructor(private _multas: MultaService, private router: Router) {
    
   }

  ngOnInit(): void {
    this.getMultas();
    this.getFechaActual();    
  }

  getMultas(){    
    var fechaFin =  this.getFechaActual();              
    this._multas.getMultas().subscribe(data => {
      this.multas = [];
      data.forEach((element:any) => {
        // console.log(element.payload.doc.id);
        //console.log(element.payload.doc.data());              
        this.multas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })        
      });
      console.log(this.multas);    
      console.log("Fecha Actual: "+ fechaFin)
      this.calcularMulta()
    });
  }

  getFechaActual(){
    var fechaActual = new Date();
    var mes = fechaActual.getUTCMonth() + 1;
    var dia = fechaActual.getUTCDate();
    var year = fechaActual.getUTCFullYear();     
    var fechaObtenida;    
    return  fechaObtenida = mes+"/"+dia+"/"+year;
  }

  calcularMulta(){
    var fechaFin = new Date(this.getFechaActual());
    var fecha1 = new Date(this.getFechaMaxPago());
    var fecha2 = new Date(this.getFechaMaxPago1());
    var fecha3 = new Date(this.getFechaMaxPago2());

    let msDia = 24 * 60 * 60 * 1000;
    let msTranscurridos = Math.abs(fecha1.getTime() - fechaFin.getTime());
    let diasTranscurridos = Math.round(msTranscurridos/msDia);

    let msTranscurridos2 = Math.abs(fecha2.getTime() - fechaFin.getTime());
    let diasTranscurridos2 = Math.round(msTranscurridos2 / msDia);

    let msTranscurridos3 = Math.abs(fecha3.getTime() - fechaFin.getTime());
    let diasTranscurridos3 = Math.round(msTranscurridos3 / msDia);

    console.log("Días transcurridos: " + diasTranscurridos + "\n" + "Días transcurridos: " + diasTranscurridos2 + "\n" + "Días transcurridos: " + diasTranscurridos3)
    var cargo = 5;
    var multa1 = cargo * diasTranscurridos;
    var multa2 = cargo *diasTranscurridos2;
    var multa3 =  cargo * diasTranscurridos3;
    // console.log(multa1+"\n"+multa2+"\n"+multa3)
   
  }



  getFechaMaxPago(){
    var fecha = new Date('1/11/2022');
    return fecha;
  }

  getFechaMaxPago1() {
    var fecha = new Date('1/6/2022');
    return fecha;
  }

  getFechaMaxPago2() {
    var fecha = new Date('2/3/2022');
    return fecha;
  }
 
}
