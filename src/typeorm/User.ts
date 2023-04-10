import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Favorite } from "./Favorite";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'email_address'})
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Favorite, (favorite) => favorite.user)
    favorites: Favorite[];

    // @Column('integer', {
    //     nullable: true,
    // })
    // favoritesIds: number[];

    // @ManyToMany(() => Favorite, (favorite) => favorite.users)
    // @JoinTable({
    //     name: 'users_favorites',
    //     joinColumn: {
    //         name: 'user_id',
    //     },
    //     inverseJoinColumn: {
    //         name: 'favorite_id',
    //     }
    // })
    // favorites: Favorite[];
}