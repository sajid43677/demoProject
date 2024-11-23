// types/Product.ts
export interface Product {
    Name: string;
    ShortDescription: string;
    FullDescription: string;
    SeName: string;
    Sku: string;
    ProductType: number;
    MarkAsNew: boolean;
    ProductPrice: {
      OldPrice: string;
      OldPriceValue: number;
      Price: string;
      PriceValue: number;
    };
    PictureModels: Array<{
      ImageUrl: string;
      FullSizeImageUrl: string;
      Title?: string;
      AlternateText?: string;
    }>;
    ProductSpecificationModel?: {
      Groups: any[];
    };
    ReviewOverviewModel: {
      ProductId: number;
      RatingSum: number;
      TotalReviews: number;
    };
    Id: number;
  }
  