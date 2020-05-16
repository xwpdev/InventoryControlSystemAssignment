import { Component, OnInit } from '@angular/core';
import Inventory from '../models/inventory';
import { InventoryService } from '../services/inventory.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddItemComponent } from './add-item/add-item.component';
import { ConfirmationModalComponent } from '../shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  isLoading = false;
  ItemList: Inventory[];

  get IsLoading() {
    return this.isLoading;
  }
  constructor(private inventoryService: InventoryService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadList();
  }

  OpenAddModal() {
    this.OpenEditModal(undefined);
  }

  OpenEditModal(item) {
    const modalRef = this.modalService.open(AddItemComponent, {
      size: 'lg',
      windowClass: 'view-modal',
      backdrop: 'static',
      centered: false
    });
    if (item) {
      modalRef.componentInstance.ActiveItem = item;
    }

    modalRef.result.then(
      result => {
        this.loadList();
      }, close => { }
    );
  }

  OpenDeleteConfirmation(item) {
    const modalRef = this.modalService.open(ConfirmationModalComponent, {
      size: 'sm',
      windowClass: 'view-modal',
      backdrop: 'static',
      centered: false
    });

    modalRef.result.then(
      result => {
        console.log(result);
        if (result === "CONFIRMED") {
          this.inventoryService.Delete(item.id).subscribe(res => {
            if (res) {
              alert("Item deleted successfully!");
              this.loadList();
            }
          });
        }
      }, close => { }
    );
  }

  private loadList() {
    this.isLoading = true;
    this.inventoryService.List().subscribe(res => {
      this.ItemList = res;
      this.isLoading = false;
    });
  }
}
