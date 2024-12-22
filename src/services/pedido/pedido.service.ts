import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { stringify } from 'querystring';
import { PedidoDTO } from 'src/dtos/pedido.dto';
import { Pedido } from 'src/entities/pedido.entity';
import { Producto } from 'src/entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PedidoService {

    constructor(
        @InjectRepository(Pedido) private readonly pedidoRepository:Repository<Pedido>,
        @InjectRepository(Producto) private readonly productoRepository:Repository<Producto>
    ){}



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

    public async crearPedido(pedido: PedidoDTO): Promise<PedidoDTO> {
        let newPedido: PedidoDTO;
        
        Logger.log('Creando pedido: ' + JSON.stringify(pedido));
    
        try {
            for (const producto of pedido.productos) { // No usar el .foreach porque no se puede usar async/await
                Logger.log('Buscando producto: ' + producto.id);
                try {
                    await this.productoRepository.findOneOrFail({ where: { id: producto.id } });
                    Logger.log('Producto encontrado: ' + producto.id);
                } catch (error) {
                    Logger.error('Error al buscar producto con id ' + producto.id + ': ' + error.message);
                    throw new BadRequestException(`Producto con id ${producto.id} no encontrado.`);
                }
            }
    
            newPedido = await this.pedidoRepository.save(pedido);
            Logger.log('Pedido creado con éxito: ' + JSON.stringify(newPedido));
    
        } catch (error) {
            Logger.error('Error al crear el pedido: ' + error.message);
            throw new BadRequestException('Error al crear el pedido', error.message);
        }
        
        return newPedido;
    }


    public async crearPedidos(listPedidos: PedidoDTO[]): Promise<PedidoDTO[]> {

        const pedidosPersistidos = await this.pedidoRepository.save(listPedidos);

        Logger.warn('Pedidos creados: '+JSON.stringify(pedidosPersistidos))

        return pedidosPersistidos;
    }




}
