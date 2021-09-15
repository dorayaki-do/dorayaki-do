import * as cdk from '@aws-cdk/core';
import {
  CfnRouteTable,
  CfnRoute,
  CfnSubnetRouteTableAssociation,
  CfnVPC,
  CfnSubnet,
  CfnInternetGateway,
  CfnNatGateway,
} from '@aws-cdk/aws-ec2';
import { createResourceName } from '../util';

interface RouteInfo {
  readonly id: string;
  readonly destinationCidrBlock: string;
  readonly gatewayId?: () => string;
  readonly natGatewayId?: () => string;
}

interface AssociationInfo {
  readonly id: string;
  readonly subnetId: () => string;
}

interface ResourceInfo {
  readonly id: string;
  readonly resourceName: string;
  readonly routes: RouteInfo[];
  readonly associations: AssociationInfo[];
  readonly assign: (routeTable: CfnRouteTable) => void;
}

export class RouteTable {
  public public: CfnRouteTable;
  public app1a: CfnRouteTable;
  public db: CfnRouteTable;

  private readonly vpc: CfnVPC;
  private readonly subnetPublic1a: CfnSubnet;
  private readonly subnetApp1a: CfnSubnet;
  private readonly subnetDb1a: CfnSubnet;
  private readonly internetGateway: CfnInternetGateway;
  private readonly natGateway1a: CfnNatGateway;
  private readonly resources: ResourceInfo[] = [
    {
      id: 'RouteTablePublic',
      resourceName: 'rtb-public',
      routes: [
        {
          id: 'RoutePublic',
          destinationCidrBlock: '0.0.0.0/0',
          gatewayId: () => this.internetGateway.ref,
        },
      ],
      associations: [
        {
          id: 'AssociationPublic1a',
          subnetId: () => this.subnetPublic1a.ref,
        },
      ],
      assign: (routeTable) => (this.public = routeTable),
    },
    {
      id: 'RouteTableApp1a',
      resourceName: 'rtb-app-1a',
      routes: [
        {
          id: 'RouteApp1a',
          destinationCidrBlock: '0.0.0.0/0',
          natGatewayId: () => this.natGateway1a.ref,
        },
      ],
      associations: [
        {
          id: 'AssociationApp1a',
          subnetId: () => this.subnetApp1a.ref,
        },
      ],
      assign: (routeTable) => (this.app1a = routeTable),
    },
    {
      id: 'RouteTableDb',
      resourceName: 'rtb-db',
      routes: [],
      associations: [
        {
          id: 'AssociationDb1a',
          subnetId: () => this.subnetDb1a.ref,
        },
      ],
      assign: (routeTable) => (this.db = routeTable),
    },
  ];

  constructor(
    vpc: CfnVPC,
    subnetPublic1a: CfnSubnet,
    subnetApp1a: CfnSubnet,
    subnetDb1a: CfnSubnet,
    internetGateway: CfnInternetGateway,
    natGateway: CfnNatGateway,
  ) {
    this.vpc = vpc;
    this.subnetPublic1a = subnetPublic1a;
    this.subnetApp1a = subnetApp1a;
    this.subnetDb1a = subnetDb1a;
    this.internetGateway = internetGateway;
    this.natGateway1a = natGateway;
  }

  public createResources(scope: cdk.Construct) {
    for (const resourceInfo of this.resources) {
      const routeTable = this.createRouteTable(scope, resourceInfo);
      resourceInfo.assign(routeTable);
    }
  }

  private createRouteTable(
    scope: cdk.Construct,
    resourceInfo: ResourceInfo,
  ): CfnRouteTable {
    const routeTable = new CfnRouteTable(scope, resourceInfo.id, {
      vpcId: this.vpc.ref,
      tags: [
        {
          key: 'Name',
          value: createResourceName(scope, resourceInfo.resourceName),
        },
      ],
    });

    for (const routeInfo of resourceInfo.routes) {
      this.createRoute(scope, routeInfo, routeTable);
    }

    for (const associationInfo of resourceInfo.associations) {
      this.createAssociation(scope, associationInfo, routeTable);
    }

    return routeTable;
  }

  private createRoute(
    scope: cdk.Construct,
    routeInfo: RouteInfo,
    routeTable: CfnRouteTable,
  ) {
    const route = new CfnRoute(scope, routeInfo.id, {
      routeTableId: routeTable.ref,
      destinationCidrBlock: routeInfo.destinationCidrBlock,
    });

    if (routeInfo.gatewayId) {
      route.gatewayId = routeInfo.gatewayId();
    } else if (routeInfo.natGatewayId) {
      route.natGatewayId = routeInfo.natGatewayId();
    }
  }

  private createAssociation(
    scope: cdk.Construct,
    associationInfo: AssociationInfo,
    routeTable: CfnRouteTable,
  ) {
    new CfnSubnetRouteTableAssociation(scope, associationInfo.id, {
      routeTableId: routeTable.ref,
      subnetId: associationInfo.subnetId(),
    });
  }
}
