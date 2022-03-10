import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.bikeModels.filter(bikeModel => bikeModel.toLowerCase().includes(filterValue));
  }

}
