import { Injectable, NotFoundException } from '@nestjs/common';

//Decorador injectable, es decir, se puede inyectar
// aca va la logica de negocio, para que sea reutilizable
@Injectable()
export class CarsService {
    private cars = [
        {
            id: 1,
            brand: "Toyota",
            model: "Corolla"
        },
        {
            id: 2,
            brand: "Honda",
            model: "Civic"
        },
        {
            id: 3,
            brand: "Jeep",
            model: "Cherokee"
        }
    ];

    findAll() {
        return this.cars;
    }

    findById(id: number) {
        //Esta solución busca en el arreglo todos los elementos que coinciden con el criterio definido (en este caso, el id del carro).
        const car = this.cars.find(car => car.id === id)

        //Exception expresion
        if (!car) throw new NotFoundException(`Car whit id ${id} is no t found `);

        return car;
    }
}
