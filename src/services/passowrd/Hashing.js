import bcrypt from 'bcryptjs'

class Hashing {
    static async hashing(password) {
        const salt = await bcrypt.genSalt(9);
        return await bcrypt.hash(password, salt)
    }

    static async compare(enteredPassword,storedPassword){
        return await bcrypt.compare(enteredPassword, storedPassword);
    }
}

export default Hashing; 