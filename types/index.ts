import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean;
}

export interface SearchManufacturerProps {
  manufacturer: string;
  setManufacturer: (manufacturer: string) => void;
}

export interface CarImage {
  _id: string;
  angle: "main" | "front" | "rear" | "roof";
  url: string;
}

export interface Location {
  branch: string;
}

export interface CarProps {
  _id: string;
  make: string;
  model: string;
  category?: string;
  trim?: string;
  year: number;
  color?: string;
  seats?: number;
  fuelType?: string;
  transmission?: string;
  mileage?: number;
  price: number;
  pricePerDay: number;
  images: CarImage[];
  description?: string;
  features?: string[];
  available: boolean;
  createdAt?: string;
  slug?: string;
  location: Location;
  condition?: "new" | "used";
  certified?: boolean;
  drivetrain?: Drivetrain;
  isDeleted?: boolean;
  deletedAt?: string | null;
}
export type FuelType = "gasoline" | "diesel" | "electric" | "hybrid" | "other";
export type Transmission = "automatic" | "manual" | "semi-automatic";

export interface FilterProps {
  make?: string;
  model?: string;
  fuelType?: FuelType;
  transmission?: Transmission;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  mileageMin?: number;
  mileageMax?: number;
  page?: number;
  limit?: number;
  seats?: number;
  category?: string;
  branch?: string;
  condition?: string;
  sort?: SortOption;
  includeDeleted?: boolean;
  onlyDeleted?: boolean;
  onlyActive?: boolean;
  includeHidden?: boolean;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  value: string;
  options: OptionProps[];
  handleChange?: (value: string) => void; // ✅ callback when selection changes
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}

// export type SortOption = "price-asc" | "price-desc";
export type SortOption =
  | "price-asc"
  | "price-desc"
  | "year-asc"
  | "year-desc"
  | "mileage-asc"        
  | "mileage-desc";   
  
  export type Drivetrain = "FWD" | "RWD" | "AWD" | "4WD"


