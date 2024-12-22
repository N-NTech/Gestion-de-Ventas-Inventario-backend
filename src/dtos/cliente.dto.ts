import { IsEmpty, IsOptional } from "class-validator";

export class ClienteDTO{

    @IsOptional()
    @IsEmpty({ message: 'El id del cliente no debe ser enviado' }) 
    id:number

    nombre:string;

    dni:string;

    telefono:string;
    
    
}