import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn} from "typeorm"
import { RoleAliasArn, RoleAliasDescription } from "../../node_modules/aws-sdk/clients/iot";

@Entity("user")
export class User {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({nullable: true})
    FirstName!: string;

    @Column({nullable: true})
    LastName!: string;

    @Column()
    Email: string;

    @Column({default: false})
    EmailVerified: boolean;

    @Column()
    PasswordHash: string;

    @Column({nullable: true})
    PhoneNumber: string;

    @Column({default: false, nullable: true})
    PhoneNumberVerified: boolean;

    @Column({default: false})
    TwoFactorEnabled: boolean;

    @Column({default: null, nullable: true})
    PasswordResetToken: string;

    @Column({default: null, nullable: true})
    PasswordResetExpires: Date;

    @Column({default: null, nullable: true})
    EmailVerifyToken: string;

    @Column({default: false, nullable: false})
    Active: Boolean;

    @Column({default: 'User', nullable: false})
    Role: string;

    @Column({default: null, nullable: true})
    Avatar: String;

    @CreateDateColumn()
    DateCreated: Date;

}