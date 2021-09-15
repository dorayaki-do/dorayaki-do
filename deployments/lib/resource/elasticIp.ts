import * as cdk from '@aws-cdk/core';
import { CfnEIP } from '@aws-cdk/aws-ec2';
import { createResourceName } from '../util';

export class ElasticIp {
  public ngw1a: CfnEIP;

  constructor() {}

  public createResources(scope: cdk.Construct) {
    this.ngw1a = new CfnEIP(scope, 'ElasticIpNgw1a', {
      domain: 'vpc',
      tags: [{ key: 'Name', value: createResourceName(scope, 'eip-ngw-1a') }],
    });
  }
}
