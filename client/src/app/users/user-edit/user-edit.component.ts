import { UserService } from 'src/app/_services/user.service';
import { Role } from '../../_models/role';
import { Component, OnInit, Inject, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserData } from 'src/app/_models/user-data';
import { first } from 'rxjs/operators';
import { Photo } from 'src/app/_models/user-photo';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})

export class UserEditComponent {
  @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  rolSelected: FormControl;
  userEditForm: FormGroup;
  submitted = false;
  loading = false;
  errorMessage: string;
  successMessage: string;
  imgBase64: string;
  image = new Image();

  videoWidth = 0;
  videoHeight = 0;
  constraints = {
    video: {
      facingMode: "environment",
      width: { ideal: 4096 },
      height: { ideal: 2160 }
    }
  };

  roles: Array<Role> = [
    { id: 1, name: "ADMIN" },
    { id: 2, name: "USER" },
  ];

  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: UserData,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private renderer: Renderer2) {
    this.userEditForm = new FormGroup({
      'id': new FormControl({ value: this.userData.id, type: 'hidden' }),
      'firstName': new FormControl(userData.firstName, [Validators.required]),
      'lastName': new FormControl(userData.lastName, [Validators.required]),
      'email': new FormControl(userData.email, [Validators.required, Validators.email]),
      'username': new FormControl({ value: userData.username, disabled: true }, [Validators.required]),
    });
    this.rolSelected = new FormControl(userData.roles[0].id, [Validators.required]);

    this.image.onload = (_event) => {
      this.canvas.nativeElement.getContext('2d').drawImage(this.image, 0, 0, 300, 150);
    };
    this.image.src = "../../../assets/img/no-img-perfil.png";
    this.startCamera();
  }

  onNoClick(): void {
    this.dialogRef.close({ userDataChanged: this.userData });
  }

  //#region submit form
  onSubmit(): void {
    this.submitted = true;
    this.userEditForm.disable();
    this.rolSelected.disable();
    this.successMessage = "";
    this.errorMessage = "";

    if (this.userEditForm.invalid) {
      return;
    }
    this.loading = true;

    this.userService.edit(this.buildUser())
      .pipe(first())
      .subscribe(
        data => {
          this.userData = data;
          this.loading = false;
          this.successMessage = "El usurio fue guardado con éxito";
          this.userEditForm.enable();
          this.rolSelected.enable();
          this.userEditForm.controls['username'].disable();
        },
        error => {
          this.errorMessage = error;
          this.loading = false;
          this.errorMessage = "El usurio fue guardado con éxito";
          this.userEditForm.enable();
          this.rolSelected.enable();
          this.userEditForm.controls['username'].disable();
        });
  }
  //#endregion

  //#region Subir fotos manualmente
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgBase64 = reader.result.toString();
      }
    }
  }
  //#endregion

  //#region Manejo de la camara
  startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
      alert('Sorry, camera not available.');
    }
  }

  attachVideo(stream) {
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
    this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
  }

  capture() {
    this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
    this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
    this.imgBase64 = this.canvas.nativeElement.toDataURL();
  }

  handleError(error) {
    console.log('Error: ', error);
  }
  //#endregion

  //#region privada
  private buildUser(): UserData {
    let user = new UserData();
    let roles = new Array<Role>();
    let photos = new Array<Photo>();

    user.id = this.userEditForm.controls['id'].value.value;
    user.firstName = this.userEditForm.controls['firstName'].value;
    user.lastName = this.userEditForm.controls['lastName'].value;
    user.username = this.userEditForm.controls['username'].value;
    user.email = this.userEditForm.controls['email'].value;
    roles.push({ id: this.rolSelected.value, name: "" });
    if(this.imgBase64 != undefined)
      photos.push({ id: user.id, photo: this.convertDataURIToBinary(this.imgBase64) });
    user.roles = roles;
    user.photos = photos;
    return user;
  }

  private createImgInical(): void {

  }

  // private base64ToArrayBuffer(base64) {
  //   let b64Data = base64.split(',', 2)[1];
  //   //var byteArray = new Buffer(b64Data, 'base64');
  //   var byteArray = Buffer.from(b64Data);
  //   var blob = new Blob([byteArray], { type: 'application/pdf' });
  // }

   convertDataURIToBinary(dataURI) {
    var BASE64_MARKER = ';base64,';
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));
  
    for(var i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    var array2 = Array.from(array)
    return array2;
  }

  //#endregion
}
