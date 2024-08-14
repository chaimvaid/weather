import {React} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import WeatherPage from "../pages/WeatherPage";


function AppRouter() {
   
    return (
        <Routes>
            <Route path={'weather'} element={<WeatherPage/>} />
            <Route path="*" element={<WeatherPage/>} />
        </Routes>
    )
}

export default AppRouter;