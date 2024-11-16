import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv'
import { ClienteDTO } from './dtos/cliente.dto';
import { MarcaDTO } from './dtos/marca.dto';
import { ModeloDTO } from './dtos/modelo.dto';
import { PedidoDTO } from './dtos/pedido.dto';
import { Producto } from './entities/producto.entity';
import { ProductoDTO } from './dtos/producto.dto';

dotenv.config();

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }))

  const config = new DocumentBuilder()
    .setTitle('Gestion de pedidos-inventario')
    .setDescription('Documentación de la API de gestión de pedidos e inventario')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // La documentación estará disponible en "/api"

  
  await app.listen(process.env.PORT || 3000);
  console.log(`Aplicación corriendo en el puerto ${process.env.PORT || 3000}`)
}
bootstrap();
