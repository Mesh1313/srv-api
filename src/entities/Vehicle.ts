import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Appointment } from "./Appointment";
import { Customer } from "./Customer";
import { WorkOrder } from "./WorkOrder";

@Entity("vehicles")
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  make: string;

  @Column({ type: "text" })
  model: string;

  @Column({ type: "int" })
  year: number;

  @Column({ type: "text", unique: true })
  vin: string;

  @Column({ type: "text", nullable: true })
  licensePlate: string;

  @Column({ type: "text", nullable: true })
  color: string;

  @Column({ type: "text", nullable: true })
  engineType: string;

  @Column({ type: "text", nullable: true })
  transmission: string;

  @Column({ type: "int", nullable: true })
  mileage: number;

  @Column({ type: "timestamp", nullable: true })
  lastServiceDate: Date;

  @Column({ type: "jsonb", nullable: true })
  maintenanceHistory: any[];

  @Column({ type: "jsonb", nullable: true })
  recurringIssues: any[];

  @ManyToOne(
    () => Customer,
    (customer) => customer.vehicles,
  )
  owner: Customer;

  @OneToMany(
    () => WorkOrder,
    (workOrder) => workOrder.vehicle,
  )
  workOrders: WorkOrder[];

  @OneToMany(
    () => Appointment,
    (appointment) => appointment.vehicle,
  )
  appointments: Appointment[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
