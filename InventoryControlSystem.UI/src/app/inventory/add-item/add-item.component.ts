import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  control_name: FormControl = new FormControl('', [Validators.required]);
  control_unit_count: FormControl = new FormControl('', [Validators.required]);
  control_unit_price: FormControl = new FormControl('', [Validators.required]);
  control_unit_reorderlevel: FormControl = new FormControl('', [Validators.required]);

  AddItemForm = new FormGroup({
    control_name: this.control_name,
    control_unit_count: this.control_unit_count,
    control_unit_price: this.control_unit_price,
    control_unit_reorderlevel: this.control_unit_reorderlevel,
  });

  ngOnInit(): void {
  }

  AddItem(){

  }
}
