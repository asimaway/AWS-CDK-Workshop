import * as cdk from '@aws-cdk/core'; //@aws-cdk let you access its extensive library of constructs(which r divided into modules)

import * as lambda from '@aws-cdk/aws-lambda'; // aws-lambda contains modules to work in aws-cdk

import * as apigw from '@aws-cdk/aws-apigateway'; //import the apigateway

import { HitCounter } from './hitcounter';

import { TableViewer } from 'cdk-dynamo-table-viewer';

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props); // (scope , id and props) signutures are constructs (basic building blocks of CDK apps)

   //defines an AWS Lambda resource
   const hello = new lambda.Function(this, 'HelloHandler', {
     runtime: lambda.Runtime.NODEJS_10_X,    // execution environment
     code: lambda.Code.fromAsset('lambda'), // code loaded from "lambda" directory(so lambda folder)
     handler: 'hello.handler'              // "hello" is name of JS file , exported function is "handler" in the JS file

   });

   const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
     downstream: hello
   })

   // defines an API Gateway REST API resources backed by our "hello" function (added 12 resources to our stack)
   new apigw.LambdaRestApi(this, 'Endpoint', {
     //proxies all request to the lambda function 
     handler: helloWithCounter.handler

   });

   new TableViewer(this, 'ViewHitCounter', {
    title: 'Hello Hits',
    table: helloWithCounter.table//needs a table property
  });

  }
}

