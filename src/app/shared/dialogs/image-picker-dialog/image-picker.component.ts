import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../../services/snack-bar/snackbar.service";
import {ImageService} from "../../../services/image/image.service";
import {Image} from "../../../models/image";
import {PageEvent} from "@angular/material/paginator";
import {Category} from "../../../models/category";
import {CategoryService} from "../../../services/category/category.service";
import {UntypedFormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-image-picker-dialog',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss']
})
export class ImagePickerComponent implements OnInit, AfterViewInit{

  chosenImage!: Image
  data: Image[] = [] as Image[]
  filteredData: Image[] = [] as Image[]
  slicedData!: Image[]
  paginatorLength: number = 0
  paginatorPageSize = 6
  paginatorPageSizeOptions = [6, 12, 24]


  categoryFormControl = new UntypedFormControl('', [Validators.required])

  categories!: Category[]

  constructor(
    public dialogRef: MatDialogRef<ImagePickerComponent>,
    private imageService: ImageService,
    private snackBarService: SnackbarService,
    private categoryService: CategoryService
  ) {
    this.categoryService.getCategories().subscribe({
      next: res => {
        this.categories = res
      },
      error: err => {
        console.log(err)
      }
    })

  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAccept() {
    console.log("dialog image name: ", this.chosenImage)
    this.dialogRef.close(this.chosenImage);
  }

  onSelectChange(event: string) {
    this.imageService.getImagesByCategory(event).subscribe({
      next: res => {
        this.data = res;
        this.filteredData = JSON.parse(JSON.stringify(res))
        this.paginatorLength = this.filteredData.length
        this.slicedData = this.filteredData.slice(0, this.paginatorPageSize)
        console.log(this.filteredData)
      }
    })
  }

  paginatorPageEvent(event: PageEvent){
    console.log(event)
    const startIndex = event.pageIndex * event.pageSize
    let endIndex = startIndex + event.pageSize
    if (endIndex > this.filteredData.length) {
      endIndex = this.filteredData.length
    }
    this.slicedData = this.filteredData.slice(startIndex, endIndex)
  }

  chooseImage(imageData: Image) {
    this.chosenImage = imageData
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredData = this.data.filter(item => {return item.name.trim().toLowerCase().includes(filterValue)});
    this.paginatorLength = this.filteredData.length
    this.slicedData = this.filteredData.slice(0, this.paginatorPageSize)
    console.log(this.filteredData)
  }


}
