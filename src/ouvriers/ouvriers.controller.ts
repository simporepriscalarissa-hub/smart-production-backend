import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { OuvriersService } from './ouvriers.service';
import { CreateOuvrierDto } from './dto/create-ouvrier.dto';
import { UpdateOuvrierDto } from './dto/update-ouvrier.dto';

@Controller('ouvriers')
export class OuvriersController {
  constructor(private readonly ouvriersService: OuvriersService) {}

  @Post()
  create(@Body() createOuvrierDto: CreateOuvrierDto) {
    return this.ouvriersService.create(createOuvrierDto);
  }

  @Get()
  findAll(@Query('departement') departement?: string) {
    return this.ouvriersService.findAll(departement);
  }

  @Get('rfid/:rfid')
  findByRfid(@Param('rfid') rfid: string) {
    return this.ouvriersService.findByRfid(rfid);
  }

  // Nouvelle route — scanne badge RFID → marque présence
  @Post('presence/:rfid')
  marquerPresence(@Param('rfid') rfid: string) {
    return this.ouvriersService.marquerPresence(rfid);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ouvriersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOuvrierDto: UpdateOuvrierDto) {
    return this.ouvriersService.update(+id, updateOuvrierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ouvriersService.remove(+id);
  }
}
