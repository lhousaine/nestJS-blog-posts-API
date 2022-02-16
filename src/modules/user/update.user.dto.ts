import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto){
}
