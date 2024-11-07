import { combineReducers } from "redux";
import { userReducer } from "../Features/User/UserSlice";
import { vehiclesReducer } from "../Features/Vehicles/VehiclesSlice";
import { notificationReducer } from "../Features/Notification/NotificationSlice";

export default combineReducers({
  user: userReducer,
  vehicles: vehiclesReducer,
  notifications: notificationReducer,
});
