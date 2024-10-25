'use server'
import bcrypt from 'bcrypt';

const hashPassword = async(password: string) => {
  return await bcrypt.hash(password, 10);
};
const compairPassword = async(password: string,hashedPassword:string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export { hashPassword ,compairPassword};
