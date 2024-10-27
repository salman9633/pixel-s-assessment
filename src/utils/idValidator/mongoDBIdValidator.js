import { Types } from "mongoose";

const idValidator = {
    checking(data) {
        for (const key in data) {

            let isValid = Types.ObjectId.isValid(data[key]);
            if (!isValid) throw new Error(`${key} is not a validId`);
        }
    }
}

export default idValidator