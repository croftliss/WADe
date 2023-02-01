import { Coin } from "./coin.model";

export interface Profile {
    id: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    country: string;
    city: string;
    about: string;

    coins: Coin[];
}