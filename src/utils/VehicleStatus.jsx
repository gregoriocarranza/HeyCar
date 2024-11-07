import Aceite from "../assets/vehiclestatusPictures/Aceite.svg";
import Bateria from "../assets/vehiclestatusPictures/Bateria.svg";
import Frenos from "../assets/vehiclestatusPictures/Frenos.svg";
import Luces from "../assets/vehiclestatusPictures/Luces.svg";
import Motor from "../assets/vehiclestatusPictures/Motor.svg";
import Neumaticos from "../assets/vehiclestatusPictures/Neumaticos.svg";
import Temperatura from "../assets/vehiclestatusPictures/Temperatura.svg";

const vehicleStatusChecker = (statusData) => {
  const statusItems = [
    { id: 1, name: "Motor", status: statusData?.engine_status, img: Motor },
    { id: 2, name: "Batería", status: statusData?.battery_status, img: Bateria },
    { id: 3, name: "Frenos", status: statusData?.brakes_status, img: Frenos },
    {
      id: 4,
      name: "Neumático",
      status: statusData?.tires_status,
      img: Neumaticos,
    },
    { id: 5, name: "Aceite", status: statusData?.oil_status, img: Aceite },
    {
      id: 6,
      name: "Temperatura",
      status: statusData?.temperature_status,
      img: Temperatura,
    },
    {
      id: 7,
      name: "Luces delanteras",
      status: statusData?.front_light_status,
      img: Luces,
    },
    {
      id: 8,
      name: "Luces traseras",
      status: statusData?.rear_light_status,
      img: Luces,
    },
  ];
  return statusItems;
};

export default vehicleStatusChecker;
