import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './db.config';
import { PedidoService } from './services/pedido/pedido.service';
import * as dotenv from 'dotenv'
import { Pedido } from './entities/pedido.entity';
import { PedidoController } from './controllers/pedido/pedido.controller';
import { Producto } from './entities/producto.entity';
import { Cliente } from './entities/cliente.entity';
import { Modelo } from './entities/modelo.entity';
import { Marca } from './entities/marca.entity';
import { Balance } from './entities/balance.entity';
import { ProductoService } from './services/producto/producto.service';
import { ProductoController } from './controllers/producto/producto.controller';

dotenv.config()

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    TypeOrmModule.forFeature([Balance,Marca,Modelo,Cliente,Producto,Pedido])
  ],
  controllers: [AppController, PedidoController, ProductoController],
  providers: [AppService, PedidoService, ProductoService],
})
export class AppModule {}
