import { isOver18YearsOld } from '@/utils/Age';

describe('Age', () => {
  describe('isOver18YearsOld', () => {
    it('should return true if the user is over 18 years old', () => {
      const current = new Date(2020, 0, 1);
      const birthDate = new Date(2000, 0, 1);

      const res = isOver18YearsOld(current, birthDate);

      expect(res).toBe(true);
    });

    it('should return false if the user is under 18 years old', () => {
      const current = new Date(2020, 0, 1);
      const birthDate = new Date(2005, 0, 1);

      const res = isOver18YearsOld(current, birthDate);

      expect(res).toBe(false);
    });

    it('should return true if the user is exactly 18 years old', () => {
      const current = new Date(2020, 0, 1);
      const birthDate = new Date(2002, 0, 1);

      const res = isOver18YearsOld(current, birthDate);

      expect(res).toBe(true);
    });
  });
});
