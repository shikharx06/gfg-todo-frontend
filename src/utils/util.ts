export const safelyParseJson = (data: any, defaultValue: any = undefined) => {
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return defaultValue;
  }
};
