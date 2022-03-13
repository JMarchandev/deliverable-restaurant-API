export const logError = (error: unknown, service: string) => {
  console.log("------------ CUSTOME ERROR ------------");
  console.log(`${service} error => `, error);
  console.log("------------ CUSTOME ERROR ------------");
  return;
};
        