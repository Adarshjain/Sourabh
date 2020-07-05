import {MutationUpdateCategoryOneArgs} from "./types";

let categoryOne: MutationUpdateCategoryOneArgs[] = [
    {
        name: "Gold",
        image: "https://picsum.photos/id/1/300",
        orderOfDisplay: 1
    },
    {
        name: "Silver",
        image: "https://picsum.photos/id/2/300",
        orderOfDisplay: 2
    },
    {
        name: "Platinum",
        image: "https://picsum.photos/id/3/300",
        orderOfDisplay: 3
    }
]

let categoryTwo: { [key: string]: any[] } = {
    "Gold": [
        {
            name: "Chain",
            image: "https://picsum.photos/id/4/300",
            orderOfDisplay: 1
        },
        {
            name: "Ring",
            image: "https://picsum.photos/id/5/300",
            orderOfDisplay: 2
        },
        {
            name: "Earring",
            image: "https://picsum.photos/id/6/300",
            orderOfDisplay: 3
        },
        {
            name: "Tiara",
            image: "https://picsum.photos/id/7/300",
            orderOfDisplay: 4
        }
    ],
    "Silver": [
        {
            name: "Bracelet",
            image: "https://picsum.photos/id/8/300",
            orderOfDisplay: 5
        },
        {
            name: "Anklet",
            image: "https://picsum.photos/id/9/300",
            orderOfDisplay: 6
        },
        {
            name: "Ring",
            image: "https://picsum.photos/id/10/300",
            orderOfDisplay: 7
        },
        {
            name: "Metti",
            image: "https://picsum.photos/id/11/300",
            orderOfDisplay: 8
        }
    ],
    "Platinum": [
        {
            name: "Couple Ring",
            image: "https://picsum.photos/id/12/300",
            orderOfDisplay: 9
        },
        {
            name: "Chain",
            image: "https://picsum.photos/id/13/300",
            orderOfDisplay: 10
        },
        {
            name: "Locket",
            image: "https://picsum.photos/id/14/300",
            orderOfDisplay: 11
        },
        {
            name: "Something",
            image: "https://picsum.photos/id/15/300",
            orderOfDisplay: 12
        }
    ]
}



export async function uploadCategoryOne(mutate: (variables: { variables: MutationUpdateCategoryOneArgs }) => any) {
    for (const categ of categoryOne) {
        await mutate({
            variables: categ
        })
    }
}


export async function uploadCategoryTwo(mutate,categOnes) {
    for (const categ of categOnes) {
        for (const categTwo of categoryTwo[categ.name]) {
            await mutate({
                variables: {
                    ...categTwo,
                    categoryOne: categ.id
                }
            });

        }
    }
}


export async function uploadProducts(mutate,data) {
    // console.log(data.categoriesTwo);
    // for (const categ of categOnes) {
    //     for (const categTwo of categoryTwo[categ.name]) {
    //         await mutate({
    //             variables: {
    //                 ...categTwo,
    //                 categoryOne: categ.id
    //             }
    //         });
    //
    //     }
    // }
}
