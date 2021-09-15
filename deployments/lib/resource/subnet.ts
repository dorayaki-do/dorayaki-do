import * as cdk from '@aws-cdk/core';
import { CfnSubnet, CfnVPC } from '@aws-cdk/aws-ec2';
import { createResourceName } from '../util';

export class Subnet {
  public public1a: CfnSubnet;
  public app1a: CfnSubnet;
  public db1a: CfnSubnet;

  private readonly vpc: CfnVPC;

  constructor(vpc: CfnVPC) {
    this.vpc = vpc;
  }

  public createResources(scope: cdk.Construct) {
    const systemName = scope.node.tryGetContext('systemName');
    const envType = scope.node.tryGetContext('envType');

    this.public1a = new CfnSubnet(scope, 'SubnetPublic1a', {
      cidrBlock: '10.0.10.0/24',
      vpcId: this.vpc.ref,
      availabilityZone: 'ap-northeast-1a',
      tags: [
        { key: 'Name', value: createResourceName(scope, 'subnet-public-1a') },
      ],
    });
    this.app1a = new CfnSubnet(scope, 'SubnetApp1a', {
      cidrBlock: '10.0.20.0/24',
      vpcId: this.vpc.ref,
      availabilityZone: 'ap-northeast-1a',
      tags: [
        { key: 'Name', value: createResourceName(scope, 'subnet-app-1a') },
      ],
    });
    this.db1a = new CfnSubnet(scope, 'SubnetDb1a', {
      cidrBlock: '10.0.30.0/24',
      vpcId: this.vpc.ref,
      availabilityZone: 'ap-northeast-1a',
      tags: [{ key: 'Name', value: createResourceName(scope, 'subnet-db-1a') }],
    });
  }
}
