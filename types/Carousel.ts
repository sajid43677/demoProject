export interface PictureModel {
    ImageUrl: string;
    ThumbImageUrl: string | null;
    FullSizeImageUrl: string;
    Title: string;
    AlternateText: string;
    Id: number;
    CustomProperties: Record<string, any>;
}

export interface Manufacturer {
    Name: string;
    SeName: string;
    PictureModel: PictureModel;
    Id: number;
    CustomProperties: Record<string, any>;
}

export interface Carousel {
    Title: string;
    DisplayTitle: boolean;
    ShowBackground: boolean;
    BackgroundPictureUrl: string | null;
    BackgroundColor: string | null;
    AutoPlay: boolean;
    Loop: boolean;
    StartPosition: number;
    Navigation: boolean;
    ShowCountdown: boolean;
    CountdownUntil: string | null;
    CarouselType: number;
    BackgroundType: number;
    Products: any[]; // This can be typed more specifically if you have more data about products
    Manufacturers: Manufacturer[];
    Categories: any[]; // Same as Products, could be more specific
    Vendors: any[]; // Could be more specific if data is provided
    VideoUrls: string[];
    Pictures: string[]; // List of picture URLs
    Id: number;
    CustomProperties: Record<string, any>;
}
  