import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CustomerEntity } from "./Customer";
import { Invoice } from "./Invoice";
import { VehicleEntity } from "./Vehicle";
import { WorkOrderService } from "./WorkOrderService";

export enum WorkOrderStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

@Entity("work_orders")
export class WorkOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", unique: true })
  orderNumber: string;

  @Column({
    type: "enum",
    enum: WorkOrderStatus,
    default: WorkOrderStatus.PENDING,
  })
  status: WorkOrderStatus;

  @Column({ type: "int", nullable: true })
  technicianId: number;

  @Column("text", { nullable: true })
  customerConcerns: string;

  @Column("text", { nullable: true })
  diagnosticNotes: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  laborHours: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  partsTotal: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  laborTotal: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  taxAmount: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  grandTotal: number;

  @Column({ type: "timestamp", nullable: true })
  startDate: Date;

  @Column({ type: "timestamp", nullable: true })
  completionDate: Date;

  @ManyToOne(
    () => CustomerEntity,
    (customer) => customer.workOrders,
  )
  customer: CustomerEntity;

  @ManyToOne(
    () => VehicleEntity,
    (vehicle) => vehicle.workOrders,
  )
  vehicle: VehicleEntity;

  @OneToMany(
    () => WorkOrderService,
    (workOrderService) => workOrderService.workOrder,
    { cascade: true },
  )
  services: WorkOrderService[];

  @OneToMany(
    () => Invoice,
    (invoice) => invoice.workOrder,
  )
  invoices: Invoice[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
