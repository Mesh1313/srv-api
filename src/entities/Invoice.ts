import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { WorkOrder } from "./WorkOrder";

export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  PARTIAL = "partial",
  CANCELED = "canceled",
}

export enum PaymentMethod {
  CASH = "cash",
  CREDIT_CARD = "credit_card",
  DEBIT_CARD = "debit_card",
  CHECK = "check",
  BANK_TRANSFER = "bank_transfer",
  PAYMENT_PLAN = "payment_plan",
}

@Entity("invoices")
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", unique: true })
  invoiceNumber: string;

  @Column({ type: "timestamp", nullable: true })
  issueDate: Date;

  @Column({ type: "timestamp", nullable: true })
  dueDate: Date;

  @Column({
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  paymentStatus: PaymentStatus;

  @Column({
    type: "enum",
    enum: PaymentMethod,
    nullable: true,
  })
  paymentMethod: PaymentMethod;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  subtotal: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  taxAmount: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  discount: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  total: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  amountPaid: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  balance: number;

  @Column({ type: "timestamp", nullable: true })
  paymentDate: Date;

  @Column("text", { nullable: true })
  notes: string;

  @ManyToOne(
    () => WorkOrder,
    (workOrder) => workOrder.invoices,
  )
  workOrder: WorkOrder;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
