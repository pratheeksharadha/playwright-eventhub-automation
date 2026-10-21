
import test from "@playwright/test";
import { getTestData } from "../../src/test-Data/excelReader.ts";  //src\test-Data\excelReader.ts


test('Check Excel data', async ({}) => {
    const data = await getTestData("qa", "EventHub application authenticated user logs successfully");
  console.log(data)  
});