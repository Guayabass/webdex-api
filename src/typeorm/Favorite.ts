import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import { User } from "./User";

@Entity()
@Index(["pokemonID", "user"], { unique: true })
export class Favorite {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pokemonID: number;

    @Column()
    pokemonName: string;

    @ManyToOne(() => User, (user) => user.favorites)
    @JoinColumn({name: 'user_id'})
    user: User;

}