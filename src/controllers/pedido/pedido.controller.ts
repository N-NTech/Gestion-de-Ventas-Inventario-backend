import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PedidoDTO } from 'src/dtos/pedido.dto';
import { Pedido } from 'src/entities/pedido.entity';
import { PedidoService } from 'src/services/pedido/pedido.service';


@Controller('pedido')
export class PedidoController {

    constructor(private readonly pedidoService: PedidoService){}

    @Get() 
    async obtenerPedios():Promise<Pedido[]>{
        return this.pedidoService.obtenerPedidos()
    }

    @Get(':id')
    async obtenerPedido(@Param('id') id:number):Promise<PedidoDTO>{
        return this.pedidoService.obtenerPedido(id)
    }


    @Post()
    async crearPedido(@Body() pedido:PedidoDTO): Promise<PedidoDTO>{
        return this.pedidoService.crearPedido(pedido)
    }

    @Post('/list')
    async crearPedidos(@Body() listPedidos:PedidoDTO[]):Promise<PedidoDTO[]>{
        return this.pedidoService.crearPedidos(listPedidos)
    }

}
