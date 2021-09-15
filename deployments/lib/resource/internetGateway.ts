import * as cdk from '@aws-cdk/core';
import {
  CfnInternetGateway,
  CfnVPCGatewayAttachment,
  CfnVPC,
} from '@aws-cdk/aws-ec2';

export class InternetGateway {
  public igw: CfnInternetGateway;

  private readonly vpc: CfnVPC;

  constructor(vpc: CfnVPC) {
    this.vpc = vpc;
  }

  public createResources(scope: cdk.Construct) {
    const systemName = scope.node.tryGetContext('systemName');
    const envType = scope.node.tryGetContext('envType');

    this.igw = new CfnInternetGateway(scope, 'InternetGateway', {
      tags: [{ key: 'Name', value: `${systemName}-${envType}-igw` }],
    });

    new CfnVPCGatewayAttachment(scope, 'VpcGatewayAttachment', {
      vpcId: this.vpc.ref,
      internetGatewayId: this.igw.ref,
    });
  }
}
