"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkWorkshopStack = void 0;
const cdk = require("@aws-cdk/core"); //@aws-cdk let you access its extensive library of constructs(which r divided into modules)
const lambda = require("@aws-cdk/aws-lambda"); // aws-lambda contains modules to work in aws-cdk
const apigw = require("@aws-cdk/aws-apigateway"); //import the apigateway
const hitcounter_1 = require("./hitcounter");
const cdk_dynamo_table_viewer_1 = require("cdk-dynamo-table-viewer");
class CdkWorkshopStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props); // (scope , id and props) signutures are constructs (basic building blocks of CDK apps)
        //defines an AWS Lambda resource
        const hello = new lambda.Function(this, 'HelloHandler', {
            runtime: lambda.Runtime.NODEJS_10_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'hello.handler' // "hello" is name of JS file , exported function is "handler" in the JS file
        });
        const helloWithCounter = new hitcounter_1.HitCounter(this, 'HelloHitCounter', {
            downstream: hello
        });
        // defines an API Gateway REST API resources backed by our "hello" function (added 12 resources to our stack)
        new apigw.LambdaRestApi(this, 'Endpoint', {
            //proxies all request to the lambda function 
            handler: helloWithCounter.handler
        });
        new cdk_dynamo_table_viewer_1.TableViewer(this, 'ViewHitCounter', {
            title: 'Hello Hits',
            table: helloWithCounter.table //needs a table property
        });
    }
}
exports.CdkWorkshopStack = CdkWorkshopStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXdvcmtzaG9wLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXdvcmtzaG9wLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQyxDQUFDLDJGQUEyRjtBQUVqSSw4Q0FBOEMsQ0FBQyxpREFBaUQ7QUFFaEcsaURBQWlELENBQUMsdUJBQXVCO0FBRXpFLDZDQUEwQztBQUUxQyxxRUFBc0Q7QUFFdEQsTUFBYSxnQkFBaUIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUM3QyxZQUFZLEtBQWMsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDNUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyx1RkFBdUY7UUFFakgsZ0NBQWdDO1FBQ2hDLE1BQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ3RELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxPQUFPLEVBQUUsZUFBZSxDQUFjLDZFQUE2RTtTQUVwSCxDQUFDLENBQUM7UUFFSCxNQUFNLGdCQUFnQixHQUFHLElBQUksdUJBQVUsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDL0QsVUFBVSxFQUFFLEtBQUs7U0FDbEIsQ0FBQyxDQUFBO1FBRUYsNkdBQTZHO1FBQzdHLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ3hDLDZDQUE2QztZQUM3QyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsT0FBTztTQUVsQyxDQUFDLENBQUM7UUFFSCxJQUFJLHFDQUFXLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ3ZDLEtBQUssRUFBRSxZQUFZO1lBQ25CLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUEsd0JBQXdCO1NBQ3RELENBQUMsQ0FBQztJQUVILENBQUM7Q0FDRjtBQTdCRCw0Q0E2QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7IC8vQGF3cy1jZGsgbGV0IHlvdSBhY2Nlc3MgaXRzIGV4dGVuc2l2ZSBsaWJyYXJ5IG9mIGNvbnN0cnVjdHMod2hpY2ggciBkaXZpZGVkIGludG8gbW9kdWxlcylcblxuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnOyAvLyBhd3MtbGFtYmRhIGNvbnRhaW5zIG1vZHVsZXMgdG8gd29yayBpbiBhd3MtY2RrXG5cbmltcG9ydCAqIGFzIGFwaWd3IGZyb20gJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5JzsgLy9pbXBvcnQgdGhlIGFwaWdhdGV3YXlcblxuaW1wb3J0IHsgSGl0Q291bnRlciB9IGZyb20gJy4vaGl0Y291bnRlcic7XG5cbmltcG9ydCB7IFRhYmxlVmlld2VyIH0gZnJvbSAnY2RrLWR5bmFtby10YWJsZS12aWV3ZXInO1xuXG5leHBvcnQgY2xhc3MgQ2RrV29ya3Nob3BTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQXBwLCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7IC8vIChzY29wZSAsIGlkIGFuZCBwcm9wcykgc2lnbnV0dXJlcyBhcmUgY29uc3RydWN0cyAoYmFzaWMgYnVpbGRpbmcgYmxvY2tzIG9mIENESyBhcHBzKVxuXG4gICAvL2RlZmluZXMgYW4gQVdTIExhbWJkYSByZXNvdXJjZVxuICAgY29uc3QgaGVsbG8gPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdIZWxsb0hhbmRsZXInLCB7XG4gICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xMF9YLCAgICAvLyBleGVjdXRpb24gZW52aXJvbm1lbnRcbiAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKSwgLy8gY29kZSBsb2FkZWQgZnJvbSBcImxhbWJkYVwiIGRpcmVjdG9yeShzbyBsYW1iZGEgZm9sZGVyKVxuICAgICBoYW5kbGVyOiAnaGVsbG8uaGFuZGxlcicgICAgICAgICAgICAgIC8vIFwiaGVsbG9cIiBpcyBuYW1lIG9mIEpTIGZpbGUgLCBleHBvcnRlZCBmdW5jdGlvbiBpcyBcImhhbmRsZXJcIiBpbiB0aGUgSlMgZmlsZVxuXG4gICB9KTtcblxuICAgY29uc3QgaGVsbG9XaXRoQ291bnRlciA9IG5ldyBIaXRDb3VudGVyKHRoaXMsICdIZWxsb0hpdENvdW50ZXInLCB7XG4gICAgIGRvd25zdHJlYW06IGhlbGxvXG4gICB9KVxuXG4gICAvLyBkZWZpbmVzIGFuIEFQSSBHYXRld2F5IFJFU1QgQVBJIHJlc291cmNlcyBiYWNrZWQgYnkgb3VyIFwiaGVsbG9cIiBmdW5jdGlvbiAoYWRkZWQgMTIgcmVzb3VyY2VzIHRvIG91ciBzdGFjaylcbiAgIG5ldyBhcGlndy5MYW1iZGFSZXN0QXBpKHRoaXMsICdFbmRwb2ludCcsIHtcbiAgICAgLy9wcm94aWVzIGFsbCByZXF1ZXN0IHRvIHRoZSBsYW1iZGEgZnVuY3Rpb24gXG4gICAgIGhhbmRsZXI6IGhlbGxvV2l0aENvdW50ZXIuaGFuZGxlclxuXG4gICB9KTtcblxuICAgbmV3IFRhYmxlVmlld2VyKHRoaXMsICdWaWV3SGl0Q291bnRlcicsIHtcbiAgICB0aXRsZTogJ0hlbGxvIEhpdHMnLFxuICAgIHRhYmxlOiBoZWxsb1dpdGhDb3VudGVyLnRhYmxlLy9uZWVkcyBhIHRhYmxlIHByb3BlcnR5XG4gIH0pO1xuXG4gIH1cbn1cblxuIl19