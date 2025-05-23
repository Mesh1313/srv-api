import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { WorkOrderService } from "./WorkOrderService";

@Entity("services")
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column("text", { nullable: true })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  basePrice: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  laborRate: number;

  @Column({ type: "int" })
  estimatedHours: number;

  @Column({ type: "text", nullable: true })
  category: string;

  @Column({ type: "simple-array", nullable: true })
  requiredParts: string[];

  @Column({ type: "simple-array", nullable: true })
  compatibleVehicleTypes: string[];

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @OneToMany(
    () => WorkOrderService,
    (workOrderService) => workOrderService.service,
  )
  workOrderServices: WorkOrderService[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
