import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../../services/snack-bar/snackbar.service";
import {ImageService} from "../../../services/image/image.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-upload-image-dialog',
  templateUrl: './upload-image-dialog.component.html',
  styleUrls: ['./upload-image-dialog.component.scss']
})
export class UploadImageDialogComponent implements OnInit {

  image = new FormControl(null)
  name = new FormControl('')

  selectedFile = null

  constructor(
    public dialogRef: MatDialogRef<UploadImageDialogComponent>,
    private imageService: ImageService,
    private snackBarService: SnackbarService,
    private formBuilder: FormBuilder,
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

  submitForm() {
    var formData: any = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('name', this.name.value);
    formData.append('categoryName', 'KAT1');
    console.log(formData.get('image'))
    this.http.post<any>("http://localhost:8081/api/image/uploadImage", formData, {headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})} ).subscribe(
      res => {
        console.log(res)
      },
      error => {
        console.log(error)
      }
    )
  }

  onNoClick() {

  }

  onAccept() {
  }
}


