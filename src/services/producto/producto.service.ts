import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModeloDTO } from 'src/dtos/modelo.dto';
import { ProductoDTO } from 'src/dtos/producto.dto';
import { Modelo } from 'src/entities/modelo.entity';
import { Producto } from 'src/entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {

    constructor(
        @InjectRepository(Producto) private readonly productoRepository:Repository<Producto>,
        @InjectRepository(Modelo) private readonly modeloRepository:Repository<Modelo>
    ){}


    async obtenerProductos(): Promise <ProductoDTO[]>{
        const productos: ProductoDTO[] = await this.productoRepository.find({relations:['modelo', 'modelo.marca']}) 
        return productos
    }

    async obtenerProductosByModelo(idModel: number): Promise<ProductoDTO[]> {

        let modeloExistente: ModeloDTO;
        let productos: ProductoDTO[] = []

        try {
            modeloExistente = await this.modeloRepository.findOneByOrFail({id: idModel})
        } catch (error) {
            Logger.error('Error al buscar modelo con id ' + idModel + ': ' + error.message);
            throw new BadRequestException(`Modelo con id ${idModel} no encontrado.`)
        }
       
        try {
            productos = await this.productoRepository.find({where: {modelo:modeloExistente} ,relations:['modelo']})
        } catch (error) {
            Logger.error('Error al buscar productos con modelo ' + modeloExistente + ': ' + error.message);
            throw new BadRequestException(`Productos con modelo ${modeloExistente} no encontrados.`)
        }
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
                                                                                             stock:producto.stock, //por si hay un stock diferente para que no lo cree igual
                                                                                            }})
        if(productoExistente){
            throw new BadRequestException("El producto ya existe" )
        }

        const nuevoProducto = await this.productoRepository.save(producto)
        
        return nuevoProducto
    }
    
    
}
