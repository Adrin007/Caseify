// bg-zinc-900 border-zinc-900
// bg-blue-900 border-blue-900
// bg-red-500 border-red-500
// bg-yellow-900 border-yellow-900

export const COLORS = [
    { value: "Black", tw: "zinc-900" },
    { value: "Blue", tw: "blue-900" },
    { value: "Red", tw: "red-500" },
    { value: "Lavender", tw: "[#6C48C5]" },
]

export const MODELS = [
    { label: "iPhone X", value: "iphonex" },
    { label: "iPhone 11", value: "iphone11" },
    { label: "iPhone 12", value: "iphone12" },
    { label: "iPhone 13", value: "iphone13" },
    { label: "iPhone 14", value: "iphone14" },
    { label: "iPhone 15", value: "iphone15" },
]

export const MATERIALS = [
        {
            label: 'Silicone',
            value: 'silicone',
            description: "Flexible, shock-absorbent",
            price: 0,
        },
        {
            label: 'Soft Polycarbonate',
            value: 'polycarbonate',
            description: 'Scratch-resistant coating',
            price: 220,
        },
]
export const FINISHES = [
        {
            label: 'Smooth Finish',
            value: 'smooth',
            description: 'Smooth texture',
            price: 0,
        },
        {
            label: 'Textured Finish',
            value: 'textured',
            description: 'Soft grippy texture',
            price: 100,
        },
]
export const CURRENCIES = [
    {key:"inr",value:"IND"},
    {key:"usd",value:"USD"},
    {key:"eur",value:"EUR"}
]

export const BASE_PRICE = 325