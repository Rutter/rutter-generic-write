import { Stack, StackProps } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Chain, StateMachine } from "aws-cdk-lib/aws-stepfunctions";
import { LambdaInvoke } from "aws-cdk-lib/aws-stepfunctions-tasks";
import { Construct } from "constructs";

const lambdaPath = `${__dirname}/lambda`;

export class RutterGenericWriteStepStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaProps = {
      handler: "handler",
      runtime: Runtime.NODEJS_14_X,
    };

    const writeToPlatformLambda = new NodejsFunction(
      this,
      "writeToPlatformLambda",
      {
        ...lambdaProps,
        entry: `${lambdaPath}/write-to-platform.ts`,
      }
    );

    const writeToPlatform = new LambdaInvoke(this, "Write To Platform", {
      lambdaFunction: writeToPlatformLambda,
    });

    const chain = Chain.start(writeToPlatform);

    new StateMachine(this, "GenericWriteStateMachine", { definition: chain });
  }
}
