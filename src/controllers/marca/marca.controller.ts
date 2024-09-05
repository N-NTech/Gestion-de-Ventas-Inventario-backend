import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MarcaDTO } from 'src/dtos/marca.dto';
import { MarcaService } from 'src/services/marca/marca.service';

@Controller('marca')
export class MarcaController {

    constructor(private readonly marcaService:MarcaService){}

    @Get()
    obtenerMarcas():Promise<MarcaDTO[]>{
        return this.marcaService.obtenerMarcas()
    }

    @Get('id')
    obtenerMarca(@Param('id') marcaId:number ):Promise<MarcaDTO>{
        return this.marcaService.obtenerMarca(marcaId)
    }

    @Post()
    crearMarca(@Body() marca:MarcaDTO):Promise<MarcaDTO>{
        return this.marcaService.crearMarca(marca)
    }



}
