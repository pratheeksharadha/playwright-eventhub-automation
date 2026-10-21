
import ExcelJS from "exceljs";
import path from "path";

export interface LoginTestData {
  environment: string;
  testCase: string;
  email: string;
  password: string;
}

export async function getTestData(
  environment: string,
  testCase: string
): Promise<LoginTestData[]> {
  const workbook = new ExcelJS.Workbook();

  const filePath = path.resolve(process.cwd() ,"src/test-Data", "EventHub-TestData.xlsx");
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet("EventHub-TestData");

  if (!worksheet) {
    throw new Error("Worksheet EventHub-TestData was not found");
  }

  const headers = worksheet.getRow(1).values as (string | number | undefined)[];

  const columnMap  = new Map<string, number>();

  headers.forEach((header, index) => {
    if (header !== undefined) {
      columnMap.set(String(header).trim(), index);
    }
  });

  console.log("column map - > ", columnMap);

  const requiredHeaders = [
    "Environment",
    "TestCase",
    "Email",
    "Password"
  ];

  for (const header of requiredHeaders) {
    if (!columnMap.has(header)) {
      throw new Error(`Missing Excel column: ${header}`);
    }
  }

  const readCell = (row: ExcelJS.Row, column: string): string => {
    const value = row.getCell(columnMap.get(column)!).value;

    if (value === null || value === undefined) {
      return "";
    }

    if (typeof value === "object" && "text" in value) {
      return String(value.text).trim();
    }

    return String(value).trim();
  };

  const testData: LoginTestData[] = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;

    const rowEnvironment = readCell(row, "Environment");
    console.log("rowEnvironment -> ", rowEnvironment);
    console.log("environment -> ", environment);
    const rowTestCase = readCell(row, "TestCase");
    console.log("rowTestCase -> ", rowTestCase);
    console.log("testCase -> ", testCase);

    if (rowEnvironment.toLowerCase() === environment.toLowerCase() &&
      rowTestCase.toLowerCase() === testCase.toLowerCase()) {
      testData.push({
      environment: rowEnvironment,
      testCase: readCell(row, "TestCase"),
      email: readCell(row, "Email"),
      password: readCell(row, "Password")
    });
    }

    
  });

  if (testData.length === 0) {
    throw new Error(
      `No test data found for environment '${environment}' ` +
      `and test case '${testCase}'`
    );
  }

  if (testData.length > 1) {
    throw new Error(
      `Duplicate test data found for environment '${environment}' ` +
      `and test case '${testCase}'`
    );
  }

  console.log(testData);
  console.log(testData[0]);

  return testData;
}
