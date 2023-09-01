import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique, Index } from "typeorm";
import { User } from "./User";

@Entity()
@Unique("ID_User", ["pokemonID", "user"])
export class Favorite {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index({unique: true})
    pokemonID: number;

    @Column()
    pokemonName: string;

    @ManyToOne(() => User, (user) => user.favorites)
    @JoinColumn({name: 'user_id'})
    @Index({unique: true})
    user: User;

}