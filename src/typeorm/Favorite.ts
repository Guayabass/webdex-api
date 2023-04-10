import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Favorite {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    pokemonID: number;

    @Column()
    pokemonName: string;

    @ManyToOne(() => User, (user) => user.favorites)
    @JoinColumn({name: 'user_id'})
    user: User;

}