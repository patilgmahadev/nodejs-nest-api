import { ApiModelProperty } from '@nestjs/swagger';

export class createKeyReq {
  @ApiModelProperty()
  readonly description: string;
}

export class createKeyParam {

  @ApiModelProperty()
  readonly project_id: string;
}

export class deleteKeyParam {
  @ApiModelProperty()
  readonly key_id: string;
}

export class getOneKeyParam {
  @ApiModelProperty()
  readonly key_id: string;
}

export class editKeyBody {
  @ApiModelProperty()
  readonly key: string;
  @ApiModelProperty()
  readonly description: string;
  @ApiModelProperty()
  readonly active: boolean;
}

export class editKeyParam {
  @ApiModelProperty()
  readonly key_id: string;
}
