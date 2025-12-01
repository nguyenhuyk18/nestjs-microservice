import { User, UserModel, UserModelName } from "@common/schemas/user.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(UserModelName) private userModel: UserModel) { }

    create(data: Partial<User>) {
        return this.userModel.create(data);
    }

    getById(id: string) {
        return this.userModel.findOne({ userId: id }).populate('roles').exec()
    }

    getByEmail(email: string) {
        return this.userModel.findOne({ email }).exec();
    }

    async isExistEmail(email: string) {
        const rs = await this.userModel.findOne({ email }).exec();
        return !!rs;
    }

    // delete(id: string) {
    //     return this.userModel.findByIdAndDelete(id);
    // }


}