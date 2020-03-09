export const transformPhoneNumber = (phone: number) => {
  if (!phone) {
    return '';
  }
  const phoneString = phone.toString().split('');
  const areaCode = phoneString.slice(0, 3).join('');
  const phone1 = phoneString.slice(3, 6).join('');
  const phone2 = phoneString.slice(6, 10).join('');
  return `(${areaCode}) ${phone1}-${phone2}`;
};
