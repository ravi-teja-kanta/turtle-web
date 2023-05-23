export type MenuItem = {
    id: string,
    name: string,
    currentPrice: number,
    oldPrice: number,
    imageUrl: string,
    isNonVeg: boolean
}

export const MayabazaarMenu: MenuItem[] =  [
    {
        id: "1",
        name: "Chicken Biryani",
        currentPrice: 359,
        oldPrice: 300,
        isNonVeg: true,
        imageUrl: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/htra1ceo32gospqkqalp"
    },
    {
        id: "2",
        name: "Chicken Boneless Biryani",
        currentPrice: 279,
        oldPrice: 350,
        isNonVeg: true,
        imageUrl: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/433f058364653f9323670ae157547031"
    },
    {
        id: "3",
        name: "Chicken Haleem",
        currentPrice: 99,
        oldPrice: 120,
        isNonVeg: true,
        imageUrl: "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/ef356baf40a5ae847f779f28d5b97a3d"
    },
    
];