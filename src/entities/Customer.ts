import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Appointment } from "./Appointment";
import { BaseEntity } from "./BaseEntity";
import { VehicleEntity } from "./Vehicle";
import { WorkOrder } from "./WorkOrder";

@Entity("customers")
export class CustomerEntity extends BaseEntity<any> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ type: "text", nullable: true })
  phoneNumber: string;

  @Column({ type: "text", nullable: true })
  address: string;

  @Column({ type: "text", nullable: true })
  city: string;

  @Column({ type: "text", nullable: true })
  state: string;

  @Column({ type: "text", nullable: true })
  zipCode: string;

  @Column({ type: "int", default: 0 })
  loyaltyPoints: number;

  @Column({ type: "boolean", default: false })
  receivePromotions: boolean;

  @Column({ type: "text", nullable: true })
  preferredContactMethod: string;

  @Column({ type: "jsonb", nullable: true })
  communicationHistory: any[];

  @OneToMany(
    () => VehicleEntity,
    (vehicle) => vehicle.owner,
  )
  vehicles: VehicleEntity[];

  @OneToMany(
    () => Appointment,
    (appointment) => appointment.customer,
  )
  appointments: Appointment[];

  @OneToMany(
    () => WorkOrder,
    (workOrder) => workOrder.customer,
  )
  workOrders: WorkOrder[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  toPlainObject() {
    throw new Error("Method not implemented.");
  }
}
