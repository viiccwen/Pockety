import { currentUser } from "@clerk/nextjs/server"

interface AddProps {
    name: string;
    initial_value: number;
    value: number;
    category: string;
}

export const AssetAddCheck = async ({ name, initial_value, value, category } : AddProps) => {

    console.log(name);
    console.log(initial_value);
    console.log(value);
    console.log(category);
}