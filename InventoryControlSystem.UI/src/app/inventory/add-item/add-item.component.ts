import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from 'src/app/services/inventory.service';
import Inventory from 'src/app/models/inventory';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  @Input() ActiveItem: Inventory;

  UserProfile;    // Auth0 User Data

  constructor(public activeModal: NgbActiveModal, private inventoryService: InventoryService, private authService: AuthService) {
    this.authService.getProfile((error, profile) => {
      this.UserProfile = profile;
    });
  }

  control_name: FormControl = new FormControl('', [Validators.required]);
  control_description: FormControl = new FormControl('', []);
  control_unit_count: FormControl = new FormControl('', [Validators.required]);
  control_unit_price: FormControl = new FormControl('', [Validators.required]);
  control_unit_reorderlevel: FormControl = new FormControl('', [Validators.required]);

  AddItemForm = new FormGroup({
    control_name: this.control_name,
    control_description: this.control_description,
    control_unit_count: this.control_unit_count,
    control_unit_price: this.control_unit_price,
    control_unit_reorderlevel: this.control_unit_reorderlevel,
  });

  ngOnInit(): void {
    if (this.ActiveItem) {
      this.control_name.setValue(this.ActiveItem.name);
      this.control_description.setValue(this.ActiveItem.description);
      this.control_unit_count.setValue(this.ActiveItem.unitCount);
      this.control_unit_price.setValue(this.ActiveItem.unitPrice);
      this.control_unit_reorderlevel.setValue(this.ActiveItem.reorderCount);
    }
  }

  SaveItem() {
    if (this.ActiveItem) {
      this.ActiveItem.name = this.control_name.value;
      this.ActiveItem.description = this.control_description.value;
      this.ActiveItem.unitCount = this.control_unit_count.value;
      this.ActiveItem.unitPrice = this.control_unit_price.value;
      this.ActiveItem.reorderCount = this.control_unit_reorderlevel.value;
      this.ActiveItem.updatedBy = this.UserProfile["sub"];
      this.ActiveItem.updatedByName = this.UserProfile["name"];
      this.ActiveItem.updatedDate = new Date();

      var sub = this.inventoryService.Update(this.ActiveItem).subscribe((res) => {
        alert("Item updated successfully!");
        this.AddItemForm.reset();
        this.activeModal.close();
      }
      ).add(() => {
        sub.unsubscribe();
      });

    } else {
      let newItem: Inventory = {
        name: this.control_name.value,
        description: this.control_description.value,
        unitCount: this.control_unit_count.value,
        unitPrice: this.control_unit_price.value,
        reorderCount: this.control_unit_reorderlevel.value,
        addedBy: this.UserProfile["sub"],
        addedByName: this.UserProfile["name"],
        addedDate: new Date()
      };

      var sub = this.inventoryService.Add(newItem).subscribe((res) => {
        alert("Item added successfully!");
        this.AddItemForm.reset();
        this.activeModal.close();
      }
      ).add(() => {
        sub.unsubscribe();
      });
    }
  }
}
