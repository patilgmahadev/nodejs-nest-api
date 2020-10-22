import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class Api {
  @ApiModelPropertyOptional()
  api_key: string;
}

export class QueryParams {
  @ApiModelPropertyOptional()
  limit: number;
  @ApiModelPropertyOptional()
  sort: string;
  @ApiModelPropertyOptional()
  skip: number;
}
