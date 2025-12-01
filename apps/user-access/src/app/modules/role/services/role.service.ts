import { Injectable } from "@nestjs/common";
import { RoleRepository } from "../repositories/role.repository";

@Injectable()
export class RoleService {
    constructor(private readonly roleRepository: RoleRepository) { }

    getAll() {
        const rs = this.roleRepository.getAll()
        return rs;
    }

    getById(id: string) {
        const rs = this.roleRepository.getById(id);
        return rs;
    }

    getByName(name: string) {
        const rs = this.roleRepository.getByName(name);
        return rs;
    }

}   