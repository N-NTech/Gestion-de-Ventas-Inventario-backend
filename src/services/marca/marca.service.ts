import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarcaDTO } from 'src/dtos/marca.dto';
import { Marca } from 'src/entities/marca.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MarcaService {

    constructor(@InjectRepository(Marca) private readonly marcaRepository:Repository<Marca>){}
    
    async obtenerMarcas():Promise<MarcaDTO[]>{
        const marcas: MarcaDTO[] | []= await this.marcaRepository.find()
        
        return marcas
    }


    async obtenerMarca(marcaId:number):Promise<MarcaDTO>{
        const marcaExistente: MarcaDTO | null = await this.marcaRepository.findOne({where:{id:marcaId}})
        
        if(!marcaExistente){
            throw new BadRequestException(`La marca con id ${marcaId} no existe`)
        }
        
        return marcaExistente
    }


    async crearMarca(marca:MarcaDTO):Promise<MarcaDTO>{
        const nuevaMarca = await this.marcaRepository.save(marca)
        
        return nuevaMarca
        
    }

}
