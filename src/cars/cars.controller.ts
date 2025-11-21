/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  //inyeccion de dependencias del servicio creado
  constructor(
    private readonly carsService: CarsService
  ) { }


  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number) {
    console.log({ id })
    return this.carsService.findById(id);
    /*   getCarById(@Param('id') id: string) {
     //convertir el id que se pasa como parametro a number, se agrega el +
     return this.carsService.findById(+id);*/
  }

  @Post()
  createCar(@Body() body: any) {
    return { body }
  }

  @Patch(":id")
  updateCar(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: any )
  {
    return body;
  }

  @Delete(':id')
  deleteCar(@Param("id", ParseIntPipe ) id: number ) {
    return { 
      method: "delete",
      id
     }
  }
}
