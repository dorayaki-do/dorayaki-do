#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { DeploymentsStack } from '../lib/deployments-stack';

const app = new cdk.App()
new DeploymentsStack(app, "AwsCdkEcsOnFargateSampleStack", {
  env: { region: "ap-northeast-1" }
})
