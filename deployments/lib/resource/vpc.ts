import * as cdk from '@aws-cdk/core';
import { CfnVPC } from '@aws-cdk/aws-ec2';
import { createResourceName } from '../util';

export class Vpc {
  public vpc: CfnVPC;
  constructor() {}

  public createResources(scope: cdk.Construct) {
    const systemName = scope.node.tryGetContext('systemName');
    const envType = scope.node.tryGetContext('envType');

    this.vpc = new CfnVPC(scope, 'Vpc', {
      cidrBlock: '10.0.0.0/16',
      tags: [{ key: 'Name', value: createResourceName(scope, 'vpc') }],
    });
  }
}
