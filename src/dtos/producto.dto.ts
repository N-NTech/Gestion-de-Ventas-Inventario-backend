import { CategoriaEnum } from "src/enums/categoriaEnum.enum";
import { ModeloDTO } from "./modelo.dto";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class ProductoDTO {

    id:number;

    categoria: CategoriaEnum
    
    @Type(() => ModeloDTO)
    @ValidateNested()
    modelo:ModeloDTO;

    talle: number

    color: String

    stock: number;


}