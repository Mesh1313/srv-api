import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Service } from "./Service";
import { WorkOrder } from "./WorkOrder";

@Entity("work_order_services")
export class WorkOrderService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  laborHours: number;

  @Column({ type: "jsonb", nullable: true })
  usedParts: {
    partId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];

  @Column("text", { nullable: true })
  notes: string;

  @Column({ type: "boolean", default: false })
  completed: boolean;

  @ManyToOne(
    () => WorkOrder,
    (workOrder) => workOrder.services,
  )
  workOrder: WorkOrder;

  @ManyToOne(
    () => Service,
    (service) => service.workOrderServices,
  )
  service: Service;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
