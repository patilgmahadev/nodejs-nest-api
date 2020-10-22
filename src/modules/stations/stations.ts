import { ApiModelProperty } from '@nestjs/swagger';
import { Location } from './stations.interface';

export class CreateStationBody {
  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly address: string;

  @ApiModelProperty()
  readonly city: string;

  @ApiModelProperty()
  readonly province: string;

  @ApiModelProperty()
  readonly coordinates: Location;

  @ApiModelProperty()
  readonly source: number;

  @ApiModelProperty()
  readonly externalId: number;

  @ApiModelProperty()
  readonly active: boolean;
}

export class UpdateStationBody {
  @ApiModelProperty()
  readonly name: string;

  @ApiModelProperty()
  readonly address: string;

  @ApiModelProperty()
  readonly city: string;

  @ApiModelProperty()
  readonly province: string;

  @ApiModelProperty()
  readonly coordinates: Location;

  @ApiModelProperty()
  readonly source: number;

  @ApiModelProperty()
  readonly externalId: number;

  @ApiModelProperty()
  readonly active: boolean;
}

export class UpdateStationParam {
  @ApiModelProperty()
  readonly stationId: string;
}

export class DeleteStationParam {
  @ApiModelProperty()
  readonly stationId: string;
}

export class GetOneStationParam {
  @ApiModelProperty()
  readonly stationId: string;
}
