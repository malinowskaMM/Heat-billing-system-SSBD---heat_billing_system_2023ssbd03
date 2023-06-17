import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {TextField, Snackbar, SnackbarContent} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import axios from 'axios';
import validator from "validator";
import {API_URL} from '../../consts';
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function EditUserPersonalData() {
    const {t, i18n} = useTranslation();
    const username = useParams().username;
    const token = "Bearer " + localStorage.getItem("token");
    const [version, setVersion] = useState("");

    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    var [name, setName] = useState("");
    var [surname, setSurname] = useState("");

    var [nameError, setNameError] = useState("");
    var [surnameError, setSurnameError] = useState("");
    var [dataError, setDataError] = useState("");

    var [successOpen, setSuccessOpen] = useState(false);
    var [errorOpen, setErrorOpen] = useState(false);

    const [authorizationErrorOpen, setAuthorizationErrorOpen] = useState(false);

    const [nameValid, setNameValid] = useState(false);
    const [surnameValid, setSurnameValid] = useState(false);

    const fetchData = async () => {
        const response = await axios.get(`${API_URL}/accounts/${username}/personal-data`, {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
                setName(response.data.firstName.toString());
                setSurname(response.data.surname.toString());
                localStorage.setItem("etag", response.headers["etag"]);
                setVersion(response.data.version.toString());
                setNameValid(true);
                setSurnameValid(true);
            })
            .catch(error => {
                if (error.response.status === 403) {
                    setAuthorizationErrorOpen(true);
                    return;
                }
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
        if (validator.isAlpha(event.target.value) && event.target.value.length <= 32 && event.target.value.length > 0) {
            setNameError("");
            setNameValid(true);
        } else {
            setNameError(t('personal_data.name_error'));
            setNameValid(false);
        }
    };

    const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSurname(event.target.value);
        if (validator.isAlpha(event.target.value) && event.target.value.length <= 32 && event.target.value.length > 0) {
            setSurnameError("");
            setSurnameValid(true);
        } else {
            setSurnameError(t('personal_data.surname_error'));
            setSurnameValid(false);
        }
    };

    const handleClickOpen = () => {
        fetchData();
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    const handleConfirmClose = () => {
        setConfirmOpen(false);
    }

    const handleConfirmConfirm = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            setConfirmOpen(false);
        }
        const personalDataDTO = {
            firstName: name.toString(),
            surname: surname.toString(),
            version: version.toString()
        }

        if (nameError === "" && surnameError === "") {
            axios.patch(`${API_URL}/accounts/${username}/personal-data`,
                personalDataDTO, {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json',
                        'If-Match': localStorage.getItem("etag")
                    },
                })
                .then(response => {
                    setSuccessOpen(true);
                })
                .catch(error => {
                    if (error.response.status === 403) {
                        setAuthorizationErrorOpen(true);
                        return;
                    }
                    setErrorOpen(true);
                });
        }
        handleClose(event, reason);
    }

    const handleConfirm = (event: React.SyntheticEvent<unknown>, reason?: string) => {
        setConfirmOpen(true);
    }

    const handleSuccessClose = () => {
        setSuccessOpen(false);
        window.location.reload();
    }

    const handleErrorClose = () => {
        setErrorOpen(false);
    };

    const handleAuthorizationErrorOpen = () => {
        setAuthorizationErrorOpen(false);
        handleConfirmClose();
    };

    setTimeout(handleSuccessClose, 20000);
    setTimeout(handleErrorClose, 20000);
    setTimeout(handleAuthorizationErrorOpen, 20000);

    return (
        <div>
            <div>
                <Button onClick={handleClickOpen} variant="contained">{t('personal_data.edit_data')}</Button>
            </div>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>{t('personal_data.edit_title')}{username}</DialogTitle>
                <DialogContent>
                    <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                        <form onSubmit={handleSumbit}>
                            <List component="nav" aria-label="mailbox folders">
                                <ListItem>
                                    <div className="form-group" onChange={handleNameChange}>
                                        <TextField
                                            id="outlined-helperText"
                                            label={t('personal_data.name')}
                                            defaultValue={name}
                                            helperText={t('personal_data.name_helper_text')}
                                        />
                                        <div className="form-group">
                                            {nameError}
                                        </div>
                                    </div>
                                </ListItem>
                                <ListItem>
                                    <div className="form-group" onChange={handleSurnameChange}>
                                        <TextField
                                            id="outlined-helperText"
                                            label={t('personal_data.surname')}
                                            defaultValue={surname}
                                            helperText={t('personal_data.name_helper_text')}
                                        />
                                        <div className="form-group">
                                            {surnameError}
                                        </div>
                                    </div>
                                </ListItem>
                            </List>
                            <div className="form-group">
                                {dataError}
                            </div>
                        </form>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('confirm.cancel')}</Button>
                    <Button onClick={handleConfirm} disabled={!(nameValid && surnameValid)}>{t('confirm.ok')}</Button>
                </DialogActions>
            </Dialog>


            <Dialog disableEscapeKeyDown open={confirmOpen} onClose={handleConfirmClose}>
                <DialogTitle>{t('personal_data.confirm_edit')}{username} ?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleConfirmClose}>{t('confirm.no')}</Button>
                    <Button onClick={handleConfirmConfirm}>{t('confirm.yes')}</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={successOpen} onClose={handleSuccessClose}>
                <SnackbarContent 
                message={t('personal_data.edit_success_one')+username+t('personal_data.edit_success_two')}/>
            </Snackbar>

            <Snackbar open={errorOpen} onClose={handleErrorClose}>
                <SnackbarContent 
                message={t('personal_data.edit_error')+username}/>
            </Snackbar>

            <Snackbar open={authorizationErrorOpen} onClose={handleAuthorizationErrorOpen}>
                <SnackbarContent 
                message={t('personal_data.authorization_error')}/>
            </Snackbar>
        </div>
    );
}