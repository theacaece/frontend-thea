import { Component, OnInit } from '@angular/core';

import { RegistroService } from '../../_services/register.service';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.css']
})

export class CamaraComponent implements OnInit {
  loading: boolean = false;
  reconoce: boolean = false;
  resultado: boolean = false;
  dni: string = "37090520";
  error: string = "";

  constructor(private registroService: RegistroService) { }

  ngOnInit() {
  
  }

  reconocerPersona() {
    this.loading = true;
    this.reconoce = false;
    this.registroService.save(this.dni).subscribe(data => {
      this.loading = false;
      this.resultado = true;
      this.reconoce = true;
    }, error => console.error(error));
  }
}