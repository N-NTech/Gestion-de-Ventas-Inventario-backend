import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Balance {
    
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    fecha:Date;

    @Column()
    motivo:string;

    @Column()
    monto:number;
}