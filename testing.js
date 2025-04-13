const baseURL = "https://api.spoonacular.com/recipes/findByNutrients";
const API_KEY = import.meta.env.VITE_API_KEY;

const formValues = {
  minCarbs: "",
  maxCarbs: "50",
  minProtein: "",
  maxProtein: "100",
  minFat: "",
  maxFat: "",
};

// Build search params from non-empty values
const params = new URLSearchParams();

for (const [key, value] of Object.entries(formValues)) {
  if (value?.trim()) {
    params.append(key, value.trim());
  }
}

// Convert params to string
let queryString = params.toString();

// Append API key at the end
if (queryString) {
  queryString += `&apiKey=${API_KEY}`;
} else {
  queryString = `apiKey=${API_KEY}`;
}

const url = `${baseURL}?${queryString}`;
console.log(url);
