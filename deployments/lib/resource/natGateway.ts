import * as cdk from '@aws-cdk/core';
import { CfnNatGateway, CfnSubnet, CfnEIP } from '@aws-cdk/aws-ec2';
import { createResourceName } from '../util';

export class NatGateway {
  public ngw1a: CfnNatGateway;

  private readonly subnetPublic1a: CfnSubnet;
  private readonly elasticIpNgw1a: CfnEIP;

  constructor(subnetPublic1a: CfnSubnet, elasticIpNgw1a: CfnEIP) {
    this.subnetPublic1a = subnetPublic1a;
    this.elasticIpNgw1a = elasticIpNgw1a;
  }

  public createResources(scope: cdk.Construct) {
    this.ngw1a = new CfnNatGateway(scope, 'NatGateway1a', {
      allocationId: this.elasticIpNgw1a.attrAllocationId,
      subnetId: this.subnetPublic1a.ref,
      tags: [{ key: 'Name', value: createResourceName(scope, 'ngw-1a') }],
    });
  }
}
