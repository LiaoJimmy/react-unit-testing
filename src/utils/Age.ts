const EIGHTEEN_YEARS = 18 * 365 * 24 * 60 * 60 * 1000;

// export const isOver18YearsOld = (birthDate: Date) => {
//   const current = new Date();
//   return current.getTime() - birthDate.getTime() >= EIGHTEEN_YEARS;
// };

export const isOver18YearsOld = (current: Date, birthDate: Date) => {
  return current.getTime() - birthDate.getTime() >= EIGHTEEN_YEARS;
};

export default undefined;
