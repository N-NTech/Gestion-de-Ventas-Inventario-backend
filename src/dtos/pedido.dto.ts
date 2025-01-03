import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MetodoDePagoEnum } from "src/enums/metodoPagoEnum.enum";
import { EstadoEnum } from "src/enums/estadoEnum.enum";
import { Type } from "class-transformer";
import { IsInt, IsPositive, Validate, ValidateNested } from "class-validator";
import { ClienteDTO } from "./cliente.dto";
import { ProductoDTO } from "./producto.dto";


export class PedidoDTO {

    id: number;

    @Type(() => ClienteDTO)
    @ValidateNested()
    cliente: ClienteDTO;

    fechaCreacion: Date

    fechaDespacho: Date

    metodoDePago: MetodoDePagoEnum

    estado: EstadoEnum

    @Type(() => ProductoDTO)
    @ValidateNested()
    productos: ProductoDTO[]

    @Type(() => Number)
    @IsInt({ message: 'El precio de venta debe ser un número entero' })
    @IsPositive({ message: 'El precio de venta debe ser un número positivo' })
    precioVenta: number;
  
    @Type(() => Number)
    @IsInt({ message: 'El precio de costo debe ser un número entero' })
    @IsPositive({ message: 'El precio de costo debe ser un número positivo' })
    precioCosto: number;

    isEnvio: boolean;

    direccion: String;

}