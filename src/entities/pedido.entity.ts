import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./cliente.entity";
import { Producto } from "./producto.entity";
import { MetodoDePagoEnum } from "src/enums/metodoPagoEnum.enum";
import { EstadoEnum } from "src/enums/estadoEnum.enum";


@Entity()
export class Pedido {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(() => Cliente, (cliente) => cliente.pedido,{cascade: ["insert"]})
    @JoinColumn()
    cliente: Cliente;

    @CreateDateColumn()
    fechaCreacion: Date

    @Column()
    fechaDespacho: Date

    @Column({type:'enum', enum: MetodoDePagoEnum})
    metodoDePago: MetodoDePagoEnum

    @Column({type: 'enum', enum:EstadoEnum})
    estado: EstadoEnum

    @ManyToOne(() => Producto, producto => producto.pedidos, {cascade: ["insert"]})
    @JoinColumn()
    producto: Producto

    @Column()
    precioVenta: number;

    @Column()
    precioCosto: number;

    @Column()
    isEnvio: boolean;

    @Column()
    direccion: String;

}