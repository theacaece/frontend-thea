import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { RegistroService } from '../../_services/register.service';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.css']
})

export class CamaraComponent implements OnInit {

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

  constructor(private registroService: RegistroService) { 
    
  }

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
    this.reconoce = false;
    this.registroService.save(this.dni).subscribe(data => {
      this.loading = false;
      this.resultado = true;
      this.reconoce = true;
    }, error => console.error(error));
  }

}