import bcrypt from "bcryptjs";

async function matchPasswords(enteredPassword: string, userPassword: string): Promise<boolean> {
    try {
        const isMatch = await bcrypt.compare(enteredPassword, userPassword);
        return isMatch;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error
    }
}

export async function hashPassword(plainPassword:string) {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds); 
    const hashedPassword = await bcrypt.hash(plainPassword, salt); 
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
}
export default matchPasswords;
