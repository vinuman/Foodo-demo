/* ------------------------------------------------------------------ */
/*  TheMealDB API types                                               */
/* ------------------------------------------------------------------ */

/** Raw meal object returned by TheMealDB. */
export interface MealDBMeal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}

/** Normalised meal used across the app. */
export interface Meal {
  id: string;
  name: string;
  category: string;
  area: string;
  instructions: string;
  thumbnail: string;
  tags: string[];
  youtubeUrl: string | null;
  sourceUrl: string | null;
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  measure: string;
}

/* ------------------------------------------------------------------ */
/*  Foodo 3D Model API types                                          */
/* ------------------------------------------------------------------ */

export interface FoodoModelPath {
  glb: string;
  usdz: string | null;
  mdpi: string | null;
}

export interface FoodoLightingInfo {
  verticalTiltAngle: number;
  horizontalTiltAngle: number;
  zoom: number;
  lighting: [number, number, number];
  exposure: number;
  verticalPosition: number;
}

/** Single 3D model from the Foodo API. */
export interface FoodoModel {
  _id: string;
  name: string;
  status: number;
  modelPath: FoodoModelPath;
  lightingInfo: FoodoLightingInfo;
}

/** Foodo API response wrapper. */
export interface FoodoApiResponse {
  success: boolean;
  code: number;
  msg: string;
  data: {
    rows: FoodoModel[];
    count: number;
  };
}
