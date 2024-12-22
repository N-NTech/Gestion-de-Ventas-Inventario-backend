import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PedidoDTO } from 'src/dtos/pedido.dto';
import { Pedido } from 'src/entities/pedido.entity';
import { PedidoService } from 'src/services/pedido/pedido.service';
import { Logger } from '@nestjs/common';
import { ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';




@Controller('pedido')
export class PedidoController {

    constructor(private readonly pedidoService: PedidoService) {
    }


    @Get() 
    async obtenerPedios():Promise<Pedido[]>{
        Logger.log('Obtieniendo pedidos');
        return this.pedidoService.obtenerPedidos()
    }

    @Get(':id')
    async obtenerPedido(@Param('id') id:number):Promise<PedidoDTO>{
        Logger.log('Obtieniendo pedido con ID: '+id);
        return this.pedidoService.obtenerPedido(id)
    }


    @Post()
    async crearPedido(@Body() pedido:PedidoDTO): Promise<PedidoDTO>{
        Logger.log('Creando pedido');
        return this.pedidoService.crearPedido(pedido)
    }

    @Post('/list')
    async crearPedidos(@Body() listPedidos: PedidoDTO[]): Promise<PedidoDTO[]> {
        Logger.log('Creando pedido de una lista');
        return this.pedidoService.crearPedidos(listPedidos)
    }

}
