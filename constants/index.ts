export const manufacturers = [
  "Acura",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Citroen",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Ford",
  "GMC",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Maserati",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "MINI",
  "Mitsubishi",
  "Nissan",
  "Porsche",
  "Ram",
  "Rolls-Royce",
  "Subaru",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

// src/constants/vehicleCatalog.ts

export type VehicleCatalogItem = {
  make: string;
  models: string[];
};

export const vehicleCatalog: VehicleCatalogItem[] = [
  { make: "Honda", models: ["Civic", "Accord", "CR-V", "Pilot"] },
  { make: "Ford", models: ["Focus", "Mustang", "Explorer", "F-150"] },
  { make: "Chevrolet", models: ["Cruze", "Equinox", "Tahoe", "Silverado", "Corvette"] },
  { make: "Tesla", models: ["Model 3", "Model X", "Model S", "Model Y"] },
  { make: "Jeep", models: ["Wrangler", "Grand Cherokee", "Compass"] },
  { make: "BMW", models: ["3 Series", "5 Series", "X3", "i8"] },
  { make: "Porsche", models: ["911", "Cayenne", "Macan"] },
  { make: "Kia", models: ["Carnival", "Sorento", "Sportage"] },
  { make: "Audi", models: ["R8", "A4", "Q5"] },
  { make: "Mercedes-Benz", models: ["C-Class", "E-Class", "GLC"] },
  { make: "Lincoln", models: ["Navigator", "Nautilus", "Aviator"] },
  { make: "Toyota", models: ["Corolla", "RAV4", "Camry", "Highlander"] },

  // Optional extra brands to make catalog feel “real” without bloating
  { make: "Nissan", models: ["Altima", "Rogue", "Sentra"] },
  { make: "Hyundai", models: ["Elantra", "Tucson", "Santa Fe"] },
];


export const yearsOfProduction = [
  // { title: "Year", value: "" },
  { title: "2015", value: "2015" },
  { title: "2016", value: "2016" },
  { title: "2017", value: "2017" },
  { title: "2018", value: "2018" },
  { title: "2019", value: "2019" },
  { title: "2020", value: "2020" },
  { title: "2021", value: "2021" },
  { title: "2022", value: "2022" },
  { title: "2023", value: "2023" },
  { title: "2024", value: "2024" },
  { title: "2025", value: "2025" },
  { title: "2026", value: "2026" },
];

export const fuels = [
  {
    title: "Fuel",
    value: "",
  },
  {
    title: "Diesel",
    value: "diesel",
  },
  {
    title: "Gasoline",
    value: "gasoline",
  },
  {
    title: "Electric",
    value: "electric",
  },
  {
    title: "Hybrid",
    value: "hybrid",
  },
];

export const footerLinks = [
  {
    title: "About",
    links: [
      { title: "How it works", url: "/" },
      { title: "Featured", url: "/" },
      { title: "Partnership", url: "/" },
      { title: "Bussiness Relation", url: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "Events", url: "/" },
      { title: "Blog", url: "/" },
      { title: "Podcast", url: "/" },
      { title: "Invite a friend", url: "/" },
    ],
  },
  {
    title: "Socials",
    links: [
      { title: "Discord", url: "/" },
      { title: "Instagram", url: "/" },
      { title: "Twitter", url: "/" },
      { title: "Facebook", url: "/" },
    ],
  },
];


export const carCategories = [
  { title: "Body Style", value: "" },
  { title: "Sedan", value: "Sedan" },
  { title: "SUV", value: "SUV" },
  { title: "Hatchback", value: "Hatchback" },
  { title: "Convertible", value: "Convertible" },
  { title: "Minivan", value: "Minivan" },
  { title: "Pickup", value: "Pickup" },
  { title: "Coupe", value: "Coupe" },
  { title: "Luxury", value: "Luxury" },
  { title: "Electric", value: "Electric" },
  { title: "Sports Car", value: "Sports Car" },
];

export const dealerBranches = [
  { title: "Dealership", value: "" },
  { title: "West Kendall", value: "West Kendall" },
  { title: "Dadeland", value: "Dadeland" },
  { title: "Homestead", value: "Homestead" },
  { title: "Doral", value: "Doral" },
  { title: "Miami", value: "Miami" },
];

