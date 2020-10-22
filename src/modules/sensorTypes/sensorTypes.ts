import { ApiModelProperty } from '@nestjs/swagger';

export class CreateSensorTypeBody {
  @ApiModelProperty()
  readonly paramName: string;

  @ApiModelProperty()
  readonly paramCode: string;

  @ApiModelProperty()
  readonly idParam: number;
}

export class UpdateSensorTypeBody {
  @ApiModelProperty()
  readonly paramName: string;

  @ApiModelProperty()
  readonly paramCode: string;

  @ApiModelProperty()
  readonly idParam: number;
}

export class UpdateSensorTypeParam {
  @ApiModelProperty()
  readonly sensorTypeId: string;
}

export class DeleteSensorTypeParam {
  @ApiModelProperty()
  readonly sensorTypeId: string;
}

export class GetOneSensorTypeParam {
  @ApiModelProperty()
  readonly sensorTypeId: string;
}
