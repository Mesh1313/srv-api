import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "./Customer";
import { Vehicle } from "./Vehicle";

export enum AppointmentStatus {
  SCHEDULED = "scheduled",
  CONFIRMED = "confirmed",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELED = "canceled",
  NO_SHOW = "no_show",
}

@Entity("appointments")
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp" })
  appointmentDate: Date;

  @Column({ type: "timestamp" })
  startTime: Date;

  @Column({ type: "timestamp" })
  endTime: Date;

  @Column({
    type: "enum",
    enum: AppointmentStatus,
    default: AppointmentStatus.SCHEDULED,
  })
  status: AppointmentStatus;

  @Column("text", { nullable: true })
  reason: string;

  @Column({ type: "int", nullable: true })
  technicianId: number;

  @Column({ type: "boolean", nullable: true })
  reminderSent: boolean;

  @Column({ type: "timestamp", nullable: true })
  lastReminderDate: Date;

  @ManyToOne(
    () => Customer,
    (customer) => customer.appointments,
  )
  customer: Customer;

  @ManyToOne(
    () => Vehicle,
    (vehicle) => vehicle.appointments,
  )
  vehicle: Vehicle;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
