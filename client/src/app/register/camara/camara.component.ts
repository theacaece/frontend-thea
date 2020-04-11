import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

import { IngresoService } from '../../_services/ingreso.service';
import { ReconocerService } from '../../_services/reconocer.service';
import { CommonService } from '../../_services/common.service';
import { Router, ActivatedRoute } from '@angular/router';

import { IngresoListComponent } from '../../configuration/ingreso-list/ingreso-list.component';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.css']
})

export class CamaraComponent implements OnInit {

  MSJ_OK = "Imagen enviada para reconocimiento";
  MSJ_ERROR = "Ha ocurrido un error";

  @ViewChild(IngresoListComponent) ingresoListComponent: IngresoListComponent;

  @ViewChild("video", {static: false})
  public video: ElementRef;

  @ViewChild("canvas", {static: false})
  public canvas: ElementRef;

  public captures: Array<any>;
  
  loading: boolean = false;
  reconoce: boolean = false;
  resultado: boolean = false;
  dni: string = "33016244";
  error: string = "";

  serverData: JSON;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private registroService: IngresoService, 
              private reconocerService: ReconocerService,
              private commonService: CommonService) {}

  ngOnInit() {
  
  }

  public ngAfterViewInit() {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            this.video.nativeElement.srcObject = stream;
            this.video.nativeElement.play();
        });
    }
  }

  public capture() {
      var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
      this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
  }

  reconocerPersona() {
    this.loading = true;
    this.reconocerService;
    this.reconocerService.post().subscribe(
      data => {
        this.serverData = data as JSON
        console.log(this.serverData);
        this.loading = false;
        this.commonService.alertar(this.MSJ_OK);
        this.ingresoListComponent.ngOnInit();
      },
      error => {
        this.commonService.alertar(this.MSJ_ERROR);
        this.error = error;
        this.loading = false;
      });
  }

  onReload() {
    this.router.navigate(['/camara'],{relativeTo:this.route})
  }

}