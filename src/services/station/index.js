import { api } from "src/boot/axios"

class StationService{

    getStations() {
        return api.get(`api/station`)
    }

    createStation(data) {
        return api.post(`api/station`, data)
    }
}

export default new StationService