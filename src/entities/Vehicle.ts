import type { Vehicle } from "@/api/vehicle/vehicleModel";
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
import { BaseEntity } from "./BaseEntity";
import { CustomerEntity } from "./Customer";
import { WorkOrder } from "./WorkOrder";

@Entity("vehicles")
export class VehicleEntity extends BaseEntity<Vehicle> {
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
    () => CustomerEntity,
    (customer) => customer.vehicles,
  )
  owner: CustomerEntity;

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

  /**
   * Converts the TypeORM entity to a plain Vehicle object
   * This ensures type safety and removes any ORM-specific properties
   */
  toPlainObject() {
    return {
      id: this.id,
      vin: this.vin,
      make: this.make,
      model: this.model,
      year: this.year,
      mileage: this.mileage,
      licensePlate: this.licensePlate,
      color: this.color,
      engineType: this.engineType,
      transmission: this.transmission,
      lastServiceDate: this.lastServiceDate,
      ownerId: this.owner.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
