import { api } from "src/boot/axios"

class StationService{

    getStations() {
        return api.get(`api/station`)
    }

    getStationById(id) {
        return api.get(`api/station/${id}`)
    }

    createStation(data) {
        return api.post(`api/station`, data)
    }

    updateStation(id, data) {
        return api.put(`api/station/${id}`, data)
    }

    deleteStation(id) {
        return api.delete(`api/station/${id}`)
    }

}

export default new StationService