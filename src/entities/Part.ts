import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("parts")
export class Part {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", unique: true })
  partNumber: string;

  @Column({ type: "text" })
  name: string;

  @Column("text", { nullable: true })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  costPrice: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  salePrice: number;

  @Column({ type: "int", default: 0 })
  quantityInStock: number;

  @Column({ type: "int", default: 5 })
  reorderPoint: number;

  @Column({ type: "text", nullable: true })
  location: string;

  @Column({ type: "text", nullable: true })
  manufacturer: string;

  @Column({ type: "text", nullable: true })
  category: string;

  @Column({ type: "simple-array", nullable: true })
  compatibleVehicles: string[];

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "int", nullable: true })
  supplierId: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
