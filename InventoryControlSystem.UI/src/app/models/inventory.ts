export default class Inventory {
  id?: number;
  name: string;
  description?: string;
  unitCount: number;
  reorderCount: number;
  unitPrice: number;
  addedBy: string;
  addedByName: string;
  addedDate: Date;
  updatedBy?: string;
  updatedByName?: string;
  updatedDate?: Date;
}
