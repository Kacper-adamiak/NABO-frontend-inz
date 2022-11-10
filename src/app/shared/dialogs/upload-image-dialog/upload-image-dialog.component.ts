import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../../services/snack-bar/snackbar.service";
import {ImageService} from "../../../services/image/image.service";
import {HttpClient, HttpEvent, HttpEventType, HttpProgressEvent, HttpResponse} from "@angular/common/http";
import {map} from "rxjs";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-upload-image-dialog',
  templateUrl: './upload-image-dialog.component.html',
  styleUrls: ['./upload-image-dialog.component.scss']
})
export class UploadImageDialogComponent implements OnInit {

  image = new UntypedFormControl(null)
  name = new UntypedFormControl('')
  spinnerValue = 0;
  spinnerShow = false;
  spinnerMode: ProgressSpinnerMode = 'determinate'

  selectedFile = null

  constructor(
    public dialogRef: MatDialogRef<UploadImageDialogComponent>,
    private imageService: ImageService,
    private snackBarService: SnackbarService,
    private formBuilder: UntypedFormBuilder,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
  }

  uploadFile(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  onNoClick() {

  }

  isHttpResponse<T>(event: HttpEvent<T>): event is HttpResponse<T> {
    return event.type === HttpEventType.Response
  }

  isHttpProgressEvent(event: HttpEvent<unknown>): event is HttpProgressEvent {
    return (
      event.type === HttpEventType.DownloadProgress ||
      event.type === HttpEventType.UploadProgress
    )
  }

  onAccept() {
    this.spinnerMode = 'determinate'
    var formData: any = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('name', this.name.value);
    formData.append('categoryName', 'KAT1');
    console.log(formData.get('image'))
    this.http.post<any>("http://localhost:8081/api/image/uploadImage", formData, {
      reportProgress: true,
      observe: 'events',
    } )
      .pipe(
        map((event) => {
          this.spinnerShow = true;
          if(this.isHttpProgressEvent(event)){
            if(event.total != undefined) {
              this.spinnerValue = (event.loaded / event.total!)*100
              console.log("progress:", (event.loaded / event.total!)*100)
            }
            if(event.loaded == event.total){
              this.spinnerMode = 'indeterminate'
            }
          }
          if (this.isHttpResponse(event)) {
            console.log("progress:", 100)
          }
          return event

        })
      )
      .subscribe({
      next: res => {
        if(this.isHttpResponse(res)) {
          console.log("res",res)
        }
      },
      error: error => {
        this.spinnerShow = false
        console.log("er",error)
      },complete: () => {
          this.spinnerShow = false
          console.log("complete")
        }
      },
    )
  }
}


