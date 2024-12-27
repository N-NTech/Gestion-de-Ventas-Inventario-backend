import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModeloDTO } from 'src/dtos/modelo.dto';
import { Modelo } from 'src/entities/modelo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModeloService {

    constructor(@InjectRepository(Modelo) private readonly modeloRepository:Repository<Modelo>){}

    async obtenerModelos():Promise<ModeloDTO[]>{
        const modelos: ModeloDTO[] = await this.modeloRepository.find({relations:['marca','productos']})
        
        return modelos
    }


    async obtenerModelo(modeloId:number):Promise<ModeloDTO>{
        const modeloExistente: ModeloDTO | null = await this.modeloRepository.findOne({where:{id:modeloId},relations:['marca']})
        
        if(!modeloExistente){
            throw new BadRequestException(`El modelo con id ${modeloId} no existe`)
        }
        
        return modeloExistente
    }


    async crearModelo(modelo:ModeloDTO):Promise<ModeloDTO>{

        const modeloExistente: ModeloDTO | null = await this.modeloRepository.findOne({where:{nombre:modelo.nombre,variante:modelo.variante,marca:modelo.marca}})

    
        if(modeloExistente){
            throw new BadRequestException('El modelo ya existe');
        } 

        const nuevoModelo = await this.modeloRepository.save(modelo)
        
        return nuevoModelo        
    }



}
