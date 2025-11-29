/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
//se puede aplicar validacion a nivel controlador
//@UsePipes(ValidationPipe)
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
  getCarById(@Param('id', new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.carsService.findById(id);
  }
  // Ver el parseIntPipe se utiliza para validar que sea un tipo number
  /* getCarById(@Param('id', ParseIntPipe) id: number) {
    console.log({ id })
    return this.carsService.findById(id);
       //getCarById(@Param('id') id: string) {
     //convertir el id que se pasa como parametro a number, se agrega el +
     //return this.carsService.findById(+id);
  } */

  @Post()
  //se puede aplicar validacion a nivel metodo
  //@UsePipes(ValidationPipe)
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto)
  }

  @Patch(":id")
  updateCar(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  deleteCar(
    @Param("id", ParseUUIDPipe) id: string) {
    return this.carsService.delete(id)
  }
}
