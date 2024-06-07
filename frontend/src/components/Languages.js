import { changeLanguage } from 'i18next';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Avatar, Box, Button, Modal, TextField, Tooltip } from "@mui/material";
import auth from '../firebase.init';
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
import { useState } from "react";

const languages = [
    { code: "en", lang: "English" },
    { code: "es", lang: "Spanish" },
    { code: "fr", lang: "French" },
    { code: "hi", lang: "Hindi" },
    { code: "te", lang: "Telugu" },
    { code: "ar", lang: "Arabic" },
    { code: "pt", lang: "Portuguese" },
    { code: "ta", lang: "Tamil" },
    { code: "bn", lang: "Bengali" },
    { code: "ur", lang: "Urdu" }
];


const Languages = () => {
    const { i18n } = useTranslation();
    const [user] = useAuthState(auth);
    // for otp
    const [otp1, setOtp1] = useState('');
    const [otp2, setOtp2] = useState('');
    const [otp3, setOtp3] = useState('');
    const [otp4, setOtp4] = useState('');


    const [selectedLanguage, setSelectedLanguage] = useState(null);


    // For otp verfication
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    // language
    const { t } = useTranslation();
    const { enterotp, l1, verify } = t("otpModal");

    // style for modal
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    // Function to send OTP
    const sendOtp = async () => {
        try {
            setOtp1('');
            setOtp2('');
            setOtp3('');
            setOtp4('');
            const response = await axios.post('http://localhost:5000/sendotp', { email: user.email });
            if (response.data === 'sent otp') {
                setIsOtpSent(true);
                setOpenModal(true);
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    // Function to verify OTP
    const verifyOtp = async () => {
        try {
            setOtp(otp1 + otp2 + otp3 + otp4);
            const response = await axios.post('http://localhost:5000/verify', { email: user.email, otp });
            if (response.data === 'Verified') {
                setIsOtpVerified(true);
                setOpenModal(false);
                if (selectedLanguage) {
                    i18n.changeLanguage(selectedLanguage);
                }
                setIsOtpVerified(false);
            }
            if (response.data === 'Invalid OTP') {
                alert("invalid otp")
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    const otpModal = (
        <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: 400 }}>
                <h2 id="parent-modal-title">{enterotp}</h2>
                <p id="parent-modal-description">
                    {l1}{user.email}
                </p>
                <div className="otpField">
                    <TextField
                        value={otp1}
                        onChange={(e) => {
                            setOtp1(e.target.value.slice(0, 1));
                            if (e.target.value.length === 1) {
                                document.getElementById("otp2").focus();
                            }
                        }}
                    />
                    <TextField
                        id="otp2"
                        value={otp2}
                        onChange={(e) => {
                            setOtp2(e.target.value.slice(0, 1));
                            if (e.target.value.length === 1) {
                                document.getElementById("otp3").focus();
                            }
                        }}
                    />
                    <TextField
                        id="otp3"
                        value={otp3}
                        onChange={(e) => {
                            setOtp3(e.target.value.slice(0, 1));
                            if (e.target.value.length === 1) {
                                document.getElementById("otp4").focus();
                            }
                        }}
                    />
                    <TextField
                        id="otp4"
                        value={otp4}
                        onChange={(e) => setOtp4(e.target.value.slice(0, 1))}
                    />
                    <Button onClick={verifyOtp}>{verify}</Button>
                </div>
            </Box>
        </Modal>
    );


    const changeLanguage = (lng) => {
        // handle language selection
        setSelectedLanguage(lng);
        sendOtp();
        // i18n.changeLanguage(lng);
    };

    useEffect(() => {
        document.body.dir = i18n.dir()
    }, [i18n, i18n.language]);

    return (
        <div className='btn_container'>
            <select onChange={(e) => changeLanguage(e.target.value)}>
                {languages.map((language) => (
                    <option key={language.code} value={language.code}>
                        {language.lang}
                    </option>
                ))}
            </select>
            {otpModal}
        </div>
    );
};

export default Languages
