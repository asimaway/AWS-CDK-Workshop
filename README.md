# CDK JavaScript project!

Project demonstrates a CDK app with an instance of a stack (`CdkWorkshopStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## Skills Leanred in Workshop

* Create a new CDK project in TypeScript using cdk init
* Add resources to your CDK application stack
* Use cdk diff and cdk deploy to deploy your app to an AWS environment
* Author and use your own custom construct (HitCounter)
* Consume a construct from another npm module (cdk-dynamo-table-viewer)
* Use the AWS Lambda, API Gateway and DynamoDB AWS construct libraries

## End Result

![Result](https://user-images.githubusercontent.com/47226768/115934182-5b590400-a488-11eb-8555-8619998c3db0.PNG)
