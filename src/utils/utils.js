export const CreateTime = () => {
  const CurrntDate = new Date(); //cTime = CurrentTime
  const date =
    " " +
    CurrntDate.getDate() +
    "-" +
    (CurrntDate.getMonth() + 1) +
    "-" +
    CurrntDate.getFullYear() +
    ", " +
    " " +
    CurrntDate.getHours() +
    ":" +
    CurrntDate.getMinutes();

  return date;
};

export default CreateTime;
