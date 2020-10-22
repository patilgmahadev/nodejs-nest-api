import { ApiModelProperty } from '@nestjs/swagger';

export class registerBody {
  @ApiModelProperty()
  readonly username: string;
  @ApiModelProperty()
  readonly email: string;
  @ApiModelProperty()
  readonly admin: boolean;
  @ApiModelProperty()
	readonly password: string;
	@ApiModelProperty()
	readonly isActive: boolean;
	
}

export class deleteUserParam {
  @ApiModelProperty()
  readonly user_id: string;
}


export class getOneUserParam {
  @ApiModelProperty()
  readonly user_id: string;
}

export class editUserBody {
  @ApiModelProperty()
  readonly username: string;

  @ApiModelProperty()
  readonly password: string;

  @ApiModelProperty()
  readonly admin: boolean;
}

export class editUserParam {
  @ApiModelProperty()
  readonly user_id: string;
}