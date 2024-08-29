import { MarcaDTO } from "./marca.dto";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

export class ModeloDTO {

    id:number;

    @Type(() => MarcaDTO)
    @ValidateNested()
    marca: MarcaDTO

    nombre: String

    variante: String

}