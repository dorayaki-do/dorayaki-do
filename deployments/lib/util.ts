import * as cdk from '@aws-cdk/core';

export const createResourceName = (
  scope: cdk.Construct,
  name: string,
): string => {
  const systemName = scope.node.tryGetContext('systemName');
  const envType = scope.node.tryGetContext('envType');

  return `${systemName}-${envType}-${name}`;
};
