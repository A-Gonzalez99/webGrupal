
const db = [
    {
        name: 'Grandhotel Pupp',
        location: 'Mírové nám. 2, 360 01 Karlovy Vary 1, Chequia',
        imag: 'https://foto.hrsstatic.com/fotos/0/2/600/430/80/000000/http%3A%2F%2Ffoto-origin.hrsstatic.com%2Ffoto%2F0%2F1%2F3%2F5%2F013571%2F013571_as_4550917.jpg/KS1KiK0Tcoe4kSyH5eMRnQ%3D%3D/600%2C400/6/Grandhotel_Pupp-Karlsbad-Anfahrtskizze-13571.jpg'
    },
    {
        name: 'Kaufhaus Görlitz',
        location: 'An d. Frauenkirche 5-7, 02826 Görlitz, Alemania',
        imag: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Kaufhaus_G%C3%B6rlitz_%2820350152403%29.jpg'
    },
    {
        name: 'Budavári Felső Sikló',
        location: 'Budapest, Sikló u., 1013 Hungría',
        imag: 'https://azoldbolygo.hu/wp-content/uploads/2019/02/IMG_1182-574x430.jpg'
    },
    {
        name: 'Pfunds Molkerei',
        location: 'Bautzner Str. 79, 01099 Dresden, Alemania',
        imag: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdyh_xEpWbtEpzxHsq8ACp9l8zs01AjQoirQ&s'
    },
    {
        name: 'Fürstenzug',
        location: 'Augustusstraße 1, 01067 Dresden, Alemania',
        imag: 'https://www.selected.de/fileadmin/user_upload/_c_Uwe_-_stock.adobe.comAdobeStock_126683645.jpg'
    },
    {
        name: 'Zwinger',
        location: 'Sophienstraße, 01067 Dresden, Alemania',
        imag: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/39/90/bb.jpg'
    },
]

export function GetDataBaseLocations() {
    return db
}

export function UpdateDataBaseLocations(index, name, location) {
    db[index].name=name
    db[index].location=location

}

export function PostDataBaseLocations(name,location){
    const newLocation = {
        name: name,
        location: location,
        imag: "default-image.webp"
    };
    db.push(newLocation)
}

export function RemoveDataBaseLocations(index){
    db.splice(index,index)
}

