import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoDTO } from 'src/dtos/pedido.dto';
import { Pedido } from 'src/entities/pedido.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PedidoService {

    constructor(@InjectRepository(Pedido) private readonly pedidoRepository:Repository<Pedido>){}



    public async obtenerPedidos(): Promise<Pedido[]>{
        
        const pedidos: Pedido[] = await this.pedidoRepository.find({relations:['cliente','productos','productos.modelo', 'productos.modelo.marca']})

        return pedidos
    }

    public async obtenerPedido(idPedido:number): Promise<Pedido>{

        const pedido:Pedido = await this.pedidoRepository.findOne({where: {id:idPedido}, relations:['cliente','productos','productos.modelo', 'productos.modelo.marca']})

        if(!pedido){
            throw new NotFoundException('Pedido no encontrado')
        }

        return pedido        
    }

    public async crearPedido(pedido:PedidoDTO): Promise<PedidoDTO>{

        const newPedido : PedidoDTO = await this.pedidoRepository.save(pedido)
        
        return newPedido
    }


    public async crearPedidos(listPedidos:PedidoDTO[]): Promise<PedidoDTO[]>{
        const pedidos: PedidoDTO[]= [];
        
        listPedidos.forEach(pedido=> {
            this.pedidoRepository.save(pedido)
            pedidos.push(pedido)
        })
        
        return pedidos
        
    }




}
