import { Prop, Schema } from "@nestjs/mongoose";
import { Base, createSchema } from "./base.schema";
import { ObjectId } from 'mongodb';
import { Model } from "mongoose";

@Schema({
    timestamps: true,
    collection: 'user'
})
export class User extends Base {
    @Prop({ type: String })
    firstName: string;

    @Prop({ type: String })
    lastName: string;

    @Prop({ type: String })
    email: string;

    // userid nay dc sinh ra tu keycloak
    @Prop({ type: String })
    userId: string;

    @Prop({ type: [ObjectId], ref: 'Role' })
    roles: ObjectId[];
}


export const UserModelName = User.name;

export const UserSchema = createSchema(User);

export const UserDestination = {
    name: UserModelName,
    schema: UserSchema
}

export type UserModel = Model<User>