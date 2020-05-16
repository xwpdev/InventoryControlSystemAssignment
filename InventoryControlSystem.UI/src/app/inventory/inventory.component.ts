import { Component, OnInit } from '@angular/core';
import Inventory from '../models/inventory';
import { InventoryService } from '../services/inventory.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddItemComponent } from './add-item/add-item.component';

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
    this.modalService.open(AddItemComponent, {
      size: 'lg',
      windowClass: 'view-modal',
      backdrop: 'static',
      centered: false
    });
  }

  private loadList() {
    this.isLoading = true;
    this.inventoryService.List().subscribe(res => {
      this.ItemList = res;
      this.isLoading = false;
    });
  }
}
