function Map(cities) {
    this.cities = cities;

    this.closest = (x, y) => {
        let z = 180;
        let name;
        cities.forEach(element => {
            let v = Math.sqrt(Math.pow(element.lat - x,2)+Math.pow(element.lng-y,2))
            //console.log(v,z)
            if (z > v) {
                name = element.name
                z = v
            }
        })
        return name;
    }

    this.direction = (s) => {
        let city 
        switch(s) {
            case "northernmost": 
            case  "n":
                city = this.sort("lat")
                break;
            case "easternmost":
            case "e":
                city = this.sort("lng")  
                break;
            case "southernmost":
            case "s":
                city = this.sort("lat",true)    
                break;
            case "westernmost":
            case "w":
                city = this.sort("lng", true)
                break;
        }
        return city
    }
    this.sort = (key,srt=false) => {
        let tmp = cities.sort((a,b) => {
            return srt ? (a[key] > b[key]) : (a[key] < b[key])
        })
        return tmp[0]
    }

    this.state = () => {
        let str = "";
        cities.forEach(element => {
            let z = element.name.slice(-2);
            if (str.indexOf(z)==-1) {
                str += z + " ";
            }
        })
        return str.slice(0,-1)
    }
}

const cities = [
    {name: "Nashville, TN", lat:36.17, lng:-86.78},
    {name: "New York, NY", lat:40.71, lng:-74.00},
    {name: "Atlanta, GA", lat:33.75, lng:-84.39},
    {name: "Denver, CO", lat:39.74, lng:-104.98},
    {name: "Seattle, WA", lat:47.61, lng:-122.33},
    {name: "Los Angeles, CA", lat:34.05, lng:-118.24},
    {name: "Memphis, TN", lat:35.15, lng:-90.05}
]

let m = new Map(cities)

console.log(m.direction("northernmost"))
console.log(m.closest(39.952584,-75.165222))
console.log(m.state())


