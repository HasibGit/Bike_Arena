import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

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

  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<DialogComponent>) { }

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
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.bikeModels.filter(bikeModel => bikeModel.toLowerCase().includes(filterValue));
  }

  saveData() {
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

}
