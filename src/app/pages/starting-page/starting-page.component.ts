import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../services/dialog/dialog.service";
import {SnackbarService} from "../../services/snack-bar/snackbar.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-starting-page',
  templateUrl: './starting-page.component.html',
  styleUrls: ['./starting-page.component.scss'],
  providers: [MessageService]
})
export class StartingPageComponent implements OnInit {

  constructor(private dialogService: DialogService,
              private snackbarService: SnackbarService,
              private messageService: MessageService

  ) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialog = this.dialogService.openUploadImage()
    dialog.afterClosed().subscribe({
      next: value => {
        if(value){
          console.log(value)
        }
      },
      error: err => {
        console.log('something went wrong')
      }
    })
  }

  openSnackbar() {
    this.snackbarService.openSuccessSnackBar("działa")
  }

  openImagePicker() {
    const dialog = this.dialogService.openImagePicker()
    dialog.afterClosed().subscribe({
      next: value => {
        if(value){
          console.log("after close picker: ",value)
        }
      },
      error: err => {
        console.log('something went wrong')
      }
    })
  }

  addSingle() {
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
  }

  openDiffDialog() {

  }

}
