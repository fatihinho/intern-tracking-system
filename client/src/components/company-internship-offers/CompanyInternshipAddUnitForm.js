import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const CompanyInternshipAddUnitForm = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const internId = location.state.internId;
    const companyId = localStorage.getItem('currentUser-subUserId');

    const [companyInternId, setCompanyInternId] = useState();

    const [unitNameError, setUnitNameError] = useState(false);

    const [values, setValues] = useState({
        unitName: ''
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        getCompanyInternId();

        async function getCompanyInternId() {
            const response = await axios.get(`/api/v1/company-interns/${companyId}/${internId}`);
            const data = response.data;
            setCompanyInternId(data.id);
        }
    });

    const onClickAddUnit = () => {
        if (values.unitName.trim().length > 0) {
            axios.put('/api/v1/company-interns/add-unit', {
                id: companyInternId,
                unitName: values.unitName
            })
                .then(response => {
                    if (response.status === 200) {
                        toast.success('Birim Ataması Gerçekleştirildi!')
                    }
                }).then(() => {
                    navigate('/app-company/company-internship-offers/accepts', { replace: true });
                }).catch(error => {
                    toast.error('Birim Ataması Gerçekleştirilirken Bir Sorun Oluştu!')
                })
        } else {
            if (values.unitName.trim().length <= 0) {
                setUnitNameError(true);
                setTimeout(() => {
                    setUnitNameError(false);
                }, 1500);
            }
        }
    }

    return (
        <form
            autoComplete="off"
            noValidate
            {...props}
        >
            <Card>
                <CardHeader
                    title="Stajyer Birim Ataması"
                />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                size="small"
                                fullWidth
                                label="Birim Adı"
                                name="unitName"
                                onChange={handleChange}
                                value={values.unitName}
                                variant="outlined"
                                error={unitNameError}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <Button
                                onClick={onClickAddUnit}
                                size="medium"
                                style={{ backgroundColor: "#70D987" }}
                                variant="contained"
                            >
                                Ekle
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>

            </Card>
        </form>

    );
};

export default CompanyInternshipAddUnitForm;
