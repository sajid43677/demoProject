export interface Category {
    Name: string; // Name of the category
    SeName: string; // SEO-friendly name
    NumberOfProducts: number | null; // Number of products in the category, nullable
    IncludeInTopMenu: boolean; // Whether the category is included in the top menu
    SubCategories: Category[]; // Array of subcategories, recursive relationship
    HaveSubCategories: boolean; // Indicates if the category has subcategories
    Route: string | null; // Route for navigation, nullable
    Id: number; // Unique identifier for the category
    CustomProperties: Record<string, any>; // Additional custom properties, dynamic structure
  }