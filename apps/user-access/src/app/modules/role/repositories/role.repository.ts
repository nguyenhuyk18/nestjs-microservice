import { RoleModel, RoleModelName } from "@common/schemas/role.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class RoleRepository {
    constructor(@InjectModel(RoleModelName) private roleModel: RoleModel) { }

    getAll() {
        const rs = this.roleModel.find().exec();
        return rs;
    }

    getById(id: string) {
        const rs = this.roleModel.findById(id).exec();
        return rs;
    }

    getByName(name: string) {
        const rs = this.roleModel.find({ name: name }).exec();
        return rs;
    }
}