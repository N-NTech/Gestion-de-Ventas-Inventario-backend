import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from 'src/entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductoService {

    constructor(@InjectRepository(Producto) private readonly productoRepository:Repository<Producto>){}


    //Podemos probar crear un pedido, capaz el cascade crea todo
    // no tengo esa info 
    //Ponele cascade true a todo lo
    // voy a ver el pastel de papa
    // hay olor a quemado
    //oka
    
}
