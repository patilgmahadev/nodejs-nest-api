import { ApiModelProperty } from '@nestjs/swagger';

export class loginBody {
  @ApiModelProperty()
  readonly username: string;
  @ApiModelProperty()
  readonly password: string;
}

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
	readonly isActive: boolean
}

export class resetParam {
  @ApiModelProperty()
  readonly email: string;
  @ApiModelProperty()
  readonly token: string;
}

export class resetBody {
  @ApiModelProperty()
  readonly password: string;
}

export class forgotBody {
  @ApiModelProperty()
  readonly username: string;
}
