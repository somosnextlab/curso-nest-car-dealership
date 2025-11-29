import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from "uuid";
import { CreateCarDto, UpdateCarDto } from './dto';

//Decorador injectable, es decir, se puede inyectar
// aca va la logica de negocio, para que sea reutilizable
@Injectable()
export class CarsService {
    private cars: Car[] = [
        {
            id: uuid(),
            brand: "Toyota",
            model: "Corolla"
        },
        {
            id: uuid(),
            brand: "Honda",
            model: "Civic"
        },
        {
            id: uuid(),
            brand: "Jeep",
            model: "Cherokee"
        }
    ];

    findAll() {
        return this.cars;
    }

    findById(id: string) {
        //Esta solución busca en el arreglo todos los elementos que coinciden con el criterio definido (en este caso, el id del carro).
        const car = this.cars.find(car => car.id === id)

        //Exception expresion
        if (!car) throw new NotFoundException(`Car whit id ${id} is no t found `);

        return car;
    }

    create(createCarDto: CreateCarDto) {
        const newCar: Car = {
            id: uuid(),
            //usamos spread operator
            ...createCarDto
            // o tambien utilizar esta manera de declarar
            /* brand: createCarDto.brand,
            model: createCarDto.model */
        };
        this.cars.push(newCar);
        return newCar;
    }

    update(id: string, updateCarDto: UpdateCarDto) {
        let carDB = this.findById(id);

        // validacion para enviar un mensaje de aviso sobre el error
        if (updateCarDto.id && updateCarDto.id !== id)
            throw new BadRequestException(`Car id is not valid inside body`)

        this.cars = this.cars.map(car => {
            if (car.id === id) {
                carDB = { ...carDB, ...updateCarDto, id }
                return carDB;
            }
            return car;
        })
        return carDB;// carro actualizado
    }

    delete(id: string) {
        const car = this.findById(id);
        this.cars = this.cars.filter( car => car.id !== id);

    }
}
