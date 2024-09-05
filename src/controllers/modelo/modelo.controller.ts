import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ModeloDTO } from 'src/dtos/modelo.dto';
import { ModeloService } from 'src/services/modelo/modelo.service';

@Controller('modelo')
export class ModeloController {

    constructor(private readonly modeloService:ModeloService){}

    @Get()
    obtenerModelos():Promise<ModeloDTO[]>{
        return this.modeloService.obtenerModelos()
    }

    @Get('id')
    obtenerModelo(@Param('id') modeloId:number ):Promise<ModeloDTO>{
        return this.modeloService.obtenerModelo(modeloId)
    }

    @Post()
    crearModelo(@Body() modelo:ModeloDTO):Promise<ModeloDTO>{
        return this.modeloService.crearModelo(modelo)
    }
    

}
