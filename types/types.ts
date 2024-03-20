export interface SafeViewProps {
  bgColor?: string,
  children: React.ReactNode
}

export interface Strings {
  [x: string]: string
}

export interface BasketState {
  items: {
    _id: number,
    name: string,
    price: number,
    description: string,
    imgUrl: string,
  }[]
}

export interface RestaurantsState {
  restaurant: {
    _id: number | null,
    title: string,
    short_description: string,
    imgUrl: string | null,
    address: string | null,
    rating: number | null,
    genre: string | null,
    dishes: string[] | null,
    lat: number,
    long: number,
  }
}