import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./cliente.entity";
import { Producto } from "./producto.entity";
import { MetodoDePagoEnum } from "src/enums/metodoPagoEnum.enum";
import { EstadoEnum } from "src/enums/estadoEnum.enum";


@Entity()
export class Pedido {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(() => Cliente, (cliente) => cliente.pedido,{cascade: true})
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

    @ManyToMany(() => Producto, producto => producto.pedidos, {cascade: true})
    @JoinTable()
    productos: Producto[]

    @Column()
    precioVenta: number;

    @Column()
    precioCosto: number;

    @Column()
    isEnvio: boolean;

    @Column()
    direccion: String;



    constructor(
        cliente: Cliente,
        fechaDespacho: Date,
        metodoDePago: MetodoDePagoEnum,
        estado: EstadoEnum,
        productos: Producto[],
        precioVenta: number,
        precioCosto: number,
        isEnvio: boolean,
        direccion: string
    ) {
        this.cliente = cliente;
        this.fechaDespacho = fechaDespacho;
        this.metodoDePago = metodoDePago;
        this.estado = estado;
        this.productos = productos;
        this.precioVenta = precioVenta;
        this.precioCosto = precioCosto;
        this.isEnvio = isEnvio;
        this.direccion = direccion;
    }


}