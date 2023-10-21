import { Route,Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import RecipeDetailsPage from "../pages/RecipeDetailsPage"
import SavedRecipePage from "../pages/SavedRecipePage"

const MainRoutes=()=>{
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/details/:recipeId" element={<RecipeDetailsPage />} />

            <Route path="/saved-recipes" element={<SavedRecipePage/>}/>
        </Routes>
    )
}
export default MainRoutes