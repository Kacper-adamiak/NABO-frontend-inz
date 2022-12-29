import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, UntypedFormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../../services/snackbar.service";
import {ImageService} from "../../../services/image.service";
import {HttpClient, HttpEvent, HttpEventType, HttpProgressEvent, HttpResponse} from "@angular/common/http";
import {map} from "rxjs";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../models/category";

@Component({
  selector: 'app-upload-image-dialog',
  templateUrl: './upload-image-dialog.component.html',
  styleUrls: ['./upload-image-dialog.component.scss']
})
export class UploadImageDialogComponent implements OnInit {

  category = new FormControl('', [Validators.required])
  image = new FormControl(null, [Validators.required])
  name = new FormControl('', [Validators.required])
  categories = [] as Category[]
  spinnerValue = 0;
  spinnerShow = false;
  spinnerMode: ProgressSpinnerMode = 'determinate'
  fileName: string = ''
  selectedFile!: File

  constructor(
    public dialogRef: MatDialogRef<UploadImageDialogComponent>,
    private imageService: ImageService,
    private snackBarService: SnackbarService,
    private formBuilder: UntypedFormBuilder,
    private categoryService: CategoryService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.categoryService.getCategories().subscribe({
      next: res => {
        this.categories = res
      }
    })
  }

  ngOnInit(): void {
  }

  uploadFile(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile!.name
  }

  onNoClick() {
    this.dialogRef.close()
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
    var formData = this.createNewFormData()
    this.addNewImage(formData)
  }

  addNewImage(formData: FormData) {
    this.spinnerMode = 'determinate'
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
            }
            if(event.loaded == event.total){
              this.spinnerMode = 'indeterminate'
            }
          }
          return event
        })
      )
      .subscribe({
        next: res => {
          if(this.isHttpResponse(res)) {
            this.spinnerShow = false
            this.snackBarService.openSuccessSnackBar(res.body.message)
            this.dialogRef.close(res.body.image)
          }
        },
        error: error => {
          this.spinnerShow = false
          this.snackBarService.openErrorSnackBar(error.error)
        }
      })
  }

  createNewFormData() {
    let formData = new FormData()
    formData.append('image', this.selectedFile);
    formData.append('name', this.name.value!);
    formData.append('categoryName', this.category.value!);
    return formData
  }

}


