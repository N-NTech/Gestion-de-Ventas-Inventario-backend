import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductoDTO } from 'src/dtos/producto.dto';
import { ProductoService } from 'src/services/producto/producto.service';

@Controller('producto')
export class ProductoController {

    constructor(private readonly productoService:ProductoService){}

    @Get()
    obtenerProductos():Promise<ProductoDTO[]>{
        return this.productoService.obtenerProductos()
    }

    @Get('/modelo/:idModel')
    obtenerProductosByModelo(@Param('idModel') idModel:number): Promise<ProductoDTO[]>{
        return this.productoService.obtenerProductosByModelo(idModel)
    }

    @Get(':id')
    obtenerProducto(@Param('id') id:number): Promise<ProductoDTO>{
        return this.obtenerProducto(id)
    }

    @Post()
    crearProducto(@Body() producto:ProductoDTO): Promise<ProductoDTO>{
        return this.productoService.crearProducto(producto)
    }


}
