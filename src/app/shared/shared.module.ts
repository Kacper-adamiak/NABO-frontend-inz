import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SuccessSnackbarComponent} from "./snackbars/success-snackbar/success-snackbar.component";
import {ErrorSnackbarComponent} from "./snackbars/error-snackbar/error-snackbar.component";
import {SpinnerDialogComponent} from "../services/dialog/spinner-dialog/spinner-dialog.component";
import {ImagePickerComponent} from "./dialogs/image-picker-dialog/image-picker.component";
import {UploadImageDialogComponent} from "./dialogs/upload-image-dialog/upload-image-dialog.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialExampleModule} from "../../material.module";
import {DataDifferenceDialogComponent} from './dialogs/data-difference-dialog/data-difference-dialog.component';
import {SearchFieldComponent} from './components/search-field/search-field.component';
import {ElevatedBoxHeaderComponent} from './components/elevated-box-header/elevated-box-header.component';
import {ElevatedBoxTopButtonsComponent} from './components/elevated-box-top-buttons/elevated-box-top-buttons.component';
import {DataTableComponent} from './components/data-table/data-table.component';
import {FirstToUppercasePipe} from './first-to-uppercase.pipe';


@NgModule({
    declarations: [
        SuccessSnackbarComponent,
        ErrorSnackbarComponent,
        SpinnerDialogComponent,
        ImagePickerComponent,
        UploadImageDialogComponent,
        DataDifferenceDialogComponent,
        SearchFieldComponent,
        ElevatedBoxHeaderComponent,
        ElevatedBoxTopButtonsComponent,
        DataTableComponent,
        FirstToUppercasePipe,
        ],
    exports: [
        SearchFieldComponent,
        ElevatedBoxHeaderComponent,
        ElevatedBoxTopButtonsComponent,
        DataTableComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialExampleModule
    ]
})
export class SharedModule { }
