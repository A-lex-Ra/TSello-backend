
import { IsBoolean, IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty() @IsString() @MinLength(1) title: string;
  @ApiProperty() @IsString() description: string;
  @ApiPropertyOptional() @IsInt() @IsOptional() order?: number;
  @ApiPropertyOptional() @IsBoolean() @IsOptional() checked?: boolean;
}
