import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoDTO } from 'src/dtos/producto.dto';
import { Producto } from 'src/entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {

    constructor(@InjectRepository(Producto) private readonly productoRepository:Repository<Producto>){}


    async obtenerProductos(): Promise <ProductoDTO[]>{
        const productos: ProductoDTO[] = await this.productoRepository.find({relations:['modelo']}) 
        return productos
    }

    async obtenerProducto(productoId:number): Promise <ProductoDTO> {
        const productoExistente:ProductoDTO = await this.productoRepository.findOne({where:{id:productoId},relations:['modelo']}) 
        
        if(!productoExistente){
            throw new BadRequestException(`Producto con id ${productoId} no existe`)
        }
    
    
        return productoExistente
    }

    async crearProducto(producto:ProductoDTO): Promise<ProductoDTO> {

        const productoExistente: ProductoDTO | null = await this.productoRepository.findOne({where: {
                                                                                             categoria:producto.categoria,
                                                                                             modelo:producto.modelo,
                                                                                             talle:producto.talle,
                                                                                             color:producto.color,
                                                                                             stock:producto.stock, //por si hay un stock diferente para que no lo cree igual
                                                                                            }})
        if(productoExistente){
            throw new BadRequestException("El producto ya existe" )
        }

        const nuevoProducto = await this.productoRepository.save(producto)
        
        return nuevoProducto
    }
    
    
}
