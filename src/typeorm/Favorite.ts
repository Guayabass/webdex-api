import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique } from "typeorm";
import { User } from "./User";

@Entity()
@Unique("ID_User", ["pokemonID", "user"])
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