export interface PhotoType {
    id: number;
    imagePath: string;
    description: string;
}

export interface StatsType {
    likes: number;
    onDoubleClick: Function;
}