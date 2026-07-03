import json
import boto3

# Create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
# Use the DynamoDB object to select our table
table = dynamodb.Table('employeeData')

# Define the handler function that the Lambda service will use as an entry point
def lambda_handler(event, context):
    # Extract values from the event object we got from the Lambda service and store in variables
    employeeid = event['employeeid']
    name = event['name']
    department = event['department']
    salary = event['salary']
    
    # Write Employee data to the DynamoDB table and save the response in a variable
    response = table.put_item(
        Item={
            'employeeid': employeeid,
            'name': name,
            'department': department,
            'salary': salary
        }
    )
    
    # Return a properly formatted JSON object
    return {
        'statusCode': 200,
        'body': json.dumps('Employee data saved successfully!')
    }