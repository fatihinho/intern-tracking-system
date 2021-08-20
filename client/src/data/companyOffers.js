import axios from "axios";


let companyOffersById = [];

const internId = localStorage.getItem('currentUser-subUserId');

axios.get(`/api/v1/company-offers/intern/${internId}`)
    .then(response => {
        console.log(response.data)
    })

export default companyOffersById;