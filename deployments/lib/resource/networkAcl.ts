import * as cdk from '@aws-cdk/core';
import { CfnNetworkAcl, CfnNetworkAclEntry, CfnSubnetNetworkAclAssociation, CfnVPC, CfnSubnet } from '@aws-cdk/aws-ec2';
import { createResourceName } from '../util'

interface AssociationInfo {
    readonly id: string;
    readonly subnetId: () => string;
}

interface ResourceInfo {
    readonly id: string;
    readonly resourceName: string;
    readonly entryIdInbound: string;
    readonly entryIdOutbound: string;
    readonly associations: AssociationInfo[];
    readonly assign: (networkAcl: CfnNetworkAcl) => void;
}

export class NetworkAcl {
    public public: CfnNetworkAcl;
    public app: CfnNetworkAcl;
    public db: CfnNetworkAcl;

    private readonly vpc: CfnVPC;
    private readonly subnetPublic1a: CfnSubnet;
    private readonly subnetApp1a: CfnSubnet;
    private readonly subnetDb1a: CfnSubnet;
    private readonly resources: ResourceInfo[] = [
        {
            id: 'NetworkAclPublic',
            resourceName: 'nacl-public',
            entryIdInbound: 'NetworkAclEntryInboundPublic',
            entryIdOutbound: 'NetworkAclEntryOutboundPublic',
            associations: [
                {
                    id: 'NetworkAclAssociationPublic1a',
                    subnetId: () => this.subnetPublic1a.ref
                },
            ],
            assign: networkAcl => this.public = networkAcl
        },
        {
            id: 'NetworkAclApp',
            resourceName: 'nacl-app',
            entryIdInbound: 'NetworkAclEntryInboundApp',
            entryIdOutbound: 'NetworkAclEntryOutboundApp',
            associations: [
                {
                    id: 'NetworkAclAssociationApp1a',
                    subnetId: () => this.subnetApp1a.ref
                },
            ],
            assign: networkAcl => this.app = networkAcl
        },
        {
            id: 'NetworkAclDb',
            resourceName: 'nacl-db',
            entryIdInbound: 'NetworkAclEntryInboundDb',
            entryIdOutbound: 'NetworkAclEntryOutboundDb',
            associations: [
                {
                    id: 'NetworkAclAssociationDb1a',
                    subnetId: () => this.subnetDb1a.ref
                },
            ],
            assign: networkAcl => this.db = networkAcl
        }
    ];

    constructor(
        vpc: CfnVPC,
        subnetPublic1a: CfnSubnet,
        subnetApp1a: CfnSubnet,
        subnetDb1a: CfnSubnet,
    ) {
        this.vpc = vpc;
        this.subnetPublic1a = subnetPublic1a;
        this.subnetApp1a = subnetApp1a;
        this.subnetDb1a = subnetDb1a;
    }

    public createResources(scope: cdk.Construct) {
        for (const resourceInfo of this.resources) {
            const networkAcl = this.createNetworkAcl(scope, resourceInfo);
            resourceInfo.assign(networkAcl);
        }
    }

    private createNetworkAcl(scope: cdk.Construct, resourceInfo: ResourceInfo): CfnNetworkAcl {
        const networkAcl = new CfnNetworkAcl(scope, resourceInfo.id, {
            vpcId: this.vpc.ref,
            tags: [{
                key: 'Name',
                value: createResourceName(scope, resourceInfo.resourceName)
            }]
        });

        this.createEntry(scope, resourceInfo.entryIdInbound, networkAcl, false);
        this.createEntry(scope, resourceInfo.entryIdOutbound, networkAcl, true);

        for (const associationInfo of resourceInfo.associations) {
            this.createAssociation(scope, associationInfo, networkAcl);
        }

        return networkAcl;
    }

    private createEntry(scope: cdk.Construct, id: string, networkAcl: CfnNetworkAcl, egress: boolean) {
        new CfnNetworkAclEntry(scope, id, {
            networkAclId: networkAcl.ref,
            protocol: -1,
            ruleAction: 'allow',
            ruleNumber: 100,
            cidrBlock: '0.0.0.0/0',
			egress: egress,
        });
    }

    private createAssociation(scope: cdk.Construct, associationInfo: AssociationInfo, networkAcl: CfnNetworkAcl) {
        new CfnSubnetNetworkAclAssociation(scope, associationInfo.id, {
            networkAclId: networkAcl.ref,
            subnetId: associationInfo.subnetId()
        });
    }
}
