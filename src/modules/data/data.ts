import { ApiModelProperty } from '@nestjs/swagger';

export class CreateDataBody {

  @ApiModelProperty()
  readonly value: number;

  @ApiModelProperty()
  readonly date: Date;

  @ApiModelProperty()
  readonly type: string;

  @ApiModelProperty()
  readonly station: string;
}

export class UpdateDataBody {
  @ApiModelProperty()
  readonly value: number;

  @ApiModelProperty()
  readonly date: Date;

  @ApiModelProperty()
  readonly type: string;

  @ApiModelProperty()
  readonly station: string;
}

export class UpdateDataParam {
  @ApiModelProperty()
  readonly dataId: string;
}

export class DeleteDataParam {
  @ApiModelProperty()
  readonly dataId: string;
}

export class GetOneDataParam {
  @ApiModelProperty()
  readonly dataId: string;
}
