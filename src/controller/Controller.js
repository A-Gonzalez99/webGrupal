import { useNavigate } from "react-router-dom";

export function ChangePage(page){
    var navigate = useNavigate();
    navigate(page);
}

export function GetStorageStoryBoard(){
    return GetStorage("date")
}


export function GetStorageLocation(){
    return GetStorage("location")
}

export function GetStorageProyect(){
  return GetStorage("proyect")
}


function GetStorage(name){
    var num = localStorage.getItem(name);
    if (num === null) {
      localStorage.setItem(name, 0);
      num=0;
    }
    return num
}