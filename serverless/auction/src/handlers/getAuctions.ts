import {
  APIGatewayProxyHandler,
} from "aws-lambda";
import "source-map-support/register";
import { DynamoDB } from "aws-sdk";
import commonMiddleware from "../lib/commonMiddleware";
import createError from "http-errors";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const dynamodb = new DynamoDB.DocumentClient();

const getAuctions: APIGatewayProxyHandler = async (_event, _context) => {
  let auctions

  const params: DocumentClient.QueryInput = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    IndexName: "statusAndEndDate",
    KeyConditionExpression: "#status = :status",
    ExpressionAttributeValues: {
      ":status": "OPEN",
    },
    ExpressionAttributeNames: {
      "#status": "status",
    },
  };

  try {
    const result = await dynamodb.query(params).promise()
    auctions = result.Items
  } catch (error) {
    console.error(error)
    throw new createError.InternalServerError(error)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(auctions),
  };
};

export const handler = commonMiddleware(getAuctions)
