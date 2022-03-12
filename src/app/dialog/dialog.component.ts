import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


  actionBtn: string = 'Save';
  dialogTitle: string = 'Add Bike';

  productForm: FormGroup;

  bikeTypes: string[] = [
    'Cruiser',
    'Sport',
    'Standard',
    'Dirt',
    'Mopad',
    'Scooter'
  ];

  bikeBrands: string[] = [
    'TVS',
    'Bajaj',
    'Hero',
    'Honda',
    'Yamaha',
    'Suzuki',
    'Runner'
  ];

  bikeModels: string[] = [
    'Hero Splendor Plus',
    'TVS Radeon',
    'TVS Striker',
    'TVS Apache RTR',
    'Hero Hunk',
    'Hero Glamour',
    'Bajaj CT 100',
    'Bajaj Platina',
    'Bajaj Avenger',
    'Bajaj Pulser NS',
    'Suzuki Gixxer',
    'Suzuki Hayate',
    'Honda Rapsol',
    'Honda Livo'
  ];

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.productForm = this.formBuilder.group({
      bikeType: ['', Validators.required],
      bikeBrand: ['', Validators.required],
      bikeModel: ['', Validators.required],
      kilometersRun: ['', Validators.required],
      engineCapacity: ['', Validators.required],
      date: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
    })

    if (this.editData) {
      this.dialogTitle = 'Edit Info'
      this.actionBtn = 'Update';
      this.productForm.controls['bikeType'].setValue(this.editData.bikeType);
      this.productForm.controls['bikeBrand'].setValue(this.editData.bikeBrand);
      this.productForm.controls['bikeModel'].setValue(this.editData.bikeModel);
      this.productForm.controls['kilometersRun'].setValue(this.editData.kilometersRun);
      this.productForm.controls['engineCapacity'].setValue(this.editData.engineCapacity);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['description'].setValue(this.editData.description);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.bikeModels.filter(bikeModel => bikeModel.toLowerCase().includes(filterValue));
  }

  saveData() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert("Product has been added successfully");
            this.productForm.reset();
            this.dialogRef.close();

          },
          error: () => {
            alert("Error! Could not add new product.")
          }
        })
      }
    }
    else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Product updated successfully');
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        alert('Error occured while updating record.')
      }
    });
  }

}
